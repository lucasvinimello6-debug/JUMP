# 🔗 Integração Frontend-Backend - JUMP SaaS

## Visão Geral

A integração entre Frontend e Backend foi estabelecida através de um sistema modular de serviços JavaScript que comunica com os endpoints REST do Express.js.

## 📂 Estrutura de Arquivos Frontend

```
frontend/
├── js/
│   ├── config.js          # Configurações do app (Firebase, API URLs)
│   ├── api.js             # Serviço de requisições HTTP
│   ├── auth.js            # Gerenciamento de autenticação
│   ├── utils.js           # Funções utilitárias
│   └── app.js             # Inicialização global da app
└── pages/
    ├── login.html         # Login com integração de API
    ├── signup.html        # Cadastro com integração de API
    ├── home.html          # Dashboard do cliente
    ├── barbershops.html   # Lista de barbearias com filtros
    ├── schedule.html      # Agendamento com disponibilidade
    ├── my-appointments.html
    ├── barber-dashboard.html
    └── ... outros arquivos
```

## 🔐 Autenticação

### Fluxo de Login

```javascript
// frontend/pages/login.html
import AuthService from '../js/auth.js';

const user = await AuthService.login(email, password);
// Armazena token em localStorage
// Redireciona baseado no role do usuário
```

### Fluxo de Cadastro

```javascript
// frontend/pages/signup.html
await AuthService.signup({
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '11999999999',
  password: 'senha123',
  role: 'client' // ou 'barber'
});
```

### Token Storage

- **Token JWT**: Armazenado em `localStorage` com chave `authToken`
- **Dados do Usuário**: Armazenados em `localStorage` com chave `jumpUser`
- **Sincronização**: Token é enviado automaticamente em todas as requisições autenticadas

```javascript
// Adicionado automaticamente em todas as requisições
Authorization: Bearer ${token}
```

## 📡 Serviços de API

### 1. ServiceApi - Gerenciamento de Serviços

```javascript
import { ServiceApi } from '../js/api.js';

// Obter serviços
const services = await ServiceApi.getServices(barbershopId, category);

// Criar serviço (apenas barbers)
const newService = await ServiceApi.createService({
  name: 'Corte Clássico',
  price: 45,
  duration: 30,
  category: 'Cortes'
});
```

### 2. AppointmentApi - Agendamentos

```javascript
import { AppointmentApi } from '../js/api.js';

// Obter slots disponíveis
const slots = await AppointmentApi.getAvailableSlots(barbershopId, '2026-01-20');

// Criar agendamento
const appointment = await AppointmentApi.createAppointment({
  barbershopId: 'barber_123',
  serviceId: 'service_456',
  date: '2026-01-20',
  time: '10:00',
  clientNotes: 'Preferência de estilo'
});

// Obter detalhes
const details = await AppointmentApi.getAppointment(appointmentId);

// Atualizar agendamento
await AppointmentApi.updateAppointment(appointmentId, {
  status: 'confirmed'
});

// Cancelar agendamento
await AppointmentApi.cancelAppointment(appointmentId);
```

### 3. BarbershopApi - Barbearias

```javascript
import { BarbershopApi } from '../js/api.js';

// Listar barbearias
const barbershops = await BarbershopApi.getBarbershops(city, search);

// Resultado esperado:
// {
//   barbershops: [
//     {
//       id: 'barber_123',
//       name: 'Barbearia Style',
//       address: 'Rua X, 100',
//       city: 'São Paulo',
//       phone: '1133333333',
//       rating: 4.8,
//       reviewCount: 45,
//       distance: 2.3,
//       services: [...],
//       hours: { ... }
//     },
//     ...
//   ],
//   total: 142
// }
```

### 4. ConfigApi - Configurações

```javascript
import { ConfigApi } from '../js/api.js';

// Obter configurações
const config = await ConfigApi.getConfig(barbershopId);

// Atualizar configurações (admin only)
await ConfigApi.updateConfig(barbershopId, {
  workingHours: { start: '09:00', end: '19:00' },
  services: [...],
  staff: [...]
});
```

## 🛠️ Utilitários

### Formatação e Validação

```javascript
import { 
  formatDate, 
  formatTime, 
  formatCurrency, 
  formatPhone,
  validateEmail, 
  validatePassword,
  validateCPF
} from '../js/utils.js';

// Exemplos
formatDate('2026-01-20')        // "20 de janeiro de 2026"
formatTime('14:30')             // "14:30"
formatCurrency(45.50)           // "R$ 45,50"
formatPhone('11999999999')      // "(11) 99999-9999"

validateEmail('user@email.com') // true/false
validatePassword('MyPass123')   // true/false (mín 8 chars)
```

