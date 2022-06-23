export default class Popup {
	constructor(selector) {
		this._popupSelector = selector;
		this._popup = document.querySelector(this._popupSelector);
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
	_handleEscClose() {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	// Отслеживание обработчиков 
	setEventListeners() {
		this._popup.addEventListener('mousedown', (evt) => {
			if (evt.target.classList.contains('popup_opened')) {
				this.close()
			}
			if (evt.target.classList.contains('popup__close-button')) {
				this.close()
			}
		})
	}
}