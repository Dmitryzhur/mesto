export default class UserInfo {
	constructor({ selectorName, selectorAbout }) {
		this._elemName = document.querySelector(selectorName);
		this._elemAbout = document.querySelector(selectorAbout);
	}

	getUserInfo() {
		const userInfoObj = {};
		userInfoObj['name'] = this._elemName.textContent;
		userInfoObj['about'] = this._elemAbout.textContent;
		return userInfoObj
	}

	setUserInfo(data) {
		this._elemName.textContent = data.name;
		this._elemAbout.textContent = data.about;
	}

}