import { handleCardClick } from "./index.js";

const cardsContainer = document.querySelector('.elements');

class Card {
	constructor(cardItem, cardTemplate, handleCardClick) {
		this._cardItem = cardItem;
		this._cardTemplate = cardTemplate;
		this._handleCardClick = handleCardClick;
		this.cardElement = this._cardTemplate.content.querySelector('.elements__element').cloneNode(true);
		this._buttonLike = this.cardElement.querySelector('.elements__element-like-button');
		this._buttonDelete = this.cardElement.querySelector('.elements__element-trash-button');
		this._cardTitle = this.cardElement.querySelector('.elements__element-title');
		this._cardImage = this.cardElement.querySelector('.elements__element-img');
	}

    // Лайк карточки
	_likeButton(evt) {
		const eventTarget = evt.target;
		eventTarget.classList.toggle('elements__element-like-button_active');
		}
	
	// Удаление карточки
	_deleteCard(evt) {
		const eventTarget = evt.target;
		const cardDelete = eventTarget.closest('.elements__element');
		cardDelete.remove();
	}

    // Отслеживание обработчиков 
	_setEventListeners() {
		this._buttonLike.addEventListener('click', this._likeButton);
		this._buttonDelete.addEventListener('click', this._deleteCard);
		this._cardImage.addEventListener('click', () => {
		this._handleCardClick(this._cardItem);
		})
	}

    // Создание карточки
	createCard() {
		this._cardTitle.textContent = this._cardItem.name; 
		this._cardImage.src = this._cardItem.link; 
		this._cardImage.alt = this._cardItem.name;
		this._setEventListeners();
		return this.cardElement;
	}

  // Добавление новой карточки на страницу
	addNewCard() {
		const newCard = this._createCard();
		cardsContainer.prepend(newCard);
	}
}


const initialCards = [
	{
		name: 'Ночной Тагил',
		link: './images/photo-street.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Дом на Урале',
		link: './images/photo-house.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

export { Card, initialCards }