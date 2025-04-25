// lib/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://medicall.igormgoncalvs.com', // fallback se não tiver env
  baseURL: 'http://localhost:3333', // fallback se não tiver env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
