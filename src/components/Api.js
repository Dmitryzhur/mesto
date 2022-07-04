export default class Api {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._baseURL}/cards`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
		// .then(res => {
		// 	debugger;
		// })
	}


	getUser() {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}
}