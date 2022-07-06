import { data } from "jquery";

export default class Api {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
	}

	getCards() {
		return fetch(`${this._baseURL}/cards`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
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

	editProfile(data) {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data['input-name'],
				about: data['input-about']
			})
		},
		)
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	addCard(data) {
		return fetch(`${this._baseURL}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
                name: data['input-name-place'],
                link: data['input-link-place']
            })
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	deleteCard(_id) {
		return fetch(`${this._baseURL}/cards/${this._id}`, {
			method: 'DELETE',
			headers: this._headers,
			body: JSON.stringify(_id)
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	addLike(_id) {
		return fetch(`${this._baseURL}/cards/${this._id}/likes`, {
			method: 'PUT',
			headers: this._headers,
			body: JSON.stringify(_id)
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	deleteLike(_id) {
		return fetch(`${this._baseURL}/cards/${this._id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
			body: JSON.stringify(_id)
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	editAvatar(data) {
		return fetch(`${this._baseURL}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
                avatar: data['input-link-avatar']
            })
		},
		)
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

}