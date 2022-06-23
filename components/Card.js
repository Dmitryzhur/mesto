import { handleCardClick } from "../pages/index.js";
export class Card {
	constructor(cardItem, cardTemplate, handleCardClick) {
		this._cardItem = cardItem;
		this._cardTemplate = cardTemplate;
		this._handleCardClick = handleCardClick;
		this._cardElement = this._getTemplate();
		this._buttonLike = this._cardElement.querySelector('.elements__element-like-button');
		this._buttonDelete = this._cardElement.querySelector('.elements__element-trash-button');
		this._cardTitle = this._cardElement.querySelector('.elements__element-title');
		this._cardImage = this._cardElement.querySelector('.elements__element-img');
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardTemplate)
			.content
			.querySelector('.elements__element') //селектор элемента карточки
			.cloneNode(true)
		return cardElement;
	}

	// Лайк карточки
	_likeButton() {
		this._buttonLike.classList.toggle('elements__element-like-button_active');
	}

	// Удаление карточки
	_deleteCard() {
		this._cardElement.remove();
	}

	// Отслеживание обработчиков 
	_setEventListeners() {
		this._buttonLike.addEventListener('click', () => this._likeButton());
		this._buttonDelete.addEventListener('click', () => this._deleteCard());
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._cardItem);
		});
	}

	// Создание карточки
	createCard() {
		this._cardTitle.textContent = this._cardItem.name;
		this._cardImage.src = this._cardItem.link;
		this._cardImage.alt = this._cardItem.name;
		this._setEventListeners();
		return this._cardElement;
	}
}