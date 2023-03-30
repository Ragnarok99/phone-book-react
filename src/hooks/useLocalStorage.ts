import React from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storage, setStorage] = React.useState<T>(() => {
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
