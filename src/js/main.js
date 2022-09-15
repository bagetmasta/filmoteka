const _ = require('lodash');
import { onEscapeClose } from './components/on-modal-close-btn';
import renderModal from './template/render-modal';
import * as genres from '../genres.json';
import { queueBtnLogiq, wachedBtnLogiq } from './add-to-local-storage';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import pagination from './components/tui-pagination';
import {
  saveInputLocalStorage,
  parseInputLocalStorege,
  savePaginationLocalStorage,
  parsePaginationLocalStorage,
} from './save-page-pagonation';

let page = 1;
let filmName = '';
let searchByKeyword = true;
const refs = {
  input: document.querySelector('#textInput'),
  form: document.querySelector('.search-bar'),
  cardList: document.querySelector('.card-list'),
  inputError: document.querySelector('.input-error'),
  filmModal: document.querySelector('.backdrop'),
  preloader: document.querySelector('.preloader'),
  reloading: document.querySelector('.reloading'),
  preloaderGooey: document.querySelector('.preloader-gooey'),
  imgStub: document.querySelector('.img-stub'),
  modalFilm: document.querySelector('.modal'),
  animateModal: document.querySelector('.animate-modal'),
  paginationList: document.querySelector('#tui-pagination-container'),
};

refs.form.addEventListener('submit', fetchFilms);
refs.paginationList.addEventListener('click', onClickBtnPagination);
refs.input.addEventListener('input', returnPopularFilms);
//=====
refs.input.value = parseInputLocalStorege();
fetchPopularFilms(parsePaginationLocalStorage() || page);
//=====
function returnPopularFilms(e) {
  saveInputLocalStorage(e.target.value);
  const inputValue = e.target.value;
  if (inputValue === '') {
    savePaginationLocalStorage(1);
    fetchPopularFilms(1);
  }
}

function fetchFilms(e) {
  e.preventDefault();
  pagination.reset();
  page = 1;
  filmName = e.currentTarget.elements.search.value;
  savePaginationLocalStorage(page);
  return fetchNecessaryFilm(filmName, page);
}

function onClickBtnPagination(e) {
  page = pagination.getCurrentPage();
  savePaginationLocalStorage(page);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  if (filmName === '') {
    return fetchPopularFilms(parsePaginationLocalStorage());
  }
  return fetchNecessaryFilm(filmName, parsePaginationLocalStorage());
}

function fetchPopularFilms(page) {
  searchByKeyword = false;
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&page=${page}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ results, total_pages }) => {
      pagination.reset(total_pages * 10);
      renderMarkup(results);
      pagination.movePageTo(page);
    })
    .catch(console.log);
}

function fetchNecessaryFilm(filmName, page) {
  searchByKeyword = true;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US&language=en-US&page=${page}&include_adult=false&query=${filmName}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ results, total_pages }) => {
      pagination.reset(total_pages * 10);
      if (results.length < 1) {
        refs.inputError.classList.remove('hide');

        setTimeout(() => {
          refs.inputError.classList.add('hide');
        }, 3000);

        return;
      }

      renderMarkup(results);
      pagination.movePageTo(page);
    })
    .catch(error => console.log(error));
}

function renderMarkup(films) {
  const newMarkup = films
    .map(film => {
      const {
        original_title,
        poster_path,
        vote_average,
        release_date,
        genre_ids,
        id,
      } = film;

      const year = new Date(release_date).getFullYear();

      return ` <li class="card-list__item">
                  <a href="" class="card-list__link" id=${id}>
                      <picture class="card-list_picture">
                          <img src="${fetchFilmPhoto(
                            poster_path
                          )}" alt="Poster to movie"  class="card-list_picture">
                      </picture>
                      <h2 class="card-list__title"><span class="card-list__movie-name">${original_title}</span><span class="card-list__genre">${getGenres(
        genre_ids
      ).join(', ')}
                       | ${year}</span><span class="card-list__ratimg">${vote_average.toFixed(
        2
      )}
                       </span></h2>
                  </a>
              </li>`;
    })
    .join('');
  refs.cardList.innerHTML = newMarkup;

  onModalFilmOpen();
}

function onModalFilmOpen() {
  const cardLinks = document.querySelectorAll('.card-list__link');
  const cardItems = document.querySelectorAll('a');
  // const filmModal = document.querySelector('.backdrop');

  for (let cardLink of cardLinks) {
    cardLink.addEventListener('click', function (e) {
      e.preventDefault();
      let id = e.currentTarget.id;
      setTimeout(function onCardLinkClick() {
        fetchModal(id).then(data => {
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
          queueBtnLogiq(localSave);
          wachedBtnLogiq(localSave);
        });
        refs.filmModal.classList.remove('is-hidden');

        if (!refs.filmModal.classList.contains('is-hidden')) {
          onEscapeClose();
          refs.animateModal.innerHTML = '';
        }
        for (let cardItem of cardItems) {
          const toRemoveClass = cardItem.classList.contains('animated-card');
          if (toRemoveClass) {
            refs.modalFilm.classList.add('to-animate');
            cardItem.classList.remove('animated-card');
          }
        }
      }, 600);
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
      refs.animateModal.innerHTML = renderModal(data);
      return data;
    });
}

function fetchFilmPhoto(posterPath) {
  const noPosterAvaliable =
    'https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj';

  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : noPosterAvaliable;
}

function getGenres(ids) {
  let newArray = [];

  for (let i = 0; i < ids.length; i += 1) {
    genres.find(({ id, name }) => {
      if (id === ids[i]) {
        newArray.push(name);
      }
    });
  }

  if (newArray.length > 2) {
    newArray.splice(2, 3, 'Other');
  }

  return newArray;
}
