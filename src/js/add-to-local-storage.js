export function queueBtnLogiq(obj) {
  const STORAGE_KEY = 'queue';
  const addToQueueButton = document.querySelector('.js-add-to-queue');
  const addToWachedButton = document.querySelector('.js-add-to-watched');
  addToQueueButton.addEventListener('click', onAddToQueueButton);

  renderTextBtn(addToQueueButton, addToWachedButton, STORAGE_KEY, obj);

  function onAddToQueueButton() {
    let localStorageData = [];
    localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!localStorageData.map(e => e.id).includes(obj.id)) {
      addToLocalStorage(STORAGE_KEY, obj);
      changeBtnTextToRemove(addToQueueButton, STORAGE_KEY);
      addDisableBtn(addToWachedButton);
      addToQueueButton.classList.add('active');
      return;
    }

    removeFromLocalStorage(STORAGE_KEY, obj);
    changeBtnTextToAdd(addToQueueButton, STORAGE_KEY);
    removeDisableBtn(addToWachedButton);
    addToQueueButton.classList.remove('active');
  }
}

export function wachedBtnLogiq(obj) {
  const STORAGE_KEY = 'watched';
  const addToQueueButton = document.querySelector('.js-add-to-queue');
  const addToWachedButton = document.querySelector('.js-add-to-watched');
  addToWachedButton.addEventListener('click', onWachedButtonClick);

  renderTextBtn(addToWachedButton, addToQueueButton, STORAGE_KEY, obj);

  function onWachedButtonClick() {
    let localStorageData = [];
    localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!localStorageData.map(e => e.id).includes(obj.id)) {
      addToLocalStorage(STORAGE_KEY, obj);
      changeBtnTextToRemove(addToWachedButton, STORAGE_KEY);
      addDisableBtn(addToQueueButton);
      addToWachedButton.classList.add('active');
      return;
    }
    removeFromLocalStorage(STORAGE_KEY, obj);
    changeBtnTextToAdd(addToWachedButton, STORAGE_KEY);
    removeDisableBtn(addToQueueButton);
    addToWachedButton.classList.remove('active');
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
function renderTextBtn(refToActiveBtn, refToDisableeBtn, STORAGE_KEY, obj) {
  let localStorageData = [];
  localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (localStorageData.map(e => e.id).includes(obj.id)) {
    changeBtnTextToRemove(refToActiveBtn, STORAGE_KEY);
    refToActiveBtn.classList.add('active');
    addDisableBtn(refToDisableeBtn);
  } else {
    changeBtnTextToAdd(refToActiveBtn, STORAGE_KEY);
    refToActiveBtn.classList.remove('active');
    removeDisableBtn(refToDisableeBtn);
  }
}

function changeBtnTextToRemove(refToBtn, STORAGE_KEY) {
  refToBtn.textContent = `Remove from ${STORAGE_KEY}`;
}
function changeBtnTextToAdd(refToBtn, STORAGE_KEY) {
  refToBtn.textContent = `Add to ${STORAGE_KEY}`;
}

// ---------------------- Disabled Styles Btn ----------------------
function addDisableBtn(refToBtn) {
  refToBtn.disabled = true;
}

function removeDisableBtn(refToBtn) {
  refToBtn.disabled = false;
}
