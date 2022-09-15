import { cloneWith } from 'lodash';
import { refs } from './constants-library';
import renderGenreMovieByName from './rendergenremovebyname';
import renderModal from '../template/render-modal';

const animateModal = document.querySelector('.animate-modal');
const filmModal = document.querySelector('.backdrop');
const modalFilm = document.querySelector('.modal');

let parsedObjectWathedfilmes = JSON.parse(localStorage.getItem('watched'));

refs.watchedBtn.addEventListener('click', onWatchedBtn);

function onWatchedBtn(e) {
  e.preventDefault();
  if (
    !parsedObjectWathedfilmes ||
    refs.library.children.length === parsedObjectWathedfilmes.length
  ) {
    return;
  } else {
    if (
      parsedObjectWathedfilmes === [] &&
      refs.imgStub.classList.contains('is-hidden')
    ) {
      refs.imgStub.classList.remove('is-hidden');
    } else if (!refs.imgStub.classList.contains('is-hidden')) {
      refs.imgStub.classList.add('is-hidden');
      refs.reloading.classList.remove('is-hidden');
      refs.btnLoadMore.classList.remove('is-hidden');
    }

    const libraryWatchedPost = parsedObjectWathedfilmes
      .filter((_, idx) => idx < 6)
      .map(film => renderListWatched(film))
      .join('');
    refs.library.innerHTML = libraryWatchedPost;
  }
}

export function renderListWatched(film) {
  renderGenreMovieByName(film);

  let libraryWatchedPost = parsedObjectWathedfilmes.map(film => {
    renderGenreMovieByName(film);
    return ` <li class="card-list__item">
                        <a href="" class="card-list__link" id=${film.id}>

                            <picture class="card-list_picture">
                            <img src="https://image.tmdb.org/t/p/original${
                              film.filmsImg
                            }" alt="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj">
                            </picture>
                            <h2 class="card-list__title"><span class="card-list__movie-name">${
                              film.filmsName
                            }</span>
                            <span class="card-list__genre">${
                              refs.movieGenre
                            } | ${
      film.filmRelise
    }</span><span class="card-list__ratimg">${film.filmRait.toFixed(2)}</span>
                            </h2>
                        </a>
                    </li>`;
  });
  refs.library.innerHTML = '';
  refs.library.insertAdjacentHTML(
    'beforeend',
    `${libraryWatchedPost.slice(refs.numberPage, 6).join('')}`
  );
}

onModalFilmOpen();

function onModalFilmOpen() {
  const cardLinks = document.querySelectorAll('.card-list__link');

  for (let cardLink of cardLinks) {
    cardLink.addEventListener('click', function (e) {
      e.preventDefault();

      let cardId = cardLink.id;
      fetchModal(cardId);
      filmModal.classList.remove('is-hidden');
      modalFilm.classList.add('to-animate');
    });
  }
}

function fetchModal(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      //   renderModal(data);
      animateModal.innerHTML = renderModal(data);
      return data;
    });
}
