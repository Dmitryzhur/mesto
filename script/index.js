const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddElem = document.querySelector('.popup_type_add-element');
const editButton = document.querySelector('.profile__edit-button');
const closeProfileButton = popupProfile.querySelector('.popup__close-button');
const closeAddElemButton = popupAddElem.querySelector('.popup__close-button');

const addBotton = document.querySelector('.profile__add-button');

const textTitle = document.querySelector('.profile__title');
const textAbout =  document.querySelector('.profile__subtitle');

const formElement = popupProfile.querySelector('.popup__admin');
const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

const formAddNewCard = popupAddElem.querySelector('.popup__admin');
const inputNameCard = popupAddElem.querySelector('#input-name-place');
const inputImgCard = popupAddElem.querySelector('#input-link-place');

const cardTemplate = document.querySelector('#elements__element-template').content;
const cardsContainer = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Ночной Тагил',
    link: './images/photo-street.jpg'
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
    link: './images/photo-house.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создание формы карточки
function createCard(elem) {
  const newCardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  newCardElement.querySelector('.elements__element-img').src = elem.link;
  newCardElement.querySelector('.elements__element-img').alt = elem.name;
  newCardElement.querySelector('.elements__element-title').textContent = elem.name;
  newCardElement.querySelector('.elements__element-trash-button');
  newCardElement.querySelector('.elements__element-like-button');
  return newCardElement;
}

// Добавление карточки на страницу
function addNewCard(elem) {
  const newCard = createCard(elem); // Добавить созданную карточку
  cardsContainer.prepend(newCard); // Поставить карту вначале контейнера
}

// Выгрузка карточек из массива
initialCards.forEach( elem => {
  addNewCard(elem);
})

// Обработчик отправки новой карточки
function AddNewCardHandler(evt) {
  evt.preventDefault();
  const newPlace = {name: inputNameCard.value, link: inputImgCard.value};
  addNewCard(newPlace);
  closePopup(popupAddElem);
  formAddNewCard.reset();
}


function openPopup(popup) {
  inputName.value = textTitle.textContent; // Относится только к
  inputAbout.value = textAbout.textContent; // Edit Profile попапу
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
    textTitle.textContent = inputName.value;
    textAbout.textContent = inputAbout.value;
    closePopup(popupProfile);
}


editButton.addEventListener ('click', function () {
  openPopup(popupProfile);
});

closeProfileButton.addEventListener ('click', function () {
  closePopup(popupProfile);
});

addBotton.addEventListener ('click', function () {
  openPopup(popupAddElem);
});

closeAddElemButton.addEventListener ('click', function () {
  closePopup(popupAddElem);
});


// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);

// Отклик на добавление фото
formAddNewCard.addEventListener('submit', AddNewCardHandler);
