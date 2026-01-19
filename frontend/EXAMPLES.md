// 📚 Exemplos Práticos de Integração - JUMP SaaS

// ============================================
// 1. EXEMPLO: Tela de Login com API
// ============================================

/**
 * Arquivo: frontend/pages/login.html
 * Integração completa com autenticação
 */

import AuthService from '../js/auth.js';
import { showToast, showLoading, hideLoading, validateEmail } from '../js/utils.js';

// Elementos do formulário
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

// Event listener para botão de login
loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Validar inputs
  if (!validateEmail(email)) {
    showToast('Email inválido', 'error');
    return;
  }

  if (password.length < 8) {
    showToast('Senha muito curta', 'error');
    return;
  }

  try {
    showLoading('Autenticando...');
    
    // Chamar API de login
    const response = await AuthService.login(email, password);
    
    hideLoading();
    showToast('Login bem-sucedido!', 'success');
    
    // Redirecionar baseado no role
    const user = AuthService.getCurrentUser();
    window.location.href = user.role === 'barber' 
      ? 'barber-dashboard.html' 
      : 'home.html';
      
  } catch (error) {
    hideLoading();
    showToast(error.message, 'error');
  }
});

// ============================================
// 2. EXEMPLO: Listar Barbearias com Filtros
// ============================================

/**
 * Arquivo: frontend/pages/barbershops.html
 * Busca e filtro de barbearias
 */

import { BarbershopApi } from '../js/api.js';
import { showToast, formatCurrency } from '../js/utils.js';

const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.filter-tab');
const barbershopsList = document.getElementById('barbershopsList');

let allBarbershops = [];
let currentFilter = 'all';
let currentSearch = '';

// Carregar barbearias ao iniciar
async function loadBarbershops() {
  try {
    const response = await BarbershopApi.getBarbershops();
    allBarbershops = response.barbershops;
    renderBarbershops();
  } catch (error) {
    showToast('Erro ao carregar barbearias', 'error');
  }
}

// Renderizar lista de barbearias
function renderBarbershops() {
  let filtered = allBarbershops;

  // Filtrar por busca
  if (currentSearch) {
    filtered = filtered.filter(b => 
      b.name.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  // Filtrar por categoria
  if (currentFilter === 'rated') {
    filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (currentFilter === 'nearby') {
    filtered = filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999));
  }

  // Renderizar HTML
  barbershopsList.innerHTML = filtered.map(barber => `
    <div class="barber-card">
      <h3>${barber.name}</h3>
      <p>${barber.address}</p>
      <div class="rating">⭐ ${barber.rating}</div>
      <button onclick="selectBarbershop('${barber.id}')">Agendar</button>
    </div>
  `).join('');
}

// Busca com debounce
let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  currentSearch = e.target.value;
  searchTimeout = setTimeout(renderBarbershops, 300);
});

// Filtros
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderBarbershops();
  });
});

loadBarbershops();

// ============================================
// 3. EXEMPLO: Agendamento com Verificação de Disponibilidade
// ============================================

/**
 * Arquivo: frontend/pages/schedule.html
 * Agendamento com slots disponíveis
 */

import { AppointmentApi, ServiceApi } from '../js/api.js';
import { showToast, formatCurrency, formatDate, showLoading, hideLoading } from '../js/utils.js';

// Estado do agendamento
const state = {
  barbershopId: null,
  serviceId: null,
  date: null,
  time: null,
  services: [],
  slots: []
};

// 1. Carregar serviços
async function loadServices(barbershopId) {
  try {
    state.barbershopId = barbershopId;
    const response = await ServiceApi.getServices(barbershopId);
    state.services = response.services;
    renderServices();
  } catch (error) {
    showToast('Erro ao carregar serviços', 'error');
  }
}

// 2. Ao selecionar serviço e data, obter slots
async function getAvailableSlots(date) {
  if (!state.barbershopId || !state.serviceId) {
    showToast('Selecione serviço primeiro', 'error');
    return;
  }

  try {
    showLoading('Carregando horários disponíveis...');
    
    const response = await AppointmentApi.getAvailableSlots(
      state.barbershopId,
      date
    );
    
    state.slots = response.slots;
    state.date = date;
    
    renderSlots();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Nenhum horário disponível', 'error');
  }
}

// 3. Confirmar agendamento
async function confirmAppointment() {
  if (!state.serviceId || !state.date || !state.time) {
    showToast('Preencha todos os campos', 'error');
    return;
  }

  try {
    showLoading('Confirmando agendamento...');

    const response = await AppointmentApi.createAppointment({
      barbershopId: state.barbershopId,
      serviceId: state.serviceId,
      date: state.date,
      time: state.time,
      clientNotes: '' // Campo adicional se necessário
    });

    hideLoading();
    showToast('Agendamento confirmado!', 'success');
    
    // Redirecionar para confirmação
    window.location.href = `confirmation.html?id=${response.appointment.id}`;

  } catch (error) {
    hideLoading();
    showToast(error.message, 'error');
  }
}

