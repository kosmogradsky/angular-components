export const parseJson = (key: string, isSessionStorage?: boolean) => {
  try {
    const storage = isSessionStorage ? sessionStorage : localStorage;
    const serializedState = storage.getItem(key);
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const saveAsJson = (state: any, key: string, isSessionStorage?: boolean) => {
  try {
    const storage = isSessionStorage ? sessionStorage : localStorage;
    const serializedState = JSON.stringify(state);
    storage.setItem(key, serializedState);
  } catch (error) {
    console.error(error);
  }
};
