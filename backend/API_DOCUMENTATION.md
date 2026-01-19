/**
 * JUMP Backend - API Documentation
 * Endpoints disponíveis e como utilizá-los
 */

# JUMP Backend - API Reference

## 🔐 Authentication Endpoints

### POST /api/auth/register
Registra um novo usuário
```json
{
  "uid": "user_firebase_id",
  "email": "user@email.com",
  "displayName": "João Silva",
  "phone": "11999999999",
  "userType": "customer" | "professional"
}
```

## 📋 Services Endpoints

### GET /api/services
Lista serviços disponíveis
- Query Params:
  - `barbershopId`: ID da barbearia (opcional)
  - `category`: Filtrar por categoria (opcional)

### POST /api/services
Cria novo serviço (requer auth)
```json
{
  "name": "Degradê",
  "price": 60,
  "duration": 45,
  "description": "Corte com transição suave",
  "category": "cortes",
  "icon": "content_cut",
  "barbershopId": "barbershop_id"
}
```

## 📅 Appointments Endpoints

### GET /api/appointments/available
Retorna slots disponíveis
- Query Params:
  - `barbershopId`: ID da barbearia (obrigatório)
  - `date`: Data em YYYY-MM-DD (obrigatório)

### POST /api/appointments
Cria novo agendamento (requer auth)
```json
{
  "clientName": "João Silva",
  "barbershopId": "barbershop_id",
  "serviceId": "service_id",
  "date": "2026-01-25",
  "time": "10:00",
  "notes": "Observações adicionais"
}
```

### GET /api/appointments/:id
Obtém detalhes de um agendamento

### PUT /api/appointments/:id
Atualiza agendamento (requer auth)
```json
{
  "status": "confirmed" | "done" | "cancelled",
  "notes": "Novas observações"
}
```

### DELETE /api/appointments/:id
Cancela agendamento (requer auth)

## 🏪 Barbershops Endpoints

### GET /api/barbershops
Lista barbearias
- Query Params:
  - `city`: Filtrar por cidade (opcional)
  - `search`: Buscar por nome/descrição (opcional)

## ⚙️ Configuration Endpoints

### GET /api/config/:barbershopId
Obtém configurações da barbearia

### PUT /api/config/:barbershopId
Atualiza configurações (requer admin)
```json
{
  "workingHours": {
    "monday": { "open": "09:00", "close": "19:00", "closed": false },
    ...
  },
  "blockedDates": ["2026-01-26", "2026-12-25"],
  "breakTime": 0,
  "advanceBookingDays": 30,
  "timezone": "America/Sao_Paulo"
}
```

## 🔄 Cloud Functions

### appointmentReminderJob
Executa a cada 30 minutos para enviar lembretes via WhatsApp

### cancelPendingAppointments
Executa a cada 60 minutos para cancelar agendamentos pendentes

## 🔑 Authentication

Incluir header em requisições autenticadas:
```
Authorization: Bearer {FIREBASE_ID_TOKEN}
```

## 📊 Status Codes

- 200: Sucesso
- 201: Criado com sucesso
- 400: Requisição inválida
- 401: Não autenticado
- 403: Acesso negado
- 404: Não encontrado
- 500: Erro interno do servidor
