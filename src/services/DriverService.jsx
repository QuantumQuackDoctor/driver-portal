import axios from 'axios';

export const getCurrentDriver = () => {
  return axios.get('/accounts/driver');
};

export const checkIn = async () => {
  return axios.post('/accounts/driver/checkin');
};

export const checkOut = async () => {
  return axios.post('/accounts/driver/checkout');
};
