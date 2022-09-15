export default function renderModal(data) {
  const genres = data.genres[0];
  const marcupModal = `<div class="cl-btn-2">
      <div class="cl-btn-close">
          <div class="leftright"></div>
          <div class="rightleft"></div>
      </div>
    </div>
    <div class="modal--title">
      <div class="modal--img">
        <!-- <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Film" /> -->
        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Film" />
        <!--<img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="Film" /> -->
      </div>
      <div class="modal--title__info">
        <h2 class="title--text">${data.title}</h2>
        <div class="conteiner--modal__list">
          <ul class="modal--title__list--left">
            <li class="list--element">
              <p>Vote / Votes</p>
            </li>
            <li class="list--element">
              <p>Popularity</p>
            </li>
            <li class="list--element">
              <p>Original Title</p>
            </li>
            <li class="list--element">
              <p>Genre</p>
            </li>
          </ul>
          <ul class="modal--title__list--right">
            <li class="list--element">
              <p class="element--value"><span class="rait">${data.vote_average}</span> / ${data.vote_count}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${data.popularity}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${data.original_title}</p>
            </li>
            <li class="list--element">
              <p class="element--value">${genres.name}</p>
            </li>
          </ul>
        </div>
        <div class="conteiner--about">
          <p>ABOUT</p>
         <div class="modal-content-scroll"><p class="about--text">${data.overview}</p></div>
        </div>
        <div class="conteiner--btn">
          <button class="btn--modal js-add-to-watched">add to Watched</button>
          <button class="btn--modal js-add-to-queue">add to queue</button>
        </div>
      </div>
    </div>`;

  return marcupModal;
}
