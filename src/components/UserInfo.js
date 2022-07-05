export default class UserInfo {
	constructor({ selectorName, selectorAbout, selectorAvatar}) {
		this._elemName = document.querySelector(selectorName);
		this._elemAbout = document.querySelector(selectorAbout);
		this._elemAvatar = document.querySelector(selectorAvatar);
	}

	getUserInfo() {
		const userInfoObj = {};
		userInfoObj['name'] = this._elemName.textContent;
		userInfoObj['about'] = this._elemAbout.textContent;
		return userInfoObj;
	}

	setUserInfo(data) {
		this._elemName.textContent = data.name;
		this._elemAbout.textContent = data.about;
	}

	setAvatar(data) {
		this._elemAvatar.src = data.avatar;
	}

}