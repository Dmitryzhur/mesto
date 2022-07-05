import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
// import { initialCards } from "../utils/constants.js";
import { objSelectors } from '../utils/utils.js';

const popupProfile = document.querySelector('.popup_type_edit');
const popupViewCard = document.querySelector('.popup_type_view-image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

export const cardImage = popupViewCard.querySelector('.popup__image');
export const cardDescription = popupViewCard.querySelector('.popup__description');

// Увеличение карточки на весь экран
const popupView = new PopupWithImage('.popup_type_view-image');
popupView.setEventListeners();

const handleCardClick = (data) => {
	popupView.openPopup(data);
};

// Создание новой карточки
function makeNewCard(item) {
	const newCard = new Card(item, '#elements__element-template', handleCardClick);
	const card = newCard.createCard();
	return card;
};

// Создание экземпляра класса Section
const cardList = new Section({
	data: [],
	renderer: (item) => {
		const card = makeNewCard(item);
		cardList.addItem(card);
	}
}, '.elements');

cardList.renderItems();

// Добавляем управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
	selectorName: '.profile__title',
	selectorAbout: '.profile__subtitle',
	selectorAvatar: '.profile__avatar'
});

// Добавляем управление двумя попапами с формами
const popupNewPlace = new PopupWithForm({
	callbackFunction: (data) => {
		api.addCard(data)
			// .then(res => {
			// 	debugger;
			// })
			.then(res => { // res = undefided
				cardList.addItem(makeNewCard(res));
			})
		popupNewPlace.closePopup();
	}
}, '.popup_type_add-element');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
	callbackFunction: (data) => {
		api.editProfile(data)
			// .then(res => {
			// 	debugger;
			// })
			.then((res) => { // res = undefided
				userInfo.setUserInfo(res);
				editProfilePopup.closePopup();
			})
	}
}, '.popup_type_edit'
);
editProfilePopup.setEventListeners();


const formValidators = {};

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formElement))
	formList.forEach((formElement) => {
		const validator = new FormValidator(config, formElement)
		const formName = formElement.getAttribute('name')
		formValidators[formName] = validator;
		validator.enableValidation();
	});
};

enableValidation(objSelectors);


// Обработчики
buttonEdit.addEventListener('click', () => {
	const startInputValue = userInfo.getUserInfo();
	editProfilePopup.setInputValues(startInputValue);
	inputName.value = startInputValue.name;
	inputAbout.value = startInputValue.about;
	// Можно сделать метод setInputValues в классе PopupWithForm, который будет вставлять данные в инпуты:
	// И не нужно будет искать эти инпуты в index.js и что-то вставлять в них при открытии профиля.
	editProfilePopup.openPopup();
	formValidators['EditProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function () {
	popupNewPlace.openPopup();
	formValidators['NewPlace'].resetValidation();
});

const API_CONFIG = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
	headers: {
		authorization: '5ae85ff0-6a9f-41ff-87d1-d1c4768e29ea',
		'Content-Type': 'application/json'
	}
};

const api = new Api(API_CONFIG);

api.getInitialCards()
	.then((cards) => {
		cardList._renderedItems = cards;
		cardList.renderItems();
	})


api.getUser()
	.then((data) => {
		userInfo.setUserInfo(data);
		userInfo.setAvatar(data);
	})