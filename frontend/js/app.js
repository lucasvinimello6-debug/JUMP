/**
 * JUMP Frontend - Main App Initialization
 * Inicialização global da aplicação
 */

import AuthService from './auth.js';
import { showToast, requireAuth } from './utils.js';

class JumpApp {
  constructor() {
    this.auth = AuthService;
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  init() {
    // Adicionar estilos globais
    this.addGlobalStyles();

    // Verificar autenticação ao carregar
    this.setupAuthListener();

    // Setup de componentes globais
    this.setupGlobalComponents();

    console.log('🚀 JUMP App inicializado');
  }

  /**
   * Adiciona estilos globais
   */
  addGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
      
      .toast {
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
      
      .loading-button {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }
      
      .loading-button::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup de listener de autenticação
   */
  setupAuthListener() {
    this.auth.onAuthChange((user) => {
      if (user) {
        console.log('✅ Usuário logado:', user.email);
      } else {
        console.log('❌ Usuário deslogado');
      }
    });
  }

  /**
   * Setup de componentes globais
   */
  setupGlobalComponents() {
    // Adicionar método global para logout
    window.jumpLogout = () => {
      if (confirm('Tem certeza que deseja sair?')) {
        this.auth.logout();
      }
    };

    // Adicionar método para recarregar dados
    window.jumpRefresh = () => {
      location.reload();
    };
  }

  /**
   * Verifica se usuário está na página correta
   */
  protectPage(requiredRole = null) {
    const user = this.auth.getCurrentUser();

    if (!user) {
      requireAuth();
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      showToast('Acesso negado', 'error');
      window.history.back();
      return false;
    }

    return true;
  }
}

// Inicializar app quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.jumpApp = new JumpApp();
});

export default JumpApp;
