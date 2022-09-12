export function addToQueueLocalStorage(obj) {
  const addToQueueButton = document.querySelector('.js-add-to-queue');
  addToQueueButton.addEventListener('click', onAddToQueueButton);

  function onAddToQueueButton() {
    addToLocalStorage('queue', obj);
  }
}

export function addToWachedLocalStorage(obj) {
  const addToWachedButton = document.querySelector('.js-add-to-watched');
  addToWachedButton.addEventListener('click', onWachedButtonClick);

  function onWachedButtonClick() {
    addToLocalStorage('watched', obj);
  }
}

function addToLocalStorage(STORAGE_KEY, obj) {
  let localStorageData = [];
  localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (localStorageData.map(e => e.id).includes(obj.id)) {
    return;
  }

  localStorageData.push(obj);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageData));
}
