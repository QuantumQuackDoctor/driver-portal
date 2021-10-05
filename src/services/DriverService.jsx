import axios from 'axios';

export const getCurrentDriver = () => {
  return axios.get('/accounts/driver');
};
