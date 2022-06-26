// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const tagilImage = new URL('../images/photo-street.jpg', import.meta.url);
const uralImage = new URL('../images/photo-house.jpg', import.meta.url);

export const initialCards = [
	{
		name: 'Ночной Тагил',
		link: tagilImage
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Дом на Урале',
		link: uralImage
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];