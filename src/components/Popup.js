export default class Popup {
	constructor(selector) {
		this._popup = document.querySelector(selector);
	}

	openPopup() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keyup', this._handleEscClose);
	}

	// Закрытие при нажатии на крестик
	closePopup() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keyup', this._handleEscClose);
	}

	// Закрытие попапа клавишей Esc
	_handleEscClose = (evt) => {
		if (evt.key === 'Escape') {
			this.closePopup();
		}
	}

	// Отслеживание обработчиков 
	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup_opened')) {
				this.closePopup()
			}
			if (evt.target.classList.contains('popup__close-button')) {
				this.closePopup()
			}
		})
	}
}