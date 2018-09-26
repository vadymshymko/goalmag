export const getDataFromLocalStorage = (dataKey) => {
  try {
    const localStorageData = JSON.parse(localStorage.getItem(dataKey));
    return localStorageData;
  } catch (error) {
    return undefined;
  }
};

export const saveDataToLocalStorage = (dataKey, dataState) => {
  try {
    const serializedStore = JSON.stringify(dataState);
    localStorage.setItem(dataKey, serializedStore);
  } catch (err) {
    throw new Error('Can\'t save data to locale storage!');
  }
};
