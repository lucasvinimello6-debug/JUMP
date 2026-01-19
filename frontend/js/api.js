/**
 * JUMP Frontend - API Service
 * Gerencia todas as requisições para o Backend
 */

import { apiConfig } from './config.js';

class ApiService {
  constructor() {
    this.baseURL = apiConfig.baseURL;
    this.headers = { ...apiConfig.headers };
    this.token = this.getStoredToken();
  }

  /**
   * Obtém token armazenado no localStorage
   */
  getStoredToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Armazena token no localStorage
   */
  setStoredToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
      this.token = token;
    }
  }

  /**
   * Remove token do localStorage
   */
  removeStoredToken() {
    localStorage.removeItem('authToken');
    this.token = null;
  }

  /**
   * Retorna headers com autenticação
   */
  getHeaders(includeAuth = true) {
    const headers = { ...this.headers };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Faz requisição GET
   */
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }

  /**
   * Faz requisição POST
   */
  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  }

  /**
   * Faz requisição PUT
   */
  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }

  /**
   * Faz requisição DELETE
   */
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }

  /**
   * Método genérico de requisição
   */
  async request(method, endpoint, data = null, options = {}) {
    const includeAuth = options.auth !== false;
    const url = `${this.baseURL}${endpoint}`;

    try {
      const config = {
        method,
        headers: this.getHeaders(includeAuth),
        timeout: apiConfig.timeout
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      // Tratamento de erro 401 (token expirado)
      if (response.status === 401) {
        this.removeStoredToken();
        window.location.href = '/pages/login.html';
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro em ${method} ${endpoint}:`, error);
      throw error;
    }
  }
}

// ==================== SERVIÇOS ====================

export class ServiceApi {
  /**
   * Obtém lista de serviços
   */
  static async getServices(barbershopId = null, category = null) {
    const params = new URLSearchParams();
    if (barbershopId) params.append('barbershopId', barbershopId);
    if (category) params.append('category', category);

    const endpoint = `/api/services${params.toString() ? '?' + params.toString() : ''}`;
    return ApiService.prototype.get.call(new ApiService(), endpoint);
  }

  /**
   * Cria novo serviço
   */
  static async createService(serviceData) {
    return new ApiService().post('/api/services', serviceData);
  }
}

// ==================== AGENDAMENTOS ====================

export class AppointmentApi {
  /**
   * Obtém slots disponíveis
   */
  static async getAvailableSlots(barbershopId, date) {
    const params = new URLSearchParams({
      barbershopId,
      date
    });

    const endpoint = `/api/appointments/available?${params.toString()}`;
    return new ApiService().get(endpoint, { auth: false });
  }

  /**
   * Cria novo agendamento
   */
  static async createAppointment(appointmentData) {
    return new ApiService().post('/api/appointments', appointmentData);
  }

  /**
   * Obtém detalhes de um agendamento
   */
  static async getAppointment(appointmentId) {
    return new ApiService().get(`/api/appointments/${appointmentId}`);
  }

  /**
   * Atualiza agendamento
   */
  static async updateAppointment(appointmentId, data) {
    return new ApiService().put(`/api/appointments/${appointmentId}`, data);
  }

  /**
   * Cancela agendamento
   */
  static async cancelAppointment(appointmentId) {
    return new ApiService().delete(`/api/appointments/${appointmentId}`);
  }
}

// ==================== BARBEARIAS ====================

export class BarbershopApi {
  /**
   * Obtém lista de barbearias
   */
  static async getBarbershops(city = null, search = null) {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (search) params.append('search', search);

    const endpoint = `/api/barbershops${params.toString() ? '?' + params.toString() : ''}`;
    return new ApiService().get(endpoint, { auth: false });
  }
}

// ==================== CONFIGURAÇÕES ====================

export class ConfigApi {
  /**
   * Obtém configurações da barbearia
   */
  static async getConfig(barbershopId) {
    return new ApiService().get(`/api/config/${barbershopId}`, { auth: false });
  }

  /**
   * Atualiza configurações da barbearia
   */
  static async updateConfig(barbershopId, configData) {
    return new ApiService().put(`/api/config/${barbershopId}`, configData);
  }
}

export default ApiService;
