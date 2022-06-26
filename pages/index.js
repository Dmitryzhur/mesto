import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { objSelectors } from '../utils/utils.js';

// const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_edit');
// const popupAddElem = document.querySelector('.popup_type_add-element');
const popupViewCard = document.querySelector('.popup_type_view-image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

// const textTitle = document.querySelector('.profile__title');
// const textAbout = document.querySelector('.profile__subtitle');

// const formProfile = popupProfile.querySelector('.popup__admin_type_profile');
// const formNewPlace = popupAddElem.querySelector('.popup__admin_type_add-elem');

const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

// const inputNameCard = popupAddElem.querySelector('#input-name-place');
// const inputLinkCard = popupAddElem.querySelector('#input-link-place');

// const cardSelectorTemplateDefault = '#elements__element-template';
// const cardsContainer = document.querySelector('.elements');

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
	data: initialCards,
	renderer: (item) => {
		const card = makeNewCard(item);
		cardList.addItem(card);
	}
}, '.elements');

cardList.renderItems();

// Добавляем управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
	selectorName: '.profile__title',
	selectorAbout: '.profile__subtitle'
});

// Добавляем управление двумя попапами с формами
const popupNewPlace = new PopupWithForm({
	callbackFunction: (data) => {
		cardList.renderer({
			link: data['input-link-place'],
			name: data['input-name-place']
		});
		popupNewPlace.closePopup();
	}
}, '.popup_type_add-element');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
	callbackFunction: (data) => {
		userInfo.setUserInfo({
			name: data['input-name'],
			about: data['input-about']	
		});
		editProfilePopup.closePopup();
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
	inputName.value = startInputValue.name;
	inputAbout.value = startInputValue.about;
	editProfilePopup.openPopup();
	formValidators['EditProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function () {
	popupNewPlace.openPopup();
	formValidators['NewPlace'].resetValidation();
});

// function openPopup(popup) {
// 	popup.classList.add('popup_opened');
// 	document.addEventListener('keyup', closeOnEsc);
// }

// function closePopup(popup) {
// 	popup.classList.remove('popup_opened');
// 	document.removeEventListener('keyup', closeOnEsc);
// }

// function openProfilePopup() {
// 	inputName.value = textTitle.textContent;
// 	inputAbout.value = textAbout.textContent;
// 	openPopup(popupProfile);
// }


// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function handleProfileFormSubmit(evt) {
// 	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// 	// Так мы можем определить свою логику отправки.
// 	textTitle.textContent = inputName.value;
// 	textAbout.textContent = inputAbout.value;
// 	closePopup(popupProfile);
// }

// buttonEdit.addEventListener('click', function () {
// 	openProfilePopup(popupProfile);
// });

// buttonAdd.addEventListener('click', function () {
// 	openPopup(popupAddElem);
// });

// // Валидация форм
// const formEditProfileValidate = new FormValidator(objSelectors, formProfile);
// formEditProfileValidate.enableValidation();

// const formAddPlaceValidate = new FormValidator(objSelectors, formNewPlace);
// formAddPlaceValidate.enableValidation();
// // const formValidators = {}

// // Прикрепляем обработчики к форме и добавлению фото
// formProfile.addEventListener('submit', handleProfileFormSubmit);
// formNewPlace.addEventListener('submit', addNewCardHandler);

// // Выгрузка карточек из массива
// initialCards.forEach(elem => {
// 	const newCard = makeNewCard(elem);
// 	cardsContainer.prepend(newCard);
// })

// // Обработчик отправки новой карточки
// function addNewCardHandler(evt) {
// 	evt.preventDefault();
// 	const newPlace = { name: inputNameCard.value, link: inputLinkCard.value };
// 	const newCard = makeNewCard(newPlace);
// 	cardsContainer.prepend(newCard);
// 	closePopup(popupAddElem);
// 	formNewPlace.reset();
// 	formAddPlaceValidate.resetValidation();
// }