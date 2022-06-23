import { Card } from "../components/Card.js"
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddElem = document.querySelector('.popup_type_add-element');
const popupViewCard = document.querySelector('.popup_type_view-image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const textTitle = document.querySelector('.profile__title');
const textAbout = document.querySelector('.profile__subtitle');

const formProfile = popupProfile.querySelector('.popup__admin_type_profile');
const formNewPlace = popupAddElem.querySelector('.popup__admin_type_add-elem');

const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

const inputNameCard = popupAddElem.querySelector('#input-name-place');
const inputLinkCard = popupAddElem.querySelector('#input-link-place');

const cardSelectorTemplateDefault = '#elements__element-template';
const cardsContainer = document.querySelector('.elements');

const cardImage = popupViewCard.querySelector('.popup__image');
const cardDescription = popupViewCard.querySelector('.popup__description');

const objSelectors = {
	formElement: '.popup__admin',
	inputElement: '.popup__item',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__item_type_error',
	errorClass: 'popup__error_visible'
}

// Увеличение карточки
const handleCardClick = (elem) => {
	cardImage.src = elem.link;
	cardImage.alt = elem.name;
	cardDescription.textContent = elem.name;
	openPopup(popupViewCard);
}

function makeNewCard(elem) {
	const newCard = new Card(elem, cardSelectorTemplateDefault, handleCardClick);
	return newCard.createCard();
}

// Выгрузка карточек из массива
initialCards.forEach(elem => {
	const newCard = makeNewCard(elem);
	cardsContainer.prepend(newCard);
})

// Обработчик отправки новой карточки
function addNewCardHandler(evt) {
	evt.preventDefault();
	const newPlace = { name: inputNameCard.value, link: inputLinkCard.value };
	const newCard = makeNewCard(newPlace);
	cardsContainer.prepend(newCard);
	closePopup(popupAddElem);
	formNewPlace.reset();
	formAddPlaceValidate.resetValidation();
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keyup', closeOnEsc);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keyup', closeOnEsc);
}

function openProfilePopup() {
	inputName.value = textTitle.textContent;
	inputAbout.value = textAbout.textContent;
	openPopup(popupProfile);
}

// Закрытие попапов через esc
function closeOnEsc(evt) {
	if (evt.key === 'Escape') {
		const popupOpenedNow = document.querySelector('.popup_opened');
		closePopup(popupOpenedNow);
	}
}

// Закрытие попапов через overlay и крестик
popupList.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup)
		} else
			if (evt.target.classList.contains('popup__close-button')) {
				closePopup(popup)
			}
	})
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	textTitle.textContent = inputName.value;
	textAbout.textContent = inputAbout.value;
	closePopup(popupProfile);
}

buttonEdit.addEventListener('click', function () {
	openProfilePopup(popupProfile);
});

buttonAdd.addEventListener('click', function () {
	openPopup(popupAddElem);
});

const formEditProfileValidate = new FormValidator(objSelectors, formProfile);
formEditProfileValidate.enableValidation();

const formAddPlaceValidate = new FormValidator(objSelectors, formNewPlace);
formAddPlaceValidate.enableValidation();

// Прикрепляем обработчики к форме и добавлению фото
formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', addNewCardHandler);

export { handleCardClick };