const refs = {
  openModalBtn: document.querySelector('[data-modal-open-contacts]'),
  onModalCloseBtn: document.querySelector('[data-modal-contacts-closed]'),
  backdrops: document.querySelector('.backdrops__modal'),
};

// console.log(refs.openModalBtn);
// console.log(refs.onModalCloseBtn);
// console.log(refs.backdrops);

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.onModalCloseBtn.addEventListener('click', onCloseModal);
refs.backdrops.addEventListener('click', onClickBackdrop);

function onOpenModal() {
  refs.backdrops.classList.remove('is-hiddents');
  window.addEventListener('keydown', onPressESC);
}

function onCloseModal() {
  refs.backdrops.classList.add('is-hiddents');
  window.removeEventListener('keydown', onPressESC);
}

function onClickBackdrop(e) {
  if (e.target.classList.contains('js-close-modal')) {
    onCloseModal();
  }
}

function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseModal();
  }
}
