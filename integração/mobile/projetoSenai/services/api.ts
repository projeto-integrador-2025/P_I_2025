import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.109.3.232:8081', // exemplo: http://192.168.0.105:5000
});

export default api;
