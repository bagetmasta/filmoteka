const _ = require('lodash');

const refs = {
  input: document.querySelector('#textInput'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', _.debounce(fetchFilms, DEBOUNCE_DELAY));

function fetchFilms(film) {
  const filmName = film.target.value.trim();

  // console.log(filmName);

  return fetch(
    `https://api.themoviedb.org/3/movie/${filmName}?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US`
  );
}
