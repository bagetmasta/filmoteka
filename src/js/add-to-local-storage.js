export function queueBtnLogiq(obj) {
  const STORAGE_KEY = 'queue';
  const addToQueueButton = document.querySelector('.js-add-to-queue');
  addToQueueButton.addEventListener('click', onAddToQueueButton);

  renderTextBtn(addToQueueButton, STORAGE_KEY, obj);

  function onAddToQueueButton() {
    let localStorageData = [];
    localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!localStorageData.map(e => e.id).includes(obj.id)) {
      addToLocalStorage(STORAGE_KEY, obj);
      renderTextBtn(addToQueueButton, STORAGE_KEY, obj);
      return;
    }
    removeFromLocalStorage(STORAGE_KEY, obj);
    renderTextBtn(addToQueueButton, STORAGE_KEY, obj);
  }
}

export function wachedBtnLogiq(obj) {
  const STORAGE_KEY = 'watched';
  const addToWachedButton = document.querySelector('.js-add-to-watched');
  addToWachedButton.addEventListener('click', onWachedButtonClick);

  renderTextBtn(addToWachedButton, STORAGE_KEY, obj);

  function onWachedButtonClick() {
    let localStorageData = [];
    localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!localStorageData.map(e => e.id).includes(obj.id)) {
      addToLocalStorage(STORAGE_KEY, obj);
      renderTextBtn(addToWachedButton, STORAGE_KEY, obj);
      return;
    }
    removeFromLocalStorage(STORAGE_KEY, obj);
    renderTextBtn(addToWachedButton, STORAGE_KEY, obj);
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

function removeFromLocalStorage(STORAGE_KEY, obj) {
  let localStorageData = [];
  localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (!localStorageData.map(e => e.id).includes(obj.id)) {
    return;
  }

  const indexOfRemoveFilm = localStorageData.findIndex(
    option => option.id === obj.id
  );

  localStorageData.splice(indexOfRemoveFilm, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageData));
}

// ---------------------- Render Text Btn ----------------------
function renderTextBtn(refToBtn, STORAGE_KEY, obj) {
  let localStorageData = [];
  localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (localStorageData.map(e => e.id).includes(obj.id)) {
    changeBtnTextToRemove(refToBtn, STORAGE_KEY);
  } else {
    changeBtnTextToAdd(refToBtn, STORAGE_KEY);
  }
}

function changeBtnTextToRemove(refToBtn, STORAGE_KEY) {
  refToBtn.textContent = `Remove from ${STORAGE_KEY}`;
}
function changeBtnTextToAdd(refToBtn, STORAGE_KEY) {
  refToBtn.textContent = `Add to ${STORAGE_KEY}`;
}
