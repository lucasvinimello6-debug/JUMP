/**
 * JUMP Backend - Main Server Entry Point
 * Inicialização do Express e definição de rotas
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyFirebaseToken, isBarber, isAdmin, errorHandler } from './middleware/auth.js';
import { sanitizeInputs } from './security/validation.js';
import { AvailabilityService } from './services/availabilityService.js';
import { NotificationService } from './integrations/twilio.js';
import { db } from './config/firebase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(sanitizeInputs);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend JUMP OK', timestamp: new Date().toISOString() });
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================

/**
 * POST /api/auth/register
 * Registra um novo usuário
 */
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { uid, email, displayName, phone, userType } = req.body;

    const userData = {
      uid,
      email: email.toLowerCase(),
      displayName,
      phone,
      userType, // 'customer' ou 'professional'
      role: userType === 'professional' ? 'barber' : 'client',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').doc(uid).set(userData);

    res.status(201).json({ 
      success: true, 
      message: 'Usuário registrado com sucesso',
      user: userData 
    });
  } catch (error) {
    next(error);
  }
});

// ==================== ROTAS DE SERVIÇOS ====================

/**
 * GET /api/services
 * Lista todos os serviços
 */
app.get('/api/services', async (req, res, next) => {
  try {
    const { barbershopId, category } = req.query;
    let query = db.collection('services').where('active', '==', true);

    if (barbershopId) {
      query = query.where('barbershopId', '==', barbershopId);
    }

    const snapshot = await query.get();
    let services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (category) {
      services = services.filter(s => s.category === category);
    }

    res.json({ services, total: services.length });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/services
 * Cria um novo serviço (apenas barbeiro/admin)
 */
app.post('/api/services', verifyFirebaseToken, isBarber, async (req, res, next) => {
  try {
    const { name, price, duration, description, category, icon, barbershopId } = req.body;

    const serviceData = {
      name,
      price: parseFloat(price),
      duration: parseInt(duration),
      description,
      category,
      icon,
      barbershopId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('services').add(serviceData);

    res.status(201).json({
      success: true,
      message: 'Serviço criado com sucesso',
      id: docRef.id,
      service: serviceData
    });
  } catch (error) {
    next(error);
  }
});

// ==================== ROTAS DE AGENDAMENTOS ====================

/**
 * GET /api/appointments/available
 * Retorna slots disponíveis para uma data
 */
app.get('/api/appointments/available', async (req, res, next) => {
  try {
    const { barbershopId, date } = req.query;

    if (!barbershopId || !date) {
      return res.status(400).json({ error: 'barbershopId e date são obrigatórios' });
    }

    const availability = await AvailabilityService.getAvailableSlots(barbershopId, date);

    res.json(availability);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/appointments
 * Cria um novo agendamento
 */
app.post('/api/appointments', verifyFirebaseToken, async (req, res, next) => {
  try {
    const { clientName, barbershopId, serviceId, date, time, notes } = req.body;
    const userId = req.user.uid;

    // Obter serviço para calcular hora de término
    const serviceDoc = await db.collection('services').doc(serviceId).get();
    const service = serviceDoc.data();
    
    const endTime = AvailabilityService.addMinutes(time, service.duration);

    const appointmentData = {
      userId,
      clientName,
      barbershopId,
      serviceId,
      date,
      time,
      endTime,
      status: 'pending',
      notes: notes || '',
      reminderSent: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('appointments').add(appointmentData);

    res.status(201).json({
      success: true,
      message: 'Agendamento criado com sucesso',
      id: docRef.id,
      appointment: appointmentData
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/appointments/:id
 * Obtém detalhes de um agendamento
 */
app.get('/api/appointments/:id', verifyFirebaseToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('appointments').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/appointments/:id
 * Atualiza um agendamento
 */
app.put('/api/appointments/:id', verifyFirebaseToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData = {
      updatedAt: new Date()
    };

    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;

    await db.collection('appointments').doc(id).update(updateData);

    res.json({ success: true, message: 'Agendamento atualizado' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/appointments/:id
 * Cancela um agendamento
 */
app.delete('/api/appointments/:id', verifyFirebaseToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.collection('appointments').doc(id).update({
      status: 'cancelled',
      cancelledAt: new Date(),
      updatedAt: new Date()
    });

    res.json({ success: true, message: 'Agendamento cancelado' });
  } catch (error) {
    next(error);
  }
});

// ==================== ROTAS DE BARBEARIAS ====================

/**
 * GET /api/barbershops
 * Lista todas as barbearias
 */
app.get('/api/barbershops', async (req, res, next) => {
  try {
    const { city, search } = req.query;
    let query = db.collection('barbershops').where('isActive', '==', true);

    const snapshot = await query.get();
    let barbershops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (city) {
      barbershops = barbershops.filter(b => b.city.toLowerCase() === city.toLowerCase());
    }

    if (search) {
      const searchLower = search.toLowerCase();
      barbershops = barbershops.filter(b => 
        b.name.toLowerCase().includes(searchLower) ||
        b.description.toLowerCase().includes(searchLower)
      );
    }

    res.json({ barbershops, total: barbershops.length });
  } catch (error) {
    next(error);
  }
});

// ==================== ROTAS DE CONFIGURAÇÕES ====================

/**
 * GET /api/config/:barbershopId
 * Obtém configurações da barbearia
 */
app.get('/api/config/:barbershopId', async (req, res, next) => {
  try {
    const { barbershopId } = req.params;
    const doc = await db.collection('businessConfig').doc(barbershopId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/config/:barbershopId
 * Atualiza configurações (apenas admin)
 */
app.put('/api/config/:barbershopId', verifyFirebaseToken, isAdmin, async (req, res, next) => {
  try {
    const { barbershopId } = req.params;
    const configData = req.body;

    await db.collection('businessConfig').doc(barbershopId).update({
      ...configData,
      updatedAt: new Date()
    });

    res.json({ success: true, message: 'Configurações atualizadas' });
  } catch (error) {
    next(error);
  }
});

// Error Handler Middleware
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend JUMP rodando em http://localhost:${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🔐 Firebase Project: ${process.env.FIREBASE_PROJECT_ID}`);
});

export default app;
