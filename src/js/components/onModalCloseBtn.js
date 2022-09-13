const filmModal = document.querySelector('.backdrop');
const animate = document.querySelector('.modal');

filmModal.addEventListener('click', onClickClose);

function onClickClose(e) {
  if (e.target.className === 'backdrop') {
    filmModal.classList.add('is-hidden');
    animate.classList.remove('to-animate');
    removeEventListener('click', filmModal);
  }
}

export function onEscapeClose() {
  window.addEventListener('keydown', onCloseModalEscape, { once: true });
}

function onCloseModalEscape(e) {
  console.log(e);
  if (e.code === 'Escape') {
    filmModal.classList.add('is-hidden');
    animate.classList.remove('to-animate');
  }
}
