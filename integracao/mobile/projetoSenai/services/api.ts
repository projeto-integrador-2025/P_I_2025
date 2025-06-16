import axios from 'axios';

// Coloque aqui o IP do seu computador (o mesmo que apareceu no ipconfig)
const api = axios.create({
  baseURL: 'http://10.109.25.40:5286/api', // <-- Troque se o IP mudar
  timeout: 5000, // Tempo limite de resposta da API (5 segundos)
});

export default api;
