import { renderListWatched } from './renderwatchedpage';
import { refs } from './constants-library';

const AMOUNT = 6;
const ACTIVE_ELEMENT_CLASS_NAME = 'library__button-current';
let valueIdx = 12;

refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);

function onClickBtnLoadMore() {
  preloaderGooeyIsActive();

  setTimeout(() => {
    btnLoadMoreIsVisible();

    const typeFilmsForReloading = filmType();

    refs.library.insertAdjacentHTML(
      'beforeend',
      createBlockForLoadMore(typeFilmsForReloading)
    );
    valueIdx += AMOUNT;

    reloadingIsNotVisible(typeFilmsForReloading);
  }, 1000);
}

function filmType() {
  if (refs.watchedBtn.classList.contains(ACTIVE_ELEMENT_CLASS_NAME)) {
    return JSON.parse(localStorage.getItem('watched'));
  } else if (refs.queueBtn.classList.contains(ACTIVE_ELEMENT_CLASS_NAME)) {
    return JSON.parse(localStorage.getItem('queue'));
  } else {
    return;
  }
}

function createBlockForLoadMore(arr) {
  const currentIdxLastEl = refs.library.children.length - 1;
  return arr
    .filter((_, idx) => currentIdxLastEl < idx && idx < valueIdx)
    .map(film => renderListWatched(film))
    .join('');
}

function preloaderGooeyIsActive() {
  refs.btnLoadMore.classList.add('is-hidden');
  refs.preloaderGooey.classList.remove('is-hidden');
}

function btnLoadMoreIsVisible() {
  refs.preloaderGooey.classList.add('is-hidden');
  refs.btnLoadMore.classList.remove('is-hidden');
}

function reloadingIsNotVisible(arr) {
  if (arr.length <= refs.library.children.length) {
    refs.reloading.classList.add('is-hidden');
  }
}
