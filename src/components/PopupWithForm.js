import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

	constructor({ callbackFunction }, selector) {
		super(selector);
		this._callbackFunction = callbackFunction;

		this._formElement = document.querySelector(selector).querySelector('.popup__admin');
		this._inputList = this._formElement.querySelectorAll('.popup__item');
	}

	// собирает данные всех полей формы
	_getInputValues = () => {
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	// кроме обработчика иконки закрытия также добавляет обработчик сабмита формы
	setEventListeners = () => {
		this._formElement.addEventListener('submit', () => {
			this._callbackFunction(this._getInputValues());
		});
		super.setEventListeners();
	}

	// добавляет сброс формы
	closePopup = () => {
		super.closePopup();
		this._formElement.reset();
	}
}