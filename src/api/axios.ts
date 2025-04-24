import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: true,
});

export default api;
