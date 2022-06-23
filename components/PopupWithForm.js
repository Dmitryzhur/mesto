import Popup from "./Popup.js";

export class PopupWithForm extends Popup {

	constructor({ callbackFunction }, selector) {
		super(selector);
		this._callbackFunction = callbackFunction;

		this._formElement = document.querySelector(selector).querySelector('.popup__admin');
		this._inputList = this._formElement.querySelectorAll('.popup__item');
	}

	// собирает данные всех полей формы
	_getInputValues = () => {
		const inputDataObj = {};
		this._inputList.forEach(input => {
			inputDataObj[input.name] = input.value;
		});
		return inputDataObj;
	}

	// кроме обработчика иконки закрытия также добавляет обработчик сабмита формы
	setEventListeners = () => {
		this._formElement.addEventListener('submit', () => {
			this._callbackFunction(this._getInputValues());
		});
		super.setEventListeners();
	}

	// добавляет сброс формы
	close = () => {
		super.close();
		this._formElement.reset();
	}
}