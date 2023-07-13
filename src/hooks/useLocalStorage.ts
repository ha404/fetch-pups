import { useState } from 'react';

function useLocalStorage<T extends any[]>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, (value: string) => void] {
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeItem = (value: string) => {
    try {
      const updatedValues = storedValue.filter(
        (val: any) => val !== value
      ) as T;
      setValue(updatedValues);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeItem];
}

export default useLocalStorage;
