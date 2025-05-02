// lib/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://medicall.igormgoncalvs.com',
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