// ============================================
// 4. EXEMPLO: Validação de Formulário
// ============================================

/**
 * Validação em tempo real com feedback visual
 */

import { validateEmail, validatePassword } from '../js/utils.js';

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

emailField.addEventListener('blur', (e) => {
  const isValid = validateEmail(e.target.value);
  e.target.style.borderColor = isValid ? '#10b981' : '#ef4444';
  
  if (!isValid && e.target.value) {
    showToast('Email inválido', 'error');
  }
});

passwordField.addEventListener('input', (e) => {
  const isValid = validatePassword(e.target.value);
  e.target.style.borderColor = isValid ? '#10b981' : '#ef4444';
});

// ============================================
// 5. EXEMPLO: Sincronização de Estado de Autenticação
// ============================================

/**
 * Ouvir mudanças de autenticação globalmente
 */

import AuthService from '../js/auth.js';

// Quando o usuário faz login/logout
AuthService.onAuthChange((user) => {
  if (user) {
    console.log('✅ Usuário logado:', user.email);
    
    // Atualizar UI
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').src = user.avatar || '/avatar-placeholder.png';
  } else {
    console.log('❌ Usuário deslogado');
    
    // Redirecionar
    window.location.href = '/pages/welcome.html';
  }
});

// ============================================
// 6. EXEMPLO: Cache e Offline
// ============================================

/**
 * Armazenar dados localmente para usar offline
 */

class CacheService {
  static set(key, data, ttl = 3600000) { // TTL: 1 hora
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  }

  static get(key) {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;

    const parsed = JSON.parse(item);
    
    // Verificar se expirou
    if (Date.now() - parsed.timestamp > parsed.ttl) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }

    return parsed.data;
  }

  static clear(key) {
    localStorage.removeItem(`cache_${key}`);
  }
}

// Uso
async function getBarbershopsWithCache() {
  // Tentar pegar do cache
  let barbershops = CacheService.get('barbershops');
  
  if (barbershops) {
    console.log('📦 Dados do cache');
    return barbershops;
  }

  // Se não estiver no cache, buscar da API
  try {
    const response = await BarbershopApi.getBarbershops();
    
    // Armazenar no cache por 1 hora
    CacheService.set('barbershops', response, 3600000);
    
    return response;
  } catch (error) {
    showToast('Erro ao carregar barbearias', 'error');
    return null;
  }
}

// ============================================
// 7. EXEMPLO: Interceptador de Requisições
// ============================================

/**
 * Estender ApiService para adicionar lógica personalizada
 */

import ApiService from '../js/api.js';

class ExtendedApiService extends ApiService {
  async request(method, endpoint, data = null, options = {}) {
    // Before - Log da requisição
    console.log(`📤 ${method} ${endpoint}`);

    try {
      const response = await super.request(method, endpoint, data, options);
      
      // After - Log da resposta
      console.log(`📥 Resposta:`, response);
      
      return response;
    } catch (error) {
      // Tratamento de erro
      console.error(`❌ Erro em ${method} ${endpoint}:`, error);
      
      // Notificar usuário
      showToast(error.message, 'error');
      
      throw error;
    }
  }
}

// ============================================
// 8. EXEMPLO: Handling de Erros Globais
// ============================================

/**
 * Setup de error handler global
 */

window.addEventListener('error', (event) => {
  console.error('❌ Erro global:', event.error);
  showToast('Ocorreu um erro. Tente novamente.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promise rejeitada:', event.reason);
  showToast('Erro na operação. Tente novamente.', 'error');
});

// ============================================
// 9. EXEMPLO: Retry Logic para Requisições
// ============================================

/**
 * Retornar requisição automaticamente em caso de falha
 */

async function requestWithRetry(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      console.log(`Tentativa ${i + 1} falhou. Retentando em ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Uso
const barbershops = await requestWithRetry(
  () => BarbershopApi.getBarbershops(),
  3,
  1000
);

// ============================================
// 10. EXEMPLO: Forma Completa com Submissão
// ============================================

/**
 * Formulário completo com validação, loading e erro
 */

const form = document.getElementById('appointmentForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Coletar dados
  const formData = new FormData(form);
  const data = {
    barbershopId: formData.get('barbershop'),
    serviceId: formData.get('service'),
    date: formData.get('date'),
    time: formData.get('time'),
    notes: formData.get('notes')
  };

  // Validar
  if (!data.barbershopId || !data.serviceId || !data.date || !data.time) {
    showToast('Preencha todos os campos obrigatórios', 'error');
    return;
  }

  try {
    // Mostrar loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Agendando...';
    showLoading();

    // Fazer requisição
    const response = await AppointmentApi.createAppointment(data);

    // Sucesso
    hideLoading();
    showToast('Agendamento realizado!', 'success');
    
    // Limpar formulário
    form.reset();
    
    // Redirecionar após 1s
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);

  } catch (error) {
    // Erro
    hideLoading();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Agendar';
    showToast(error.message || 'Erro ao agendar', 'error');
  }
});
