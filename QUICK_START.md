# 🚀 Quick Start - JUMP SaaS

## ⚡ Começar em 5 Minutos

### 1️⃣ Terminal 1 - Inicie o Backend

```bash
cd backend
npm install
npm start
```

**Esperado:**
```
✅ Server running on http://localhost:3000
🔥 Firebase initialized
📱 Twilio configured
```

### 2️⃣ Terminal 2 - Inicie o Frontend

```bash
cd frontend
python -m http.server 8000
```

**Esperado:**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)
```

### 3️⃣ Abra no Navegador

```
http://localhost:8000/frontend/index.html
```

---

## 🎯 Testar Fluxo Completo

### Signup (Registrar)
```
1. Clique em "Começar" (welcome.html)
2. Clique em "Login"
3. Clique em "Não tem conta? Cadastre-se"
4. Preencha:
   - Nome: João Silva
   - Email: joao@exemplo.com
   - Telefone: (11) 99999-9999
   - Senha: SenhaForte123
5. Aceite os termos
6. Clique em "Criar Conta"
7. ✅ Você deve ser redirecionado para home.html
```

### Login
```
1. Acesse http://localhost:8000/frontend/pages/login.html
2. Preencha:
   - Email: joao@exemplo.com
   - Senha: SenhaForte123
3. Clique em "Entrar"
4. ✅ Você deve ver o dashboard
```

### Explorar Barbearias
```
1. Na tela inicial, clique em "Barbearias"
2. Você verá lista de barbearias
3. Use o campo de busca para filtrar
4. Clique nos filtros "Próximas" ou "Mais avaliados"
5. ✅ Lista deve atualizar em tempo real
```

### Fazer Agendamento
```
1. Clique em "Agendar" em uma barbearia
2. Selecione um serviço
3. Selecione uma data
4. Selecione um horário disponível
5. Clique em "Confirmar"
6. ✅ Você verá confirmação com resumo
```

---

## 🔍 Verificar Network

Abra DevTools (`F12`) e vá em **Network**:

### Esperado ver requisições:
- ✅ `POST /api/auth/register` (Status 200) - Cadastro
- ✅ `POST /api/auth/login` (Status 200) - Login
- ✅ `GET /api/barbershops` (Status 200) - Lista de barbearias
- ✅ `GET /api/appointments/available` (Status 200) - Slots disponíveis
- ✅ `POST /api/appointments` (Status 201) - Criar agendamento

---

## 💾 Verificar localStorage

Abra DevTools (`F12`) → **Application** → **Storage** → **Local Storage**:

### Esperado ver chaves:
```
authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
jumpUser:  {
  "id": "user_123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "client"
}
```

---

## 🐛 Se Algo Não Funcionar

### "Failed to fetch" / Erro de conexão
```bash
# Verificar se Backend está rodando
# Esperado:
# Server running on http://localhost:3000

# Se não estiver, execute:
cd backend && npm start
```

### "Unauthorized" / Erro 401
```
# Sua sessão expirou
# Faça login novamente
# Verifique localStorage (F12 → Application)
```

### "Email já existe"
```
# Use outro email
# Exemplo: joao+2@exemplo.com
```

### Erro no Console
```
# Abra DevTools (F12) → Console
# Copie a mensagem de erro
# Procure em SETUP.md → Troubleshooting
```

---

## 📱 Testar em Mobile

### 1. Descubra seu IP local

**Windows:**
```bash
ipconfig
# Procure por "IPv4 Address: 192.168.x.x"
```

**Mac/Linux:**
```bash
ifconfig
# Procure por "inet 192.168.x.x"
```

### 2. Acesse no celular

```
http://192.168.x.x:8000/frontend/index.html
```

Exemplo:
```
http://192.168.1.100:8000/frontend/index.html
```

### 3. Teste no navegador do celular

✅ Design responsivo em mobile (390px)
✅ Touch-friendly buttons
✅ Smooth animations

---

## 🔧 Configuração Necessária

### Firebase (.env backend)
```env
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_PRIVATE_KEY=sua-chave-privada
FIREBASE_CLIENT_EMAIL=seu-email@firebase.iam.gserviceaccount.com
```

### Twilio (.env backend)
```env
TWILIO_ACCOUNT_SID=seu-account-sid
TWILIO_AUTH_TOKEN=seu-auth-token
TWILIO_PHONE_NUMBER=+55119999999999
```

### JWT (.env backend)
```env
JWT_SECRET=sua-chave-super-secreta-minimo-32-caracteres
```

---

## 📚 Documentação Rápida

| Documento | Leia Se... |
|-----------|-----------|
| **SETUP.md** | Quer instruções detalhadas |
| **INTEGRATION.md** | Quer entender a arquitetura |
| **EXAMPLES.md** | Quer exemplos de código |
| **API_DOCUMENTATION.md** | Quer listar de todos endpoints |
| **README.md** | Quer visão geral do projeto |

---

## ✨ Endpoints Principais

### Autenticação
```bash
# Registrar
POST http://localhost:3000/api/auth/register
Body: { name, email, phone, password, role: "client" }

# Login
POST http://localhost:3000/api/auth/login
Body: { email, password }
```

### Barbearias
```bash
# Listar
GET http://localhost:3000/api/barbershops?search=premium&city=são-paulo
```

### Agendamentos
```bash
# Slots disponíveis
GET http://localhost:3000/api/appointments/available?barbershopId=123&date=2026-01-20

# Criar agendamento
POST http://localhost:3000/api/appointments
Headers: Authorization: Bearer {token}
Body: { barbershopId, serviceId, date, time }
```

---

## 🎓 Arquitetura em 30 Segundos

```
┌─────────────────┐
│  Frontend (SPA) │
│  HTML + JS      │
└────────┬────────┘
         │
      HTTP API
         │
┌────────▼────────┐
│ Backend Express │
│  15+ endpoints  │
└────────┬────────┘
         │
    ┌────┴─────────┐
    │              │
┌───▼──┐      ┌───▼──┐
│ Fire │      │Twilio│
│ base │      │ SMS  │
└──────┘      └──────┘
```

---

## 🎯 Funcionalidades Disponíveis

### ✅ Já Implementado
- Login/Signup com validação
- Autenticação JWT
- Lista de barbearias
- Filtros e busca
- Cálculo de disponibilidade
- Agendamento
- Notificações (Twilio)
- Dashboard
- Histórico

### 🔜 Próximas (Phase 2)
- Login social (Google, Apple)
- Pagamento online
- Avaliações e reviews
- Admin dashboard

---

## 📞 Suporte Rápido

**Problema**: Não consegue conectar
- Verifique se Backend está rodando: `npm start`
- Verifique porta: `http://localhost:3000`

**Problema**: Email/Senha inválida
- Use dados corretos do registro
- Limpe localStorage e refaça login

**Problema**: Nenhuma barbearia aparece
- Backend precisa de dados (Firestore)
- Verifique Firebase está configurado

**Problema**: Notificação não chega
- Verifique Twilio está configurado
- Verifique número de telefone no formato internacional

---

## 🚀 Deploy Rápido

### Vercel (Frontend)
```bash
cd frontend
vercel
```

### Firebase Functions (Backend)
```bash
firebase deploy --only functions
```

---

## 📊 Status

| Componente | Status |
|-----------|--------|
| Frontend | ✅ Pronto |
| Backend | ✅ Pronto |
| Integração | ✅ Completa |
| Documentação | ✅ Completa |
| Produção | ✅ Pronto |

---

## 🎉 Você Está Pronto!

Parabéns! 🎊 Seu JUMP SaaS está funcionando!

Próximos passos:
1. ✅ Testar todos os fluxos
2. ✅ Configurar Firebase em produção
3. ✅ Configurar Twilio em produção
4. ✅ Deploy em produção
5. ✅ Monitorar e iterar

---

**Perguntas?** Verifique a documentação completa em `SETUP.md` e `INTEGRATION.md`

**Status**: Production Ready Beta ✅
