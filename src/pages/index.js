import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { objSelectors } from '../utils/utils.js';

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonUpdateAvatar = document.querySelector('.profile__avatar-change');

// Увеличение карточки на весь экран
const popupView = new PopupWithImage('.popup_type_view-image');
popupView.setEventListeners();

const handleCardClick = (data) => {
	popupView.openPopup(data);
};

const handleCardClickDelete = (card) => {
	getCardInfo(confirmDeletePopup, card);
	confirmDeletePopup.openPopup();
};

const handleLike = (card) => {
	if (!card.isLiked()) {
		api.addLike(card.getId())
			.then((res) => {
				card.updateCountLike(res);
			})
			.catch((err) => { console.log(err); })
	} else {
		api.deleteLike(card.getId())
			.then((res) => {
				card.updateCountLike(res);
			})
			.catch((err) => { console.log(err); })
	}
};

// Получаем информацию по карточке 
const getCardInfo = (popup, card) => {
	popup.cardId = card._cardItem._id;
	popup.delCard = card.getEl();
}

// Создание новой карточки
function makeNewCard(item) {
	const newCard = new Card(item, '#elements__element-template', { handleCardClick, handleCardClickDelete, handleLike }, userInfo.userId);
	const card = newCard.createCard();
	return card;
};

// Создание экземпляра класса Section
const cardList = new Section({
	renderer: (item) => {
		cardList.addItemAppend(makeNewCard(item));
	}
}, '.elements');

// Добавляем управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
	selectorName: '.profile__title',
	selectorAbout: '.profile__subtitle',
	selectorAvatar: '.profile__avatar'
});

// Добавляем управление тремя попапами с формами
const popupNewPlace = new PopupWithForm({
	callbackFunction: (data) => {
		popupNewPlace.renderLoading(true)
		api.addCard(data)
			.then(res => {
				cardList.addItem(makeNewCard(res));
				popupNewPlace.closePopup();
			})
			.catch((err) => { console.log(err); })
			.finally(() => {
				popupNewPlace.renderLoading(false);
			})
	}
}, '.popup_type_add-element');
popupNewPlace.setEventListeners();

const editProfilePopup = new PopupWithForm({
	callbackFunction: (data) => {
		editProfilePopup.renderLoading(true)
		api.editProfile(data)
			.then((res) => {
				userInfo.setUserInfo(res);
				editProfilePopup.closePopup();
			})
			.catch((err) => { console.log(err); })
			.finally(() => {
				editProfilePopup.renderLoading(false);
			})
	}
}, '.popup_type_edit'
);
editProfilePopup.setEventListeners();

const popupUpdateAvatar = new PopupWithForm({
	callbackFunction: (data) => {
		popupUpdateAvatar.renderLoading(true)
		api.editAvatar(data)
			.then((res) => {
				userInfo.setAvatar(res);
				popupUpdateAvatar.closePopup();
			})
			.catch((err) => { console.log(err); })
			.finally(() => {
				popupUpdateAvatar.renderLoading(false);
			})
	}
}, '.popup_type_update-avatar'
);
popupUpdateAvatar.setEventListeners();

const confirmDeletePopup = new PopupWithConfirm({
	callbackFunction: (data) => {
		confirmDeletePopup.renderLoading(true);
		api.delCard(data.cardId)
			.then(() => {
				data.delCard.remove();
				confirmDeletePopup.closePopup();
			})
			.catch((err) => { console.log(err); })
			.finally(() => {
				confirmDeletePopup.renderLoading(false);
			})
	}
}, '.popup_type_confirm'
);
confirmDeletePopup.setEventListeners();

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
buttonEdit.addEventListener('click', function openProfilePopup() {
	const startInputValue = userInfo.getUserInfo();
	editProfilePopup.setInputValues(startInputValue);
	editProfilePopup.openPopup();
	formValidators['EditProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function openNewPlacePopup() {
	popupNewPlace.openPopup();
	formValidators['NewPlace'].resetValidation();
});

buttonUpdateAvatar.addEventListener('click', function openUpdateAvatarPopup() {
	const startInputValue = userInfo.getUserInfo();
	popupUpdateAvatar.setInputValues(startInputValue);
	popupUpdateAvatar.openPopup();
	formValidators['Update-Avatar'].resetValidation();
});

const API_CONFIG = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
	headers: {
		authorization: '5ae85ff0-6a9f-41ff-87d1-d1c4768e29ea',
		'Content-Type': 'application/json'
	}
};

const api = new Api(API_CONFIG);

Promise.all([api.getUser(), api.getCards()])
	.then(([userData, cards]) => {
		userInfo.setUserInfo(userData);
		userInfo.setAvatar(userData);
		userInfo.setId(userData);

		cardList.renderItems(cards);
	})
	.catch((err) => { console.log(err); })
