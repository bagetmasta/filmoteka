const _ = require('lodash');
import { renderMarkup, fetchPopularFilms } from './popular-films';

const refs = {
  input: document.querySelector('#textInput'),
  cardList: document.querySelector('.card-list'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', _.debounce(fetchFilms, DEBOUNCE_DELAY));

function fetchFilms(film) {
  const filmName = film.target.value.trim();

  if (filmName === '') {
    return fetchPopularFilms();
  }

  return fetchNecessaryFilm(filmName);
}

function fetchNecessaryFilm(filmName) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US&language=en-US&page=1&include_adult=false&query=${filmName}`
  )
    .then(r => r.json())
    .then(({ results }) => renderMarkup(results))
    .catch(error => console.log(error));
}
