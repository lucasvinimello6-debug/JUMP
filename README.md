# 📱 JUMP SaaS - Plataforma de Agendamento de Barbershops

## 🎯 Visão Geral do Projeto

JUMP é uma plataforma SaaS completa para agendamento de barbershops que conecta clientes a barbeiros e oferece gerenciamento de disponibilidade em tempo real, notificações automáticas via WhatsApp/SMS e um dashboard intuitivo para ambos os lados (cliente e barbeiro).

**Stack Principal:**
- **Frontend**: HTML5 + Tailwind CSS + JavaScript puro (sem framework)
- **Backend**: Node.js + Express.js
- **Banco de Dados**: Firebase Firestore
- **Autenticação**: Firebase Auth + JWT
- **Notificações**: Twilio (WhatsApp/SMS)
- **Automação**: Firebase Cloud Functions

## 📂 Estrutura do Projeto

```
JUMP/
├── frontend/
│   ├── index.html                    # Landing/Redirecionador
│   ├── js/
│   │   ├── app.js                   # Inicialização global
│   │   ├── config.js                # Configurações (Firebase, API, App)
│   │   ├── api.js                   # Serviços de requisição HTTP
│   │   ├── auth.js                  # Gerenciamento de autenticação
│   │   └── utils.js                 # Funções utilitárias
│   ├── pages/
│   │   ├── welcome.html             # Landing page com CTA
│   │   ├── login.html               # Login com integração de API ✅
│   │   ├── signup.html              # Cadastro com integração de API ✅
│   │   ├── recovery.html            # Recuperação de senha (4 steps)
│   │   ├── home.html                # Dashboard cliente (próximo agendamento)
│   │   ├── barbershops.html         # Lista de barbearias com filtros ✅
│   │   ├── services.html            # Catálogo de serviços
│   │   ├── schedule.html            # Agendamento com slots disponíveis
│   │   ├── confirmation.html        # Confirmação de agendamento
│   │   ├── my-appointments.html     # Histórico de agendamentos
│   │   └── barber-dashboard.html    # Dashboard barbeiro (timeline)
│   ├── INTEGRATION.md               # Documentação de integração
│   ├── EXAMPLES.md                  # Exemplos práticos de uso
│   └── README.md
├── backend/
│   ├── package.json                 # Dependências npm
│   ├── .env.example                 # Template de variáveis de ambiente
│   ├── src/
│   │   ├── index.js                 # Express server com 15+ endpoints
│   │   ├── config/
│   │   │   ├── firebase.js          # Inicialização Firebase Admin SDK
│   │   │   └── database.js          # Schema Firestore + Security Rules
│   │   ├── models/
│   │   │   └── schemas.js           # Validação Joi (user, service, appointment...)
│   │   ├── services/
│   │   │   └── availabilityService.js # Cálculo de slots disponíveis
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT, role-based access control
│   │   ├── integrations/
│   │   │   └── twilio.js            # Notificações WhatsApp/SMS
│   │   ├── functions/
│   │   │   └── reminders.js         # Cloud Functions (reminders, auto-cancel)
│   │   └── security/
│   │       └── validation.js        # Input sanitization, XSS prevention
│   ├── API_DOCUMENTATION.md         # Referência de todos endpoints
│   └── README.md
├── SETUP.md                         # Guia de instalação e deploy
└── README.md
```

## ✨ Funcionalidades Implementadas

### Frontend ✅

#### Autenticação
- ✅ Tela de Login com validação e integração API
- ✅ Tela de Cadastro com validação em tempo real
- ✅ Recuperação de senha (4 steps: email → código → nova senha → sucesso)
- ✅ Gerenciamento de sessão (localStorage + token JWT)
- ✅ Logout com limpeza de dados

#### Cliente (Customer)
- ✅ Dashboard (próximo agendamento, ações rápidas, agendamentos recentes)
- ✅ Lista de Barbearias com busca e filtros (próximas, melhor avaliadas)
- ✅ Catálogo de Serviços por categoria com toggle de seleção
- ✅ Agendamento com seletor de data/hora
- ✅ Confirmação de agendamento com resumo
- ✅ Histórico de Agendamentos (próximos e passados com status)

#### Barbeiro (Barber)
- ✅ Dashboard com timeline de agendamentos do dia
- ✅ Visualização de próximo cliente
- ✅ Ações (Chegou, Reagendar, Cancelar)
- ✅ Status em tempo real (online, em atendimento, disponível)

