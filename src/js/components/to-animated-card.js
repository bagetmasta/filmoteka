
const cardList = document.querySelector('.card-list');
const filmModal = document.querySelector('.backdrop');
cardList.addEventListener('click', toAnimationCard)

function toAnimationCard(e) {
    const currentCard = e.target.closest('.card-list__link');
    currentCard.classList.add('animated-card')
}