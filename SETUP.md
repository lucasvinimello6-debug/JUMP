# 🚀 Guia de Setup - JUMP SaaS

## Pré-requisitos

- Node.js v18+ e npm/yarn
- Firebase Project (criado)
- Twilio Account (para SMS/WhatsApp)
- Git

## 📦 Instalação do Backend

### 1. Navegue para o diretório backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Preencha com suas credenciais:

```env
# Firebase
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_PRIVATE_KEY=seu-private-key
FIREBASE_CLIENT_EMAIL=seu-client-email

# Twilio
TWILIO_ACCOUNT_SID=seu-account-sid
TWILIO_AUTH_TOKEN=seu-auth-token
TWILIO_PHONE_NUMBER=+55XXXXXXXXXX

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura

# Server
PORT=3000
NODE_ENV=development
```

### 4. Configure o Firebase

```bash
# Copie sua chave de credenciais do Firebase
# e adicione ao arquivo .env

# Para teste local, você pode usar o emulador Firebase
firebase emulators:start
```

### 5. Inicie o servidor

```bash
npm start
```

Você deve ver:

```
✅ Server running on http://localhost:3000
🔥 Firebase initialized
📱 Twilio configured
```

## 🎨 Setup do Frontend

### 1. Configure a API URL

Edite `frontend/js/config.js`:

```javascript
export const apiConfig = {
  baseURL: 'http://localhost:3000', // Para desenvolvimento
  // ou 'https://api.jump.com' para produção
  endpoints: { ... }
};
```

### 2. Servir o Frontend

Você pode usar qualquer servidor HTTP. Exemplos:

**Com Python:**
```bash
cd frontend
python -m http.server 8000
```

**Com Node.js (http-server):**
```bash
npm install -g http-server
cd frontend
http-server
```

**Com Live Server (VS Code):**
- Instale a extensão "Live Server"
- Clique direito em `frontend/index.html` → "Open with Live Server"

### 3. Acesse no navegador

```
http://localhost:8000
```

## 🧪 Testando a Integração

### 1. Teste de Login

1. Acesse `http://localhost:8000/frontend/pages/welcome.html`
2. Clique em "Login"
3. Insira credenciais de teste:
   - Email: `teste@email.com`
   - Senha: `Teste@123456`
4. Você deve ser redirecionado para o dashboard

### 2. Teste de Cadastro

1. Na tela de login, clique em "Cadastre-se"
2. Preencha o formulário:
   - Nome: `João Silva`
   - Email: `joao@email.com`
   - Telefone: `(11) 99999-9999`
   - Senha: `MinhaSenh@123`
3. Aceite os termos
4. Clique em "Criar Conta"
5. Você deve ser redirecionado para o dashboard

### 3. Teste de API Direta

Use Postman ou curl:

```bash
# Listar barbearias
curl -X GET http://localhost:3000/api/barbershops

# Obter slots disponíveis
curl -X GET "http://localhost:3000/api/appointments/available?barbershopId=123&date=2026-01-20"

# Criar agendamento (requer autenticação)
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "barbershopId": "123",
    "serviceId": "456",
    "date": "2026-01-20",
    "time": "10:00"
  }'
```

## 🔍 Verificando a Conexão

### 1. Abra o DevTools (F12)

- Vá em Console
- Você deve ver: `🚀 JUMP App inicializado`

### 2. Verifique requisições de rede

- Vá em Network
- Tente fazer login
- Você deve ver uma requisição POST para `http://localhost:3000/api/auth/login`
- Status: 200 (sucesso) ou 401 (erro)

### 3. Verifique localStorage

- Abra DevTools → Application → Storage → Local Storage
- Procure pelas chaves:
  - `authToken` - JWT token
  - `jumpUser` - Dados do usuário JSON

## 📱 Testando em Mobile

### 1. Descubra seu IP local

```bash
# Windows
ipconfig
# ou
# Mac/Linux
ifconfig
```

### 2. Acesse do celular

Abra no navegador do celular:
```
http://SEU_IP:8000
```

Exemplo:
```
http://192.168.1.100:8000
```

## 🐛 Troubleshooting

### "Failed to fetch" / CORS Error

**Problema**: Frontend não consegue conectar ao Backend

**Solução**:
1. Verifique se Backend está rodando (`npm start`)
2. Confirme a porta: Backend deve estar em `3000`
3. Verifique `frontend/js/config.js` - `baseURL` deve ser `http://localhost:3000`
4. Limpe o cache do navegador

### "Unauthorized" / Token Expirado

**Problema**: Erro 401 nas requisições

**Solução**:
1. Faça login novamente
2. Verifique se o token está em `localStorage`
3. Confirme se Backend está enviando token válido

### Firebase Error

**Problema**: Erro ao conectar com Firebase

**Solução**:
1. Verifique `FIREBASE_PROJECT_ID` em `.env`
2. Confirme se credenciais estão corretas
3. Verifique permissões no Firebase Console

### Twilio Error

**Problema**: SMS/WhatsApp não está sendo enviado

**Solução**:
1. Verifique `TWILIO_ACCOUNT_SID` e `TWILIO_AUTH_TOKEN`
2. Confirme se `TWILIO_PHONE_NUMBER` está correto
3. Verifique se números de telefone estão no formato internacional

## 🚀 Deploy

### Frontend (Vercel)

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Backend (Firebase Functions)

```bash
# Instale Firebase CLI
npm install -g firebase-tools

# Configure
firebase login
firebase init functions

# Deploy
firebase deploy --only functions
```

### Backend (Heroku)

```bash
# Instale Heroku CLI
# Crie arquivo Procfile

# Deploy
git push heroku main
```

## 📚 Estrutura de Pastas

```
JUMP/
├── frontend/
│   ├── index.html
│   ├── js/
│   │   ├── app.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── welcome.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── home.html
│   │   ├── barbershops.html
│   │   └── ... mais páginas
│   ├── INTEGRATION.md
│   └── README.md
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── index.js
│   │   ├── config/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── integrations/
│   │   ├── functions/
│   │   └── security/
│   ├── API_DOCUMENTATION.md
│   └── README.md
└── README.md
```

## ✅ Checklist Pré-Lançamento

- [ ] Backend rodando localmente sem erros
- [ ] Frontend conectando ao Backend
- [ ] Fluxo de login/signup funcionando
- [ ] Agendamentos sendo criados com sucesso
- [ ] Notificações SMS/WhatsApp enviando
- [ ] Testes em mobile
- [ ] Variáveis de ambiente configuradas
- [ ] API_URL apontando para produção
- [ ] Firebase rules ativadas
- [ ] Certificados SSL configurados

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs: `npm start` (com verbose mode)
2. Confira a documentação: `INTEGRATION.md`
3. Teste endpoints com Postman
4. Verifique DevTools (F12 → Console e Network)

## 🎉 Pronto!

Sua integração está completa! 

Próximas funcionalidades para implementar:
- [ ] Integração com Firebase Auth (social login)
- [ ] Sincronização real-time
- [ ] Cache offline
- [ ] Testes automatizados
- [ ] Analytics
