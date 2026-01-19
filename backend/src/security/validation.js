/**
 * JUMP Backend - Security & Input Validation
 * Sanitização de inputs e proteção contra vulnerabilidades
 */

import Joi from 'joi';
import validator from 'validator';

/**
 * Sanitiza string removendo caracteres perigosos
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return validator.escape(str).trim();
};

/**
 * Valida e sanitiza email
 */
export const validateEmail = (email) => {
  const sanitized = sanitizeString(email).toLowerCase();
  if (!validator.isEmail(sanitized)) {
    throw new Error('Email inválido');
  }
  return sanitized;
};

/**
 * Valida data no formato YYYY-MM-DD
 */
export const validateDate = (date) => {
  if (!validator.isISO8601(date)) {
    throw new Error('Data deve estar em formato YYYY-MM-DD');
  }

  const dateObj = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (dateObj < now) {
    throw new Error('Data não pode ser no passado');
  }

  return date;
};

/**
 * Valida hora no formato HH:mm
 */
export const validateTime = (time) => {
  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error('Hora deve estar em formato HH:mm');
  }

  const [hours, minutes] = time.split(':').map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Hora inválida');
  }

  return time;
};

/**
 * Valida telefone
 */
export const validatePhone = (phone) => {
  const sanitized = sanitizeString(phone).replace(/\D/g, '');
  if (sanitized.length < 10 || sanitized.length > 15) {
    throw new Error('Telefone deve ter entre 10 e 15 dígitos');
  }
  return sanitized;
};

/**
 * Valida schema Joi com tratamento de erro
 */
export const validateSchema = async (data, schema) => {
  try {
    const { error, value } = schema.validate(data, { 
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      const messages = error.details.map(detail => detail.message);
      throw new Error(`Validação falhou: ${messages.join(', ')}`);
    }

    return value;
  } catch (error) {
    throw error;
  }
};

/**
 * Middleware para sanitizar inputs
 */
export const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObjectRecursive(req.body);
  }
  next();
};

/**
 * Sanitiza objeto recursivamente
 */
const sanitizeObjectRecursive = (obj) => {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObjectRecursive(item));
  } else if (obj !== null && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObjectRecursive(value);
    }
    return sanitized;
  }
  return obj;
};

/**
 * Middleware para validação de payload
 */
export const validatePayload = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = await validateSchema(req.body, schema);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};

export default {
  sanitizeString,
  validateEmail,
  validateDate,
  validateTime,
  validatePhone,
  validateSchema,
  sanitizeInputs,
  validatePayload
};
