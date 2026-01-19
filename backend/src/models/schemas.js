/**
 * JUMP Backend - Data Models & Schemas
 * Validação usando Joi
 */

import Joi from 'joi';

// Validação de Usuário
export const userSchema = Joi.object({
  uid: Joi.string().required(),
  email: Joi.string().email().required(),
  displayName: Joi.string().min(2).max(100),
  phone: Joi.string().pattern(/^[0-9+\-\s()]*$/),
  photoURL: Joi.string().uri(),
  role: Joi.string().valid('client', 'barber', 'admin'),
  userType: Joi.string().valid('customer', 'professional'),
  isActive: Joi.boolean()
});

// Validação de Serviço
export const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  duration: Joi.number().integer().min(15).max(480).required(),
  description: Joi.string().max(500),
  category: Joi.string().valid('cortes', 'barba', 'combo', 'extras').required(),
  icon: Joi.string(),
  active: Joi.boolean()
});

// Validação de Agendamento
export const appointmentSchema = Joi.object({
  userId: Joi.string().required(),
  clientName: Joi.string().min(2).max(100).required(),
  barberId: Joi.string().required(),
  barbershopId: Joi.string().required(),
  serviceId: Joi.string().required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  notes: Joi.string().max(500),
  status: Joi.string().valid('pending', 'confirmed', 'done', 'cancelled', 'no-show')
});

// Validação de Configurações da Barbearia
export const businessConfigSchema = Joi.object({
  barbershopId: Joi.string().required(),
  workingHours: Joi.object({
    monday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    tuesday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    wednesday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    thursday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    friday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    saturday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() }),
    sunday: Joi.object({ open: Joi.string().required(), close: Joi.string().required(), closed: Joi.boolean() })
  }),
  blockedDates: Joi.array().items(Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)),
  breakTime: Joi.number().integer().min(0).max(60),
  advanceBookingDays: Joi.number().integer().min(1).max(365),
  timezone: Joi.string()
});

// Validação de Review
export const reviewSchema = Joi.object({
  appointmentId: Joi.string().required(),
  userId: Joi.string().required(),
  barbershopId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(500)
});

// Validação de Barbearia
export const barbershopSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  zipCode: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  photoURL: Joi.string().uri(),
  description: Joi.string().max(1000),
  ownerId: Joi.string().required()
});

export default {
  userSchema,
  serviceSchema,
  appointmentSchema,
  businessConfigSchema,
  reviewSchema,
  barbershopSchema
};
