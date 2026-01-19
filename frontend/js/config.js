/**
 * JUMP Frontend - Firebase Configuration
 * Inicialização do Firebase e configurações globais
 */

// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDxxx_YOUR_API_KEY_xxx",
  authDomain: "jump-saas-prod.firebaseapp.com",
  projectId: "jump-saas-prod",
  storageBucket: "jump-saas-prod.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxx"
};

// Backend API Configuration
export const apiConfig = {
  baseURL: process.env.API_URL || 'http://localhost:3000',
  endpoints: {
    auth: {
      register: '/api/auth/register',
      login: '/api/auth/login'
    },
    services: '/api/services',
    appointments: '/api/appointments',
    barbershops: '/api/barbershops',
    config: '/api/config'
  },
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// App Configuration
export const appConfig = {
  appName: 'JUMP',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  supportEmail: 'support@jump.com',
  supportPhone: '+55119999999999',
  timezone: 'America/Sao_Paulo',
  minPasswordLength: 8,
  sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 days
  reminderTime: 2 * 60 * 60 * 1000 // 2 hours before appointment
};

// Feather Icons CDN (lightweight icon library)
export const iconsConfig = {
  cdn: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js'
};

export default {
  firebaseConfig,
  apiConfig,
  appConfig,
  iconsConfig
};