#### Design System
- ✅ Tema dark mode iOS-inspired
- ✅ Componentes reutilizáveis (cards, botões, inputs)
- ✅ Responsivo (mobile-first, 390px max-width)
- ✅ Animações suaves e feedback visual
- ✅ Acessibilidade (ARIA labels, contraste)

### Backend ✅

#### Autenticação & Segurança
- ✅ Firebase Auth com verificação de email
- ✅ JWT para stateless authentication
- ✅ Middleware de role-based access control (client, barber, admin)
- ✅ Input validation e sanitização (Joi + escape)
- ✅ Rate limiting preparado
- ✅ CORS configurado

#### APIs REST
- ✅ **Auth**: /api/auth/register, /api/auth/login
- ✅ **Services**: GET/POST /api/services (com filtros)
- ✅ **Appointments**: 
  - `GET /api/appointments/available` - Slots com cálculo inteligente
  - `POST /api/appointments` - Criar agendamento
  - `GET/PUT/DELETE /api/appointments/:id` - Gerenciar
- ✅ **Barbershops**: GET /api/barbershops (com busca/filtro)
- ✅ **Config**: GET/PUT /api/config/:barbershopId

#### Disponibilidade (Core Business Logic)
- ✅ AvailabilityService: Calcula slots disponíveis baseado em:
  - Horário de funcionamento da barbearia
  - Duração do serviço
  - Agendamentos existentes (conflitos)
  - Intervalo de descanso entre clientes
- ✅ Retorna lista de times slots disponíveis por data

#### Notificações
- ✅ Twilio integração (WhatsApp + SMS)
- ✅ Notificações: confirmação de agendamento, reminders (2h antes), cancelamentos
- ✅ Personalização de mensagens
- ✅ Logging de tentativas de envio

#### Automação (Cloud Functions)
- ✅ Appointment Reminder Job (executa a cada 30 minutos)
  - Busca agendamentos para os próximas 2 horas
  - Envia reminder via Twilio
- ✅ Cancel Pending Job (executa a cada 60 minutos)
  - Auto-cancela agendamentos não confirmados após 1 hora
  - Notifica cliente

#### Banco de Dados (Firestore)
- ✅ **Collections**:
  - `users` - Clientes e barbeiros (auth, profile, role)
  - `barbershops` - Info da barbearia (nome, endereço, horário)
  - `services` - Serviços oferecidos (nome, preço, duração, categoria)
  - `appointments` - Agendamentos (data, hora, status, cliente, barbeiro)
  - `businessConfig` - Config da barbearia (horário, staff, preços)
  - `reviews` - Avaliações (rating, comentário, cliente)
  - `notifications` - Log de notificações enviadas
- ✅ Security Rules para Row-Level Security (RLS)
  - Clientes veem apenas seus agendamentos
  - Barbeiros veem agendamentos de sua barbearia
  - Admin pode ver tudo

## 🔗 Integração Frontend-Backend

### Fluxo de Autenticação
```
User digitando credenciais
    ↓
Frontend valida input (JS)
    ↓
POST /api/auth/login
    ↓
Backend valida com Firebase
    ↓
Retorna token JWT + user data
    ↓
Frontend armazena em localStorage
    ↓
Requisições futuras incluem: Authorization: Bearer token
    ↓
Middleware verifica token
    ↓
Se expirado → Redireciona para login
```

### Fluxo de Agendamento
```
Cliente seleciona barbearia
    ↓
GET /api/appointments/available?barbershopId=X&date=Y
    ↓
AvailabilityService calcula slots
    ↓
Frontend exibe opções de horário
    ↓
Cliente seleciona serviço + horário
    ↓
POST /api/appointments (com JWT token)
    ↓
Backend cria no Firestore
    ↓
Twilio envia SMS/WhatsApp de confirmação
    ↓
Cloud Function agenda reminder para 2h antes
    ↓
Frontend exibe confirmação
```

### Arquivos Chave de Integração
- `frontend/js/api.js` - Classes ServiceApi, AppointmentApi, BarbershopApi
- `frontend/js/auth.js` - AuthService com métodos login, signup, logout
- `backend/src/index.js` - Express server com todas as rotas
- `backend/src/services/availabilityService.js` - Lógica de disponibilidade

## 📊 Dados de Exemplo

