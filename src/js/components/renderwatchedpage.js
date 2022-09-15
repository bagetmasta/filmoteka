import { cloneWith } from 'lodash';
import { refs } from './constants-library';
import renderGenreMovieByName from './rendergenremovebyname';
import renderModal from '../template/render-modal';
import { queueBtnLogiq, wachedBtnLogiq } from '../add-to-local-storage';

const animateModal = document.querySelector('.animate-modal');
const filmModal = document.querySelector('.backdrop');
const modalFilm = document.querySelector('.modal');

let parsedObjectWathedfilmes = JSON.parse(localStorage.getItem('watched'));

refs.watchedBtn.addEventListener('click', onWatchedBtn);

function onWatchedBtn(e) {
  e.preventDefault();
  renderAndModalOpen();
}

export function renderAndModalOpen() {
  refs.library.innerHTML = '';

  refs.queueBtn.classList.remove('library__button-current');
  refs.watchedBtn.classList.add('library__button-current');

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
    }

    const libraryWatchedPost = parsedObjectWathedfilmes
      .filter((_, idx) => idx < 6)
      .map(film => renderListWatched(film))
      .join('');
    refs.library.innerHTML = libraryWatchedPost;
  }
  if (refs.library.children.length < parsedObjectWathedfilmes.length) {
    refs.reloading.classList.remove('is-hidden');
    refs.btnLoadMore.classList.remove('is-hidden');
  }

  onModalFilmOpen();
}

renderAndModalOpen();

onModalFilmOpen();

export function renderListWatched(film) {
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
}

function onModalFilmOpen() {
  const cardLinks = document.querySelectorAll('.card-list__link');

  for (let cardLink of cardLinks) {
    cardLink.addEventListener('click', function (e) {
      e.preventDefault();

      let cardId = cardLink.id;
      fetchModal(cardId).then(data => {
        const year = new Date(data.release_date).getFullYear();

        const localSave = {
          filmsName: data.original_title,
          filmsImg: data.poster_path,
          filmRelise: year,
          filmGanre: data.genres,
          filmRait: data.vote_average,
          id: data.id,
          filmsCount: data.vote_count,
          filmsPopularity: data.popularity,
          filmsOverview: data.overview,
          filmsTitle: data.title,
        };
        queueBtnLogiq(data);
        wachedBtnLogiq(data);
      });
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
