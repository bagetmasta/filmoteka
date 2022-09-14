import { refs } from './constants-library';

export default function renderGenreMovieByName(film) {
  const genreNames = [];
  film.filmGanre.map(genre => {
    return genreNames.push(genre.name);
  });
  if (genreNames.length > 2) {
    return (refs.movieGenre = `${genreNames.slice(0, 2).join(', ')}, others`);
  } else {
    return (refs.movieGenre = genreNames.join(', '));
  }
}
