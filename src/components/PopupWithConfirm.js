import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {

	constructor({ callbackFunction }, selector) {
		super(selector);
		this._callbackFunction = callbackFunction;

		this._formElement = this._popup.querySelector('.popup__admin');
		this._inputList = this._formElement.querySelectorAll('.popup__item');
		this._submitButton = this._popup.querySelector('.popup__button');
		this._defaultTextButton = this._submitButton.textContent;
	}

	// собирает данные всех полей формы
	_getInputValues = () => {
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setInputValues(data) {
		this._inputList.forEach((input) => {
			// тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
			input.value = data[input.name];
		});
	}

	// кроме обработчика иконки закрытия также добавляет обработчик сабмита формы
	setEventListeners = () => {
		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._callbackFunction(this._getInputValues());
		});
		super.setEventListeners();
	}

	// добавляет сброс формы
	closePopup = () => {
		super.closePopup();
		this._formElement.reset();
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Сохранение...';
		} else {
			this._submitButton.textContent = this._defaultTextButton;
		}
	}
}