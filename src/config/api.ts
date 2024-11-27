export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.ascora.com/v1',
  ascoraApiKey: localStorage.getItem('ascora-api-key') || '',
  isProduction: import.meta.env.MODE === 'production',
  timeout: 15000
};