/**
 * JUMP Frontend - Authentication Service
 * Gerencia login, signup, logout e estado da autenticação
 */

import ApiService from './api.js';

class AuthService {
  constructor() {
    this.user = this.getStoredUser();
    this.listeners = [];
  }

  /**
   * Obtém usuário armazenado no localStorage
   */
  getStoredUser() {
    const user = localStorage.getItem('jumpUser');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Armazena usuário no localStorage
   */
  setStoredUser(user) {
    if (user) {
      localStorage.setItem('jumpUser', JSON.stringify(user));
      this.user = user;
    }
  }

  /**
   * Remove usuário do localStorage
   */
  removeStoredUser() {
    localStorage.removeItem('jumpUser');
    localStorage.removeItem('authToken');
    this.user = null;
  }

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated() {
    return !!this.user && !!localStorage.getItem('authToken');
  }

  /**
   * Obtém usuário atual
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * Registra novo usuário
   */
  async signup(userData) {
    try {
      // Aqui você integraria com Firebase Auth
      // Por enquanto, simulamos a autenticação
      const response = await new ApiService().post('/api/auth/register', userData, { auth: false });

      // Armazenar token e usuário
      new ApiService().setStoredToken(response.token);
      this.setStoredUser(response.user);

      this.notifyListeners('authChange', response.user);
      return response;
    } catch (error) {
      console.error('Erro no signup:', error);
      throw error;
    }
  }

  /**
   * Login do usuário
   */
  async login(email, password) {
    try {
      // Aqui você integraria com Firebase Auth
      const response = await new ApiService().post('/api/auth/login', { email, password }, { auth: false });

      // Armazenar token e usuário
      new ApiService().setStoredToken(response.token);
      this.setStoredUser(response.user);

      this.notifyListeners('authChange', response.user);
      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  /**
   * Login com Google (Firebase)
   */
  async loginWithGoogle() {
    try {
      // Implementar com firebase.auth().signInWithPopup(googleProvider)
      console.log('Login com Google - implementar com Firebase');
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    }
  }

  /**
   * Logout do usuário
   */
  async logout() {
    try {
      this.removeStoredUser();
      this.notifyListeners('authChange', null);
      window.location.href = '/pages/welcome.html';
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  /**
   * Solicita recuperação de senha
   */
  async requestPasswordReset(email) {
    try {
      const response = await new ApiService().post('/api/auth/forgot-password', { email }, { auth: false });
      return response;
    } catch (error) {
      console.error('Erro ao solicitar reset de senha:', error);
      throw error;
    }
  }

  /**
   * Reseta senha com código
   */
  async resetPassword(code, newPassword) {
    try {
      const response = await new ApiService().post('/api/auth/reset-password', { code, newPassword }, { auth: false });
      return response;
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      throw error;
    }
  }

  /**
   * Atualiza perfil do usuário
   */
  async updateProfile(profileData) {
    try {
      const response = await new ApiService().put(`/api/users/${this.user.uid}`, profileData);
      this.setStoredUser(response.user);
      this.notifyListeners('profileUpdate', response.user);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Subscribe a mudanças de autenticação
   */
  onAuthChange(callback) {
    this.listeners.push({ event: 'authChange', callback });
    return () => {
      this.listeners = this.listeners.filter(l => l.callback !== callback);
    };
  }

  /**
   * Notifica listeners sobre mudanças
   */
  notifyListeners(event, data) {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  }
}

export default new AuthService();
