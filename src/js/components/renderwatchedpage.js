import { refs } from './constants-library';
import renderGenreMovieByName from './rendergenremovebyname';

let parsedObjectWathedfilmes = JSON.parse(localStorage.getItem("watched"));

refs.watchedBtn.addEventListener("click", onWatchedBtn);
function onWatchedBtn(e) {
    e.preventDefault();

    if (!parsedObjectWathedfilmes) {
        return;
    } else {

        if (!refs.imgStub.classList.contains("is-hidden")){
            refs.imgStub.classList.add("is-hidden");
        };

        let libraryWatchedPost = parsedObjectWathedfilmes.map(film => {
            renderGenreMovieByName(film);
            return ` <li class="card-list__item">
                        <a href="" class="card-list__link">
                            <picture class="card-list_picture">
                            <img src="https://image.tmdb.org/t/p/original${film.filmsImg}" alt="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj">
                            </picture>
                            <h2 class="card-list__title"><span class="card-list__movie-name">${film.filmsName}</span>
                            <span class="card-list__genre">${refs.movieGenre}</span> | ${film.filmRelise}<span class="card-list__ratimg">${film.filmRait.toFixed(2)}</span>
                            </h2>
                        </a>
                    </li>`;
    })
            .join('');
        refs.library.innerHTML = "";
    refs.library.insertAdjacentHTML("beforeend", `${libraryWatchedPost}`);
}
}
