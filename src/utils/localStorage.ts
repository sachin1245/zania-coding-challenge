import { Document } from '../types/Document';

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load from localStorage', err);
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, value: Document[]) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Could not save to localStorage', err);
  }
};
