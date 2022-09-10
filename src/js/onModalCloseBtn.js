const closeModalBtn = document.querySelector('.modal--icon');
const filmModal = document.querySelector('.backdrop');

closeModalBtn.addEventListener('click', onModalCloseBtn);
filmModal.addEventListener('click', onClickClose);

export default function onModalCloseBtn(e) {
  filmModal.classList.add('is-hidden');
}
// ====
function onClickClose(e) {
  if (e.target.className === 'backdrop') {
    filmModal.classList.add('is-hidden');
    removeEventListener('click', filmModal);
  }
}

export function onEscapeClose() {
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') return filmModal.classList.add('is-hidden');
  });

  removeEventListener('keydown', window);
}
