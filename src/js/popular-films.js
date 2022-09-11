import { onEscapeClose } from './onModalCloseBtn';
import renderModal from './render-modal';
import * as genres from '../genres.json';
import addToWatchLocaleStorage from './localstorage-btn-watched'


const refs = {
  cardList: document.querySelector('.card-list'),
  filmModal: document.querySelector('.backdrop'),
};

export function fetchPopularFilms() {
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=dfb50cc3b16f950a5a6b0ea437e17f05'
  )
    .then(r => r.json())
    .then(({ results }) => renderMarkup(results))
    .catch(console.log);
}

fetchPopularFilms();

export function renderMarkup(films) {
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
                        <img src="images/logo.png" alt="Poster to movie">
                    </picture>
                    <h2 class="card-list__title"><span class="card-list__movie-name">${original_title}</span> ${getGenres(
        genre_ids
      ).join(', ')}
                     | ${year}<span class="card-list__ratimg">${vote_average.toFixed(
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
  // const filmModal = document.querySelector('.backdrop');

  for (let cardLink of cardLinks) {
    cardLink.addEventListener('click', onCardLinkClick);
  }

  function onCardLinkClick(e) {
    e.preventDefault();

    let id = e.currentTarget.id;
    fetchModal(id);
    refs.filmModal.classList.remove('is-hidden');

    if (!refs.filmModal.classList.contains('is-hidden')) {
      onEscapeClose();
      refs.filmModal.innerHTML = '';
    }
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
    //  renderModal(data)
    refs.filmModal.innerHTML = renderModal(data);

    const year = new Date(data.release_date).getFullYear();
      const localSave = {
        filmsName: data.original_title,
        filmsImg: data.poster_path,
        filmRelise: year,
        filmGanre: data.genres,
        filmRait: data.vote_average,
      };
      addToWatchLocaleStorage(localSave, data.original_title);
    });
}; 


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

  return newArray;
}
