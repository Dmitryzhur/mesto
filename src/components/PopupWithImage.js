import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

	openPopup = (data) => {
		super.openPopup();
		const image = this._popup.querySelector(".popup__image");
		const description = this._popup.querySelector(".popup__description");
		// 		Поиск верный, только его нужно вынести в конструктор. 
		// Создаем экземпляр класса и один раз находим элементы попапа (как было раньше без классов)
		// Потом в open только атрибуты меняем и все.
		image.src = data.link;
		image.alt = data.name;
		description.textContent = data.name;
	}
}