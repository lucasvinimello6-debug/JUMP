/**
 * JUMP Frontend - Utilities
 * Funções utilitárias comuns
 */

/**
 * Formata data para exibição
 */
export function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

/**
 * Formata hora
 */
export function formatTime(timeString) {
  return timeString; // Já vem no formato HH:mm
}

/**
 * Formata moeda para Real
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata telefone
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return phone;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
}

/**
 * Valida email
 */
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida senha
 */
export function validatePassword(password) {
  return password && password.length >= 8;
}

/**
 * Debounce para funções
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle para funções
 */
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Mostrar notificação toast
 */
export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
    color: white;
    border-radius: 12px;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Mostrar loading spinner
 */
export function showLoading(message = 'Carregando...') {
  const loader = document.createElement('div');
  loader.id = 'loading-spinner';
  loader.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
    ">
      <div style="
        background: white;
        padding: 32px;
        border-radius: 16px;
        text-align: center;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top-color: #007AFF;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        "></div>
        <p style="margin: 0; color: #666;">${message}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(loader);
}

/**
 * Esconder loading spinner
 */
export function hideLoading() {
  const loader = document.getElementById('loading-spinner');
  if (loader) loader.remove();
}

/**
 * Redirecionar com verificação de autenticação
 */
export function requireAuth(redirectTo = '/pages/login.html') {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    window.location.href = redirectTo;
  }
}

/**
 * Extrair parâmetros da URL
 */
export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Limpar string de HTML
 */
export function stripHtml(html) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Copiar para clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copiado para a área de transferência!', 'success');
  } catch (error) {
    console.error('Erro ao copiar:', error);
    showToast('Erro ao copiar', 'error');
  }
}

/**
 * Calcular diferença em dias
 */
export function daysDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Validar CPF (Opcional para Brasil)
 */
export function validateCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
}

export default {
  formatDate,
  formatTime,
  formatCurrency,
  formatPhone,
  validateEmail,
  validatePassword,
  debounce,
  throttle,
  showToast,
  showLoading,
  hideLoading,
  requireAuth,
  getUrlParams,
  stripHtml,
  copyToClipboard,
  daysDifference,
  validateCPF
};
