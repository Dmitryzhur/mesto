import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
	constructor(selector){
        super(selector);
        this._imagePopupView = this._popup.querySelector('.popup__image');
        this._descriptionPopupView = this._popup.querySelector('.popup__description');
    }

	openPopup = (data) => {
		this._imagePopupView.src = data.link;
		this._imagePopupView.alt = data.name;
		this._descriptionPopupView.textContent = data.name;
		super.openPopup();
		const image = this._popup.querySelector(".popup__image");
        const description = this._popup.querySelector(".popup__description");
		image.src = data.link;
        image.alt = data.name;
        description.textContent = data.name;
	}
}