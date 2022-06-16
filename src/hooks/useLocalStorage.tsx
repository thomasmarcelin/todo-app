import React from "react";

export const useLocalStorage = (key: string) => {
    const defaultValue = null;
    const [storedValue, setStoredValue] = React.useState(() => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
  
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    });
  
    const setValue = (value: unknown) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  }