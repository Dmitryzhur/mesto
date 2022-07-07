
export default class Card {
	constructor(cardItem, cardTemplate, { handleCardClick, handleCardClickDelete }, user) {
		this._cardItem = cardItem;
		this._cardTemplate = cardTemplate;
		this._handleCardClick = handleCardClick;
		this._handleCardClickDelete = handleCardClickDelete;
		this._user = user;
		this._cardElement = this._getTemplate();
		this._buttonLike = this._cardElement.querySelector('.elements__element-like-button');
		this._buttonDelete = this._cardElement.querySelector('.elements__element-trash-button');
		if (this._user !== this._cardItem.owner._id) {
			this._buttonDelete.remove();
		};
		this._cardTitle = this._cardElement.querySelector('.elements__element-title');
		this._cardImage = this._cardElement.querySelector('.elements__element-img');
		this._cardLikes = this._cardElement.querySelector('.elements__element-number-like');
	}

	// получаем id карты для попап удаления
	getId() {
		return this._cardItem._id;
	}

	getEl() {
		return this._buttonDelete.closest('.elements__element');
	}

	// Удаление карточки
	deleteCard() {
		this._cardElement.remove();
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

	// Отслеживание обработчиков 
	_setEventListeners() {
		this._buttonLike.addEventListener('click', () => this._likeButton());
		this._buttonDelete.addEventListener('click', () => {
			this._handleCardClickDelete(this);
		});
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._cardItem);
		});
	}

	// Создание карточки
	createCard() {
		this._cardTitle.textContent = this._cardItem.name;
		this._cardImage.src = this._cardItem.link;
		this._cardImage.alt = this._cardItem.name;
		this._cardLikes.textContent = this._cardItem.likes.length;
		this._setEventListeners();
		return this._cardElement;
	}

}