const refs = {
  openModalBtn: document.querySelector('[data-modal-open-contacts]'),
  btnCloseModal: document.querySelector('[data-modal-close-contacts]'),
  backdrops: document.querySelector('#backdrop__footer'),
  body: document.querySelector('body'),
};

// console.log(refs.openModalBtn);
// console.log(refs.btnCloseModal);
// console.log(refs.backdrops);
// console.log(refs.body);

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.btnCloseModal.addEventListener('click', onCloseModal);
refs.backdrops.addEventListener('click', onClickBackdrop);

function onOpenModal() {
  refs.backdrops.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
  document.body.style.overflow = 'hidden';
}

function onCloseModal() {
  refs.backdrops.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
  document.body.style.overflow = 'visible';
}

function onClickBackdrop(e) {
  if (e.target.classList.contains('js-close-modal')) {
    onCloseModal();
  }
}

function onPressESC(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
