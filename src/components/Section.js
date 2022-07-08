export default class Section {
	constructor({ renderer }, selector) {
		this.renderer = renderer;
		this._container = document.querySelector(selector);
	}

	// добавляет в готовую разметку
	addItem(element) {
		this._container.prepend(element);
	}

	// добавляет в готовую разметку
	addItemAppend(element) {
		this._container.append(element);
	}

	// обрабатывает каждую карточку
	renderItems(data) {
		data.forEach(item => this.renderer(item));
	}
}