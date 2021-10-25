/* eslint-disable operator-linebreak */
import {useState} from 'react';

/**
 * Stores state in session storage
 * @param {string} tag session storage key
 * @param {any} value initial value
 */
export const useSessionState = (tag, value) => {
  const initialValue = sessionStorage.getItem(tag)
    ? JSON.parse(sessionStorage.getItem(tag))
    : value;
  const [state, setState] = useState(initialValue);

  const updateState = (value) => {
    sessionStorage.setItem(tag, JSON.stringify(value));
    setState(value);
  };

  return [state, updateState];
};
