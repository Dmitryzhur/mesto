export default class Section {
	constructor({ data, renderer }, containerSelector) {
		this._renderedItems = data;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	addItem(element) {
		this._container.prepend(element);
	}

	clear() {
		this._container.innerHTML = '';
	}

	renderItems() {
		this.clear();
		this._renderedItems.forEach(item => this._renderer(item));
	}
}