const filmModal = document.querySelector('.backdrop');
const animate = document.querySelector('.modal');

filmModal.addEventListener('click', onClickClose);

function onClickClose(e) {
  if (e.target.className === 'backdrop') {
    filmModal.classList.add('is-hidden');
    animate.classList.remove('to-animate');
    removeEventListener('click', filmModal);
  }
  if (
    e.target.className === 'cl-btn-close' ||
    e.target.className === 'leftright' ||
    e.target.className === 'rightleft'
  ) {
    filmModal.classList.add('is-hidden');
  }
}

export function onEscapeClose() {
  window.addEventListener('keydown', onCloseModalEscape, { once: true });
}

function onCloseModalEscape(e) {
  if (e.code === 'Escape') {
    filmModal.classList.add('is-hidden');
    animate.classList.remove('to-animate');
  }
}
