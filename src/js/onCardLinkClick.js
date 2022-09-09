const cardLinks = document.querySelectorAll('.card-list__link');
const filmModal = document.querySelector('.backdrop');

for (let cardLink of cardLinks) {
  cardLink.addEventListener('click', onCardLinkClick);
}

 export default function onCardLinkClick(e) {
    e.preventDefault();
    filmModal.classList.remove('is-hidden');
};