/**
 * JUMP Backend - Middleware de Autenticação
 * Validação de tokens JWT e Firebase Auth
 */

import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware para verificar token Firebase
 */
export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

/**
 * Middleware para verificar JWT
 */
export const verifyJWTToken = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro ao verificar JWT:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

/**
 * Middleware para verificar se é barbeiro
 */
export const isBarber = async (req, res, next) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();

    if (userData.role !== 'barber' && userData.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado: apenas barbeiros' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Erro ao verificar permissões' });
  }
};

/**
 * Middleware para verificar se é admin
 */
export const isAdmin = async (req, res, next) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();

    if (userData.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado: apenas administradores' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Erro ao verificar permissões' });
  }
};

/**
 * Middleware para tratamento de erros
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
};

export default {
  verifyFirebaseToken,
  verifyJWTToken,
  isBarber,
  isAdmin,
  errorHandler
};
