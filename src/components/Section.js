export default class Section {
	constructor({ data, renderer }, selector) {
		this._renderedItems = data;
			// исправить в будущем:
		// "Лучше массив карточек передавать не как параметр конструктора, 
		// а как параметр метода renderItems
		// Это пригодится в следующем спринте, когда данные будут приходить с сервера
		// и для их отображения можно будет вызвать cardsList.renderItems(cards) 
		// передав полученные данные как параметр метода"
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