const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');


function openPopup(popup) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popup) {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener ('click', openPopup);

closeButton.addEventListener ('click', closePopup);
