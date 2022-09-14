import renderGenreMovieByName from './components/rendergenremovebyname';
import renderModal from './template/render-modal';
import { onEscapeClose } from './components/on-modal-close-btn';

const queueRefs = {
  queueBtn: document.querySelector('[data-queue]'),
  libraryList: document.querySelector('.my-library__card-list'),
  emptyImage: document.querySelector('.img-stub'),
  isQueue: JSON.parse(localStorage.getItem('queue')),
};
const { queueBtn, libraryList, emptyImage, isQueue } = queueRefs;

isQueue && showQueue();

queueBtn.addEventListener('click', showQueue);

function renderQueue(queue) {
  const markup = queue.map(item => {
    return `<li class="card-list__item">
                    <a href="" class="card-list__link">
                        <picture class="card-list_picture">
                        <img src="https://image.tmdb.org/t/p/original${
                          item.poster_path
                        }" alt="${item.original_title}">
                        </picture>
                        <h2 class="card-list__title">
                            <span class="card-list__movie-name">${
                              item.original_title
                            }</span>
                            ${renderGenreMovieByName(item)} | ${new Date(
      item.release_date
    ).getFullYear()}
                            <span class="card-list__ratimg">${item.vote_average.toFixed(
                              1
                            )}</span>
                        </h2>
                    </a>
                </li>
            `;
  });
  emptyImage.style.display = 'none';
  libraryList.innerHTML = markup.join('');
}

function showQueue() {
  const queueList = JSON.parse(localStorage.getItem('queue'));
  renderQueue(queueList);
  const filmsOnPage = document.querySelectorAll('.card-list__item');
  filmsOnPage.forEach((card, index) => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const modalRefs = {
        filmModal: document.querySelector('.backdrop'),
        animateModal: document.querySelector('.animate-modal'),
        modalFilm: document.querySelector('.modal'),
        cardItems: document.querySelectorAll('a'),
      };
      const { filmModal, animateModal, modalFilm, cardItems } = modalRefs;
      filmModal.classList.remove('is-hidden');
      animateModal.innerHTML = renderModal(queueList[index]);
      if (!filmModal.classList.contains('is-hidden')) {
        onEscapeClose();
      }
      cardItems.forEach(item => {
        item.classList.add('animated-card');
        if (item.classList.contains('animated-card')) {
          modalFilm.classList.add('to-animate');
          item.classList.remove('animated-card');
        }
      });
    });
  });
}
