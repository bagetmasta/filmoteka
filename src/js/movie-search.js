const _ = require('lodash');

const refs = {
  input: document.querySelector('#textInput'),
  cardList: document.querySelector('.card-list'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', _.debounce(fetchFilms, DEBOUNCE_DELAY));

function fetchFilms(film) {
  const filmName = film.target.value.trim();

  if (filmName === '') {
    fetchPopularFilms();
  }

  return fetchNecessaryFilm(filmName);
}

function fetchPopularFilms() {
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=dfb50cc3b16f950a5a6b0ea437e17f05'
  )
    .then(r => r.json())
    .then(({ results }) => renderMarkup(results))
    .catch(console.log);
}

function fetchNecessaryFilm(filmName) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US&language=en-US&page=1&include_adult=false&query=${filmName}`
  )
    .then(r => r.json())
    .then(({ results }) => renderMarkup(results))
    .catch(error => console.log(error));
}

function renderMarkup(films) {
  const newMarkup = films
    .map(film => {
      const { original_title, poster_path, vote_average, release_date } = film;

      return ` <li class="card-list__item">
                <a href="" class="card-list__link">
                    <picture class="card-list_picture">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster to movie">
                    </picture>
                    <h2 class="card-list__title"><span class="card-list__movie-name">${original_title}</span> Drama, Action |
                        ${release_date}<span class="card-list__ratimg">${vote_average}</span></h2>
                </a>
            </li>`;
    })
    .join('');

  refs.cardList.innerHTML = newMarkup;
}
