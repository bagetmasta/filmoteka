const _ = require('lodash');
import { onEscapeClose } from './components/onModalCloseBtn';
import renderModal from './template/render-modal';
import * as genres from '../genres.json';

const DEBOUNCE_DELAY = 300;

let page = 1;
let totalPages = 0;
let searchByKeyword = true;

const refs = {
  input: document.querySelector('#textInput'),
  form: document.querySelector('.search-bar'),
  cardList: document.querySelector('.card-list'),
  inputError: document.querySelector('.input-error'),
  filmModal: document.querySelector('.backdrop'),
  // cardLinks: document.querySelectorAll('.card-list__link'),
  preloader: document.querySelector('.preloader'),
  reloading: document.querySelector('.reloading'),
  preloaderGooey: document.querySelector('.preloader-gooey'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  imgStub: document.querySelector('.img-stub'),
  modalFilm: document.querySelector('.modal'),
  animateModal: document.querySelector('.animate-modal'),
};

refs.form.addEventListener('submit', fetchFilms);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

fetchPopularFilms(page);

function fetchFilms(e) {
  e.preventDefault();

  refs.cardList.innerHTML = '';
  page = 1;
  const filmName = e.currentTarget.elements.search.value;

  if (filmName === '') {
    return fetchPopularFilms(page);
  }

  return fetchNecessaryFilm(filmName, page);
}

function fetchNecessaryFilm(filmName, page) {
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
      totalPages = total_pages;

      if (results.length < 1) {
        refs.inputError.classList.remove('hide');
        refs.btnLoadMore.classList.add('is-hidden');
        return;
      }

      refs.btnLoadMore.classList.remove('is-hidden');
      refs.inputError.classList.add('hide');
      renderMarkup(results);
    })
    .catch(error => console.log(error));
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
      totalPages = total_pages;
      renderMarkup(results);
    })
    .catch(console.log);
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
                          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster to movie"  class="card-list_picture">
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

  refs.cardList.insertAdjacentHTML('beforeend', newMarkup);

  refs.preloaderGooey.classList.add('is-hidden');

  if (page < totalPages) {
    refs.btnLoadMore.classList.remove('is-hidden');
    refs.reloading.classList.remove('is-hidden');
  } else {
    refs.btnLoadMore.classList.add('is-hidden');
    refs.reloading.classList.add('is-hidden');
  }

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
        fetchModal(id);
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
  fetch(
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
    });
}

function fetchFilmPhoto(posterPath) {
  if (posterPath === null) {
    return '../images/dummy.jpg';
  }
  posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'gsf';
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

function onBtnLoadMoreClick(e) {
  page += 1;
  refs.btnLoadMore.classList.add('is-hidden');
  refs.preloaderGooey.classList.remove('is-hidden');

  setTimeout(() => {
    if (!searchByKeyword) {
      return fetchPopularFilms(page);
    }
    return fetchNecessaryFilm(filmName, page);
  }, 2000);
}
