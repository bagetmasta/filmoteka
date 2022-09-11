// const _ = require('lodash');
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// const DEBOUNCE_DELAY = 300;

// let page = 1;
// let totalPages = 0;

// const options = {
//   totalItems: 10,
//   itemsPerPage: 10,
//   visiblePages: 10,
//   page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };
// const pagination = new Pagination('#tui-pagination-container');

// const refs = {
//   cardList: document.querySelector('.card-list'),
//   input: document.querySelector('#textInput'),
//   cardList: document.querySelector('.card-list'),
//   preloader: document.querySelector('.preloader'),
//   reloading: document.querySelector('.reloading'),
//   preloaderGooey: document.querySelector('.preloader-gooey'),
//   btnLoadMore: document.querySelector('.btn-load-more'),
//   imgStub: document.querySelector('.img-stub'),
// };

// refs.input.addEventListener('input', _.debounce(fetchFilms, DEBOUNCE_DELAY));
// refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

// fetchPopularFilms(page);

// function fetchFilms(film) {
//   page = 1;
//   const filmName = film.target.value.trim();

//   if (filmName === '') {
//     return fetchPopularFilms(page);
//   }
//   return fetchNecessaryFilm(filmName, page);
// }

// function fetchNecessaryFilm(filmName, page) {
//   searchByKeyword = true;
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&language=en-US&language=en-US&page=${page}&include_adult=false&query=${filmName}`
//   )
//     .then(r => r.json())
//     .then(({ results, total_pages }) => {
//       totalPages = total_pages;
//       renderMarkup(results);
//     })
//     .catch(error => console.log(error));
// }

// function fetchPopularFilms(page) {
//   searchByKeyword = false;
//   fetch(
//     `https://api.themoviedb.org/3/trending/movie/day?api_key=dfb50cc3b16f950a5a6b0ea437e17f05&page=${page}`
//   )
//     .then(r => r.json())
//     .then(({ results, total_pages }) => {
//       totalPages = total_pages;
//       renderMarkup(results);
//     })
//     .catch(console.log);
// }

// function renderMarkup(films) {
//   const newMarkup = films
//     .map(film => {
//       const { original_title, poster_path, vote_average, release_date } = film;

//       return ` <li class="card-list__item">
//                 <a href="" class="card-list__link">
//                     <picture class="card-list_picture">
//                         <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster to movie">
//                     </picture>
//                     <h2 class="card-list__title"><span class="card-list__movie-name">${original_title}</span> Drama, Action |
//                         ${release_date}<span class="card-list__ratimg">${vote_average}</span></h2>
//                 </a>
//             </li>`;
//     })
//     .join('');

//   refs.cardList.insertAdjacentHTML('beforeend', newMarkup);
//   refs.preloaderGooey.classList.add('is-hidden');

//   const cardLinks = document.querySelectorAll('.card-list__link');
//   const filmModal = document.querySelector('.backdrop');

//   for (let cardLink of cardLinks) {
//     cardLink.addEventListener('click', onCardLinkClick);
//   }

//   function onCardLinkClick(e) {
//     e.preventDefault();
//     filmModal.classList.remove('is-hidden');

//     if (!filmModal.classList.contains('is-hidden')) {
//       onEscapeClose();
//     }
//   }

//   if (page < totalPages) {
//     refs.btnLoadMore.classList.remove('is-hidden');
//   } else {
//     refs.reloading.classList.add('is-hidden');
//   }
// }

// function onBtnLoadMoreClick(e) {
//   page += 1;
//   refs.btnLoadMore.classList.add('is-hidden');
//   refs.preloaderGooey.classList.remove('is-hidden');

//   setTimeout(() => {
//     if (!searchByKeyword) {
//       return fetchPopularFilms(page);
//     }
//     return fetchNecessaryFilm(filmName, page);
//   }, 2000);
// }
