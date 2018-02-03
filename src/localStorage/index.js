export const loadStoreFromLocalStorage = () => {
  try {
    const localStorageState = JSON.parse(localStorage.getItem('store'));
    return localStorageState || {};
  } catch (err) {
    throw new Error('Invalid Data to parse');
  }
};

export const saveStoreToLocalStorage = (store) => {
  try {
    const serializedStore = JSON.stringify(store);
    localStorage.setItem('store', serializedStore);
  } catch (err) {
    throw new Error('Can\'t save data to locale storage!');
  }
};
