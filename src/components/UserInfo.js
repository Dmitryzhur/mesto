export default class UserInfo {
	constructor({ selectorName, selectorAbout, selectorAvatar }) {
		this._elemName = document.querySelector(selectorName);
		this._elemAbout = document.querySelector(selectorAbout);
		this._elemAvatar = document.querySelector(selectorAvatar);
		this.userId = '';
	}

	getUserInfo() {
		const userInfoObj = {};
		userInfoObj['name'] = this._elemName.textContent;
		userInfoObj['about'] = this._elemAbout.textContent;
		userInfoObj['avatar'] = this._elemAvatar.src;
		return userInfoObj;
	}

	setUserInfo(data) {
		this._elemName.textContent = data.name;
		this._elemAbout.textContent = data.about;
	}

	setAvatar(data) {
		this._elemAvatar.src = data.avatar;
	}

	setId(data) {
		this.userId = data._id;
	}

}