import { Card, initialCards } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddElem = document.querySelector('.popup_type_add-element');
const popupViewCard = document.querySelector('.popup_type_view-image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const textTitle = document.querySelector('.profile__title');
const textAbout =  document.querySelector('.profile__subtitle');

const formElement = popupProfile.querySelector('.popup__admin');
const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

const formAddNewCard = popupAddElem.querySelector('.popup__admin');
const inputNameCard = popupAddElem.querySelector('#input-name-place');
const inputLinkCard = popupAddElem.querySelector('#input-link-place');

const cardTemplate = document.querySelector('#elements__element-template');
const cardsContainer = document.querySelector('.elements');

const cardImage = popupViewCard.querySelector('.popup__image');
const cardDescription = popupViewCard.querySelector('.popup__description');

const objSelectors = {
	formSelector: '.popup__admin',
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

function makeNewCard(elem, template) {
	const newCard = new Card(elem, template, handleCardClick);
	const card = newCard.createCard();
	return card;
}

// Выгрузка карточек из массива
initialCards.forEach(elem => {
	const newCard = makeNewCard(elem, cardTemplate);
	cardsContainer.prepend(newCard);
})

// Обработчик отправки новой карточки
function addNewCardHandler(evt) {
	evt.preventDefault();
	const newPlace = {name: inputNameCard.value, link: inputLinkCard.value};
	const newCard = makeNewCard(newPlace, cardTemplate);
	cardsContainer.prepend(newCard);
	closePopup(popupAddElem);
	formAddNewCard.reset();
	const buttonSaveNewPlace = popupAddElem.querySelector('.popup__button');
	buttonSaveNewPlace.classList.add('popup__button_disabled');
	buttonSaveNewPlace.disabled = true;
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keyup', closeOnEsc);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keyup', closeOnEsc);
}

function openProfilePopup(popup) {
	inputName.value = textTitle.textContent;
	inputAbout.value = textAbout.textContent;
	openPopup(popupProfile);
}

// Закрытие попапов через esc
function closeOnEsc (evt) {
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
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
    textTitle.textContent = inputName.value;
    textAbout.textContent = inputAbout.value;
    closePopup(popupProfile);
}

buttonEdit.addEventListener ('click', function () {
	openProfilePopup(popupProfile);
});

buttonAdd.addEventListener ('click', function () {
	openPopup(popupAddElem);
});

const formEditValidate = new FormValidator(objSelectors, formElement);
formEditValidate.enableValidation();

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleProfileFormSubmit);

// Отклик на добавление фото
formAddNewCard.addEventListener('submit', addNewCardHandler);

export { handleCardClick };