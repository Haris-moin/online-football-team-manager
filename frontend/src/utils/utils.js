export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getValueFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return value;
  } catch (err) {
    return err;
  }
};

export const setValuesToLocalStorage = (key, value) => {
  const data = typeof value === "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, data);
};
