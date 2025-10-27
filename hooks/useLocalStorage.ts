import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey: string, fallbackState: any) => {
  const [value, setValue] = useState(
    localStorage.getItem(storageKey) !== null ? JSON.parse(localStorage.getItem(storageKey)!) : fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
