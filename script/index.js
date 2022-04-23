const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddElem = document.querySelector('.popup_type_add-element');
const popupViewCard = document.querySelector('.popup_type_view-image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const textTitle = document.querySelector('.profile__title');
const textAbout =  document.querySelector('.profile__subtitle');

const formElement = popupProfile.querySelector('.popup__admin');
const inputName = popupProfile.querySelector('#input-name');
const inputAbout = popupProfile.querySelector('#input-about');

const formAddNewCard = popupAddElem.querySelector('.popup__admin');
const inputNameCard = popupAddElem.querySelector('#input-name-place');
const inputLinkCard = popupAddElem.querySelector('#input-link-place');

const cardTemplate = document.querySelector('#elements__element-template').content;
const cardsContainer = document.querySelector('.elements');

const cardImage = popupViewCard.querySelector('.popup__image');
const cardDescription = popupViewCard.querySelector('.popup__description');

// Увеличение карточки
function viewCard(elem) {
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardDescription.textContent = elem.name;
  openPopup(popupViewCard);
}

// Создание формы карточки
function createCard(elem) {
  const newCardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const newCardImg = newCardElement.querySelector('.elements__element-img');

  newCardImg.src = elem.link;
  newCardImg.alt = elem.name;
  newCardElement.querySelector('.elements__element-title').textContent = elem.name;
  newCardImg.addEventListener('click', () => viewCard(elem));
  newCardElement.querySelector('.elements__element-trash-button').addEventListener('click', deleteCard);
  newCardElement.querySelector('.elements__element-like-button').addEventListener('click', likeButton);
  return newCardElement;
}

// Удалить карточку
function deleteCard(evt) {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули
  const eventTarget = evt.target;
  const cardDelete = eventTarget.closest('.elements__element');
  cardDelete.remove();
}

// Лайк картинке
function likeButton(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('elements__element-like-button_active');
}

// Добавление карточки на страницу
function addNewCard(elem) {
  const newCard = createCard(elem); // Добавить созданную карточку
  cardsContainer.prepend(newCard); // Поставить карту вначале контейнера
}

// Выгрузка карточек из массива
initialCards.forEach(elem => {
  addNewCard(elem);
})

// Обработчик отправки новой карточки
function addNewCardHandler(evt) {
  evt.preventDefault();
  const newPlace = {name: inputNameCard.value, link: inputLinkCard.value};
  addNewCard(newPlace);
  closePopup(popupAddElem);
  formAddNewCard.reset();
  const buttonSaveNewPlace = popupAddElem.querySelector('.popup__button');
  buttonSaveNewPlace.classList.add('popup__button_disabled');
  buttonSaveNewPlace.disabled = true;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeOnEsc);
}

function openProfilePopup(popup) {
  inputName.value = textTitle.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupProfile);
}

// Закрытие попапов через esc
function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpenedNow = document.querySelector('.popup_opened');
    closePopup(popupOpenedNow);
  }
}

// Закрытие попапов через overlay и крестик
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      } else
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
    textTitle.textContent = inputName.value;
    textAbout.textContent = inputAbout.value;
    closePopup(popupProfile);
}

buttonEdit.addEventListener ('click', function () {
  openProfilePopup(popupProfile);
});

buttonAdd.addEventListener ('click', function () {
  openPopup(popupAddElem);
});

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleProfileFormSubmit);

// Отклик на добавление фото
formAddNewCard.addEventListener('submit', addNewCardHandler);
