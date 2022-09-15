import renderGenreMovieByName from './components/rendergenremovebyname';
import { onEscapeClose } from './components/on-modal-close-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const queueRefs = {
  queueBtn: document.querySelector('[data-queue]'),
  libraryList: document.querySelector('.my-library__card-list'),
  emptyImage: document.querySelector('.img-stub__list'),
  watchedBtn: document.querySelector(
    '.library__buttons__item .library__button'
  ),

  reloading: document.querySelector('.reloading'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  preloaderGooey: document.querySelector('.preloader-gooey'),
};

const { queueBtn, libraryList, emptyImage } = queueRefs;

queueBtn.addEventListener('click', showQueue);

function showQueue() {
  libraryList.innerHTML = '';
  queueRefs.emptyImage.classList.remove('is-hidden');
  queueRefs.reloading.classList.add('is-hidden');

  queueRefs.queueBtn.classList.add('library__button-current');
  queueRefs.watchedBtn.classList.remove('library__button-current');

  if (!JSON.parse(localStorage.getItem('queue'))) {
    return;
  }

  const queueList = JSON.parse(localStorage.getItem('queue'));
  renderQueue(queueList);
  const filmsOnPage = document.querySelectorAll('.card-list__item');
  isEmpty(filmsOnPage, emptyImage);
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

      const buttonsRefs = {
        btnRemoveQueue: document.querySelector('.js-add-to-queue'),
        btnAddToWatched: document.querySelector('.js-add-to-watched'),
      };
      const { btnRemoveQueue, btnAddToWatched } = buttonsRefs;

      btnAddToWatched.addEventListener('click', replaceFilmToWatched);
      btnRemoveQueue.addEventListener('click', removeQueueStorage);

      function replaceFilmToWatched() {
        const filmCard = document.querySelectorAll('.card-list__movie-name');
        const watchedLocalStorage = JSON.parse(localStorage.getItem('watched'));
        const duplicate = watchedLocalStorage.some(
          item => item.filmsName === filmCard[index].textContent
        );

        if (duplicate) {
          Notify.warning('Sorry, but this movie is alredy watched');
        } else {
          const newQueueList = JSON.parse(localStorage.getItem('queue'));
          replaceFromQueueToWatched(removeLocalData(newQueueList, index));
          renderQueue(newQueueList);
          filmModal.classList.add('is-hidden');
          showQueue();
        }
      }

      function removeQueueStorage() {
        removeLocalData(queueList, index);
        renderQueue(queueList);
        filmModal.classList.add('is-hidden');
        showQueue();
      }
    });
  });
}

function replaceFromQueueToWatched(callback) {
  const movedFilms = callback;
  const watchedLocalStorage = JSON.parse(localStorage.getItem('watched'));
  watchedLocalStorage.push(movedFilms[0]);
  localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
}

function removeLocalData(data, idx) {
  const removedFilm = data.splice(idx, 1);
  localStorage.setItem('queue', JSON.stringify(data));
  return removedFilm;
}

function renderModal(data) {
  const genres = data.filmGanre[0];
  const marcupModal = `<div class="cl-btn-2">
      <div class="cl-btn-close">
          <div class="leftright"></div>
          <div class="rightleft"></div>
      </div>
    </div>
    <div class="modal--title">
      <div class="modal--img">
        <img src="https://image.tmdb.org/t/p/w500/${data.filmsImg}" alt="Film" />
      </div>
      <div class="modal--title__info">
        <h2 class="title--text">${data.filmsTitle}</h2>
        <div class="conteiner--modal__list">
          <ul class="modal--title__list--left">
            <li class="list--element">
              <p>Vote / Votes</p>
            </li>
            <li class="list--element">
              <p>Popularity</p>
            </li>
            <li class="list--element">
              <p>Original Title</p>
            </li>
            <li class="list--element">
              <p>Genre</p>
            </li>
          </ul>
          <ul class="modal--title__list--right">
            <li class="list--element">
              <p class="element--value"><span class="rait">${data.filmRait}</span> / ${data.filmsCount}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${data.filmsPopularity}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${data.filmsName}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${genres.name}</p>
            </li>
          </ul>
        </div>
        <div class="conteiner--about">
          <p>ABOUT</p>
          <p class="about--text">${data.filmsOverview}
          </p>
        </div>
        <div class="conteiner--btn">
          <button class="btn--modal active js-add-to-watched">add to Watched</button>
          <button class="btn--modal js-add-to-queue">REMOVE FROM QUEUE</button>
        </div>
      </div>
    </div>`;

  return marcupModal;
}

function renderQueue(queue) {
  const markup = queue
    .filter((_, idx) => idx < 6)
    .map(item => {
      return `<li class="card-list__item">
                    <a class="card-list__link">
                        <picture class="card-list_picture">
                        <img src="https://image.tmdb.org/t/p/original${
                          item.filmsImg
                        }" alt="${item.filmsName}">
                        </picture>
                        <h2 class="card-list__title">
                            <span class="card-list__movie-name">${
                              item.filmsName
                            }</span>
                            ${renderGenreMovieByName(item)} | ${new Date(
        item.filmRelise
      ).getFullYear()}
                            <span class="card-list__ratimg">${item.filmRait.toFixed(
                              1
                            )}</span>
                        </h2>
                    </a>
                </li>
            `;
    });
  libraryList.innerHTML = markup.join('');
  if (queueRefs.libraryList.children.length < queue.length) {
    queueRefs.reloading.classList.remove('is-hidden');
    queueRefs.btnLoadMore.classList.remove('is-hidden');
  }
}

function isEmpty(array, image) {
  array.length > 0
    ? (image.style.display = 'none')
    : (image.style.display = 'flex');
}
