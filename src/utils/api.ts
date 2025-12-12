// src/utils/api.ts
import axios from 'axios';

// Defina a URL base da sua API do Backend (o que fizemos na Parte 2)
// Ajuste a porta se necessário (o padrão do NestJS é 3000, do Next é 3001+)
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;