const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const textTitle = document.querySelector('.profile__title');
const textAbout =  document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__admin');
const inputName = document.querySelector('#input-name');
const inputAbout = document.querySelector('#input-about');

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

// Создание карточки
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


function openPopup() {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
    textTitle.textContent = inputName.value;
    textAbout.textContent = inputAbout.value;
    closePopup();
}


editButton.addEventListener ('click', openPopup);

closeButton.addEventListener ('click', closePopup);

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);
