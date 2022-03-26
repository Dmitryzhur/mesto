let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let textTitle = document.querySelector('.profile__title');
let textAbout =  document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__admin');
let inputName = document.querySelector('#input-name');
let inputAbout = document.querySelector('#input-about');


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

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);
