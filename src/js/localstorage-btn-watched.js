export default function addToWatchLocaleStorage(localSave, KEY) {
    const btn = document.querySelector('.active');
    btn.addEventListener(
      'click',
      () => {
        save(KEY, localSave);
      },
      { once: true }
    );
  };
  function save(KEY_STORAGE, localSave) {
    try {
      const serializedState = JSON.stringify(localSave);
      localStorage.setItem(KEY_STORAGE, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    };
};
