import Popup from "./Popup.js";
import { cardImage, cardDescription } from "../pages/index.js";

export default class PopupWithImage extends Popup {

	openPopup = (data) => {
		super.openPopup();
		cardImage.src = data.link;
		cardImage.alt = data.name;
		cardDescription.textContent = data.name;
	}
}