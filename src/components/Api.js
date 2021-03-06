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
	}

	getUser() {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
	}

	editProfile(data) {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		},
		)
			.then(this._checkResponseStatus)
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
	}

	delCard(_id) {
		return fetch(`${this._baseURL}/cards/${_id}`, { 
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
	}

	addLike(_id) {
		return fetch(`${this._baseURL}/cards/${_id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
	}

	deleteLike(_id) {
		return fetch(`${this._baseURL}/cards/${_id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
	}

	editAvatar(data) {
		return fetch(`${this._baseURL}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
                avatar: data.avatar
            })
		},
		)
			.then(this._checkResponseStatus)
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

}