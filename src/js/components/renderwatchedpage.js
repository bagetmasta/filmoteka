import { refs } from './constants-library';
import renderGenreMovieByName from './rendergenremovebyname';

let parsedObjectWathedfilmes = JSON.parse(localStorage.getItem("watched"));

refs.watchedBtn.addEventListener("click", onWatchedBtn);
function onWatchedBtn(e) {
    e.preventDefault();

    if (!parsedObjectWathedfilmes) {
        return;
    } else {
        if (parsedObjectWathedfilmes === [] && refs.imgStub.classList.contains("is-hidden")) {
            refs.imgStub.classList.remove("is-hidden");
        } else
        if (!refs.imgStub.classList.contains("is-hidden")){
            refs.imgStub.classList.add("is-hidden");
        };

        let libraryWatchedPost = parsedObjectWathedfilmes.map(film => {
            renderGenreMovieByName(film);
            return ` <li class="card-list__item">
                        <a href="" class="card-list__link">
                            <picture class="card-list_picture">
                            <img src="https://image.tmdb.org/t/p/original${film.poster_path}" alt="${film.original_title}">
                            </picture>
                            <h2 class="card-list__title"><span class="card-list__movie-name">${film.original_title}</span>
                            ${refs.movieGenre} | ${new Date(film.release_date).getFullYear()}<span class="card-list__ratimg">${film.vote_average.toFixed(1)}</span>
                            </h2>
                        </a>
                    </li>`;
    });
        refs.library.innerHTML = "";
    refs.library.insertAdjacentHTML("beforeend", `${libraryWatchedPost.slice(refs.numberPage, 6).join("")}`);
    }
}