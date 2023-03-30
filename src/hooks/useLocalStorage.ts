import React from "react";

const useLocalStorage = (key: string, defaultValue: unknown) => {
  const [storage, setStorage] = React.useState(() => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const value = window.localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      return defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setStorageValue = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(storage) : value;
      setStorage(valueToStore);
      console.log("this", valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storage, setStorageValue];
};

export default useLocalStorage;
