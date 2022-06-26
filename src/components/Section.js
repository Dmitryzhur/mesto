export default class Section {
	constructor({ data, renderer }, selector) {
		this._renderedItems = data;
		this.renderer = renderer;
		this._container = document.querySelector(selector);
	}

	// добавляет в готовую разметку
	addItem(element) {
		this._container.prepend(element);
	}

	// обрабатывает каждую карточку
	renderItems() {
		this._renderedItems.forEach(item => this.renderer(item));
	}
}