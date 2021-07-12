import axios, { AxiosResponse, AxiosPromise } from 'axios';

const API = axios.create({
  baseURL: 'http://ergast.com/api/f1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  (response): any => {
    const { data, status } = response;
    const res = {
      data,
      status,
    };
    return res;
  },
  err => {
    return Promise.reject(err);
  },
);

export default API;
