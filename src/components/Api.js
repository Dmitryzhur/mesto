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
		// .then(res => {
		// 	debugger;
		// })
	}

	editProfile() {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: 'Jacquoos Cousteau',
				about: 'Sailor, researcher'
			})
		},
		)
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
		// .then(res => {
		// 	debugger;
		// })
	}

	addCard(data) {
		return fetch(`${this._baseURL}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(data)
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
			// .then(res => {
			// 	debugger;
			// })
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
			// .then(res => {
			// 	debugger;
			// })
	}

	AddLike(_id) {
		return fetch(`${this._baseURL}/cards/${this._id}/likes`, {
			method: 'PUT',
			headers: this._headers,
			body: JSON.stringify(_id)
		})
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
			// .then(res => {
			// 	debugger;
			// })
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
			// .then(res => {
			// 	debugger;
			// })
	}

	editAvatar(data) {
		return fetch(`${this._baseURL}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(data)
		},
		)
			.then(this._checkResponseStatus)
			.catch((err) => {
				console.log(err);
			})
		// .then(res => {
		// 	debugger;
		// })
	}

}