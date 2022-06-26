import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

	openPopup = (data) => {
		super.openPopup();
		const image = this._popup.querySelector(".popup__image");
        const description = this._popup.querySelector(".popup__description");
		image.src = data.link;
        image.alt = data.name;
        description.textContent = data.name;
	}
}