import Popup from "./Popup.js";
import { cardImage, cardDescription } from "../pages/index.js";

export class PopupWithImage extends Popup {

	open = (data) => {
		super.open();
		cardImage.src = data.link;
		cardImage.alt = data.name;
		cardDescription.textContent = data.name;
	}
}