import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.85.232.244:5286/api',
  timeout: 5000,
});

export default api;