### Notificações

```javascript
import { showToast, showLoading, hideLoading } from '../js/utils.js';

// Toast notifications
showToast('Sucesso!', 'success', 3000);
showToast('Erro ao salvar', 'error');
showToast('Informação', 'info');

// Loading spinner
showLoading('Processando...');
// ... operação assíncrona
hideLoading();
```

## 🔄 Fluxos de Integração

### Fluxo 1: Agendamento Completo

```javascript
// 1. Frontend carrega barbershops
const barbershops = await BarbershopApi.getBarbershops();

// 2. User seleciona barbearia e vê slots
const slots = await AppointmentApi.getAvailableSlots(barbershopId, date);

// 3. Backend retorna slots disponíveis
// AvailabilityService calcula automaticamente baseado em:
// - Horário de funcionamento
// - Duração do serviço
// - Agendamentos existentes
// - Intervalos de descanso do barbeiro

// 4. User cria agendamento
const appointment = await AppointmentApi.createAppointment({
  barbershopId,
  serviceId,
  date,
  time
});

// 5. Backend notifica via Twilio (WhatsApp/SMS)
// - Confirmação de agendamento
// - Link para detalhes

// 6. 2 horas antes, reminder automático
// - Cloud Function envia notificação
```

### Fluxo 2: Autenticação e Proteção

```javascript
// 1. Login
await AuthService.login(email, password);
// Token salvo em localStorage

// 2. Todas as requisições subsequentes incluem token
// Authorization: Bearer token_jwt

// 3. Backend valida token no middleware
verifyFirebaseToken (middleware)

// 4. Se token inválido ou expirado
// Frontend redireciona para login
// localStorage é limpo
```

## 📊 Estrutura de Respostas

### Sucesso

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    ...
  }
}
```

### Erro

```json
{
  "error": "Mensagem de erro descriptiva",
  "code": "INVALID_INPUT"
}
```

## 🚀 Configuração de Ambiente

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
```

### Backend (.env)

```
PORT=3000
FIREBASE_PROJECT_ID=jump-saas-prod
FIREBASE_PRIVATE_KEY=xxxxx
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
JWT_SECRET=xxxxx
```

## 📱 Endpoints Integrados

### Autenticação
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Solicitar reset
- `POST /api/auth/reset-password` - Confirmar novo senha

### Serviços
- `GET /api/services?barbershopId=xxx&category=xxx` - Listar serviços
- `POST /api/services` - Criar serviço

### Agendamentos
- `GET /api/appointments/available` - Slots disponíveis
- `POST /api/appointments` - Criar agendamento
- `GET /api/appointments/:id` - Detalhes
- `PUT /api/appointments/:id` - Atualizar
- `DELETE /api/appointments/:id` - Cancelar

### Barbearias
- `GET /api/barbershops` - Listar barbearias

### Configuração
- `GET /api/config/:barbershopId` - Obter config
- `PUT /api/config/:barbershopId` - Atualizar config

## ✨ Funcionalidades Implementadas

✅ Autenticação (Login/Signup)
✅ Gerenciamento de Sessão (Token JWT)
✅ Validação de Formulários
✅ Notificações (Toast)
✅ Loading States
✅ Tratamento de Erros
✅ Formatação de Dados
✅ Requisições HTTP com Interceptores

## 🔜 Próximas Etapas

1. **Integração Firebase Auth SDK** - Para autenticação social
2. **Sincronização Real-time** - Usando Firebase Listeners
3. **Cache Local** - IndexedDB para dados offline
4. **Testes Unitários** - Jest para serviços
5. **Testes E2E** - Cypress para fluxos
6. **CI/CD** - GitHub Actions para deploy automático

## 🐛 Troubleshooting

### Token Expirado
- Usuário é redirecionado para login automaticamente
- Token é removido do localStorage
- Nova autenticação é necessária

### CORS Errors
- Backend tem CORS configurado para aceitar requisições do Frontend
- Verificar se API_URL está correto

### Requisições Falhando
- Verificar Network tab no DevTools
- Confirmar se Backend está rodando
- Validar dados enviados

## 📚 Referências

- [Express.js Documentation](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
