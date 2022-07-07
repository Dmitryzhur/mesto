import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {

	constructor({ callbackFunction }, selector) {
		super(selector);
		this._callbackFunction = callbackFunction;
		this._submitButton = this._popup.querySelector('.popup__button');
		this._defaultTextButton = this._submitButton.textContent;
		this.btnDelConfirm = '';
		this.cardId = '';
	}

	// кроме обработчика иконки закрытия также добавляет обработчик сабмита кнопки
	setEventListeners = () => {
		this._submitButton.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._callbackFunction(this);
		});
		super.setEventListeners();
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Удаление...';
		} else {
			this._submitButton.textContent = this._defaultTextButton;
		}
	}
}