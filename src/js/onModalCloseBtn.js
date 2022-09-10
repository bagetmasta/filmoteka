const closeModalBtn = document.querySelector('.modal--icon');
const filmModal = document.querySelector('.backdrop');

closeModalBtn.addEventListener('click', onModalCloseBtn)

export default function onModalCloseBtn(e) {
    filmModal.classList.add('is-hidden');
}