// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // fallback se não tiver env
  timeout: 10000, // 10 segundos de timeout (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