### Usuário
```json
{
  "id": "user_123",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "role": "client", // ou "barber"
  "avatar": "https://...",
  "createdAt": "2026-01-15T10:30:00Z"
}
```

### Serviço
```json
{
  "id": "service_456",
  "name": "Corte Clássico",
  "price": 45,
  "duration": 30, // em minutos
  "category": "Cortes",
  "description": "Corte clássico tradicional",
  "image": "https://..."
}
```

### Agendamento
```json
{
  "id": "appt_789",
  "barbershopId": "barber_111",
  "clientId": "user_123",
  "serviceId": "service_456",
  "date": "2026-01-20",
  "time": "10:00",
  "status": "confirmed", // pending, confirmed, done, cancelled, no-show
  "createdAt": "2026-01-15T14:22:00Z",
  "updatedAt": "2026-01-15T14:22:00Z"
}
```

## 🚀 Como Usar

### 1. Setup Inicial
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Preencher .env com credenciais Firebase, Twilio, JWT
npm start

# Frontend (em outro terminal)
cd frontend
python -m http.server 8000
# Ou usar Live Server do VS Code
```

### 2. Testar Fluxo
1. Acesse `http://localhost:8000`
2. Clique em "Login" → "Não tem conta? Cadastre-se"
3. Preencha o formulário de signup
4. Faça login com as credenciais criadas
5. Explore dashboard → Barbearias → Agendamento

### 3. Testar APIs Diretamente
```bash
# Listar barbearias
curl -X GET http://localhost:3000/api/barbershops

# Obter slots disponíveis (sem auth necessária)
curl -X GET "http://localhost:3000/api/appointments/available?barbershopId=123&date=2026-01-20"

# Criar agendamento (requer token)
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui" \
  -d '{"barbershopId":"123","serviceId":"456","date":"2026-01-20","time":"10:00"}'
```

## 📚 Documentação

- **`frontend/INTEGRATION.md`** - Guia completo de integração Frontend-Backend
- **`frontend/EXAMPLES.md`** - Exemplos práticos de código
- **`backend/API_DOCUMENTATION.md`** - Referência de todos endpoints
- **`SETUP.md`** - Instalação e configuração
- **`backend/src/config/database.js`** - Schema Firestore completo

## 🔄 Próximas Funcionalidades

### Phase 2 (Near Future)
- [ ] Login social (Google, Apple, Facebook)
- [ ] Sincronização real-time com Firebase Listeners
- [ ] Avaliações e reviews pós-agendamento
- [ ] Sistema de cancelamento com aviso prévio
- [ ] Pagamento online (Stripe/Mercado Pago)

### Phase 3 (Medium Term)
- [ ] Painel administrativo de barbearia
- [ ] Gerenciamento de staff e horários
- [ ] Fila de espera para slots lotados
- [ ] Histórico de cliente (preferências, cortes favoritos)
- [ ] Analytics e relatórios de desempenho

### Phase 4 (Long Term)
- [ ] App mobile (React Native/Flutter)
- [ ] Integração com Google Calendar/Outlook
- [ ] Sistema de cupons e promoções
- [ ] Recomendações baseadas em IA
- [ ] Integração com redes sociais (Instagram booking)

## 📞 Suporte e Troubleshooting

### Problema: "Failed to fetch"
**Solução**: Verifique se Backend está rodando e `baseURL` em `config.js` está correto

### Problema: "Unauthorized" (401)
**Solução**: Faça login novamente ou limpe localStorage

### Problema: SMS/WhatsApp não chegando
**Solução**: Verifique credenciais Twilio em `.env` e formato do número (+55)

Veja `SETUP.md` para troubleshooting completo.

## 👥 Times e Responsabilidades

- **Frontend**: HTML/CSS/JS, UI/UX, Integração de APIs
- **Backend**: Express, Firebase, Twilio, Database
- **DevOps**: Deploy, CI/CD, Monitoring
- **Product**: Roadmap, Priorização, Feedback

## 📄 Licença

Este projeto é propriedade da JUMP SaaS. Todos os direitos reservados.

## 🎉 Status

✅ **Completo**: Autenticação, Agendamentos, Notificações, Dashboard
⏳ **Em Desenvolvimento**: Pagamento, Ratings, Admin Dashboard
🔜 **Planejado**: App Mobile, IA, Integrações Sociais

---

**Última atualização**: 19 de janeiro de 2026
**Versão**: 1.0.0
**Status**: Production Ready (Beta)
