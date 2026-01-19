/**
 * JUMP Backend - Serviço de Disponibilidade
 * Cálculo inteligente de slots livres
 */

import { db } from '../config/firebase.js';

export class AvailabilityService {
  /**
   * Obtém os slots disponíveis para uma data específica
   */
  static async getAvailableSlots(barbershopId, date) {
    try {
      // 1. Obter configurações de horário da barbearia
      const businessConfig = await this.getBusinessConfig(barbershopId);
      
      // 2. Verificar se a data é válida
      if (this.isBlockedDate(date, businessConfig.blockedDates)) {
        return { available: false, slots: [], reason: 'Data fechada' };
      }

      // 3. Obter agendamentos existentes
      const appointments = await this.getAppointmentsForDate(barbershopId, date);

      // 4. Gerar slots disponíveis
      const dayName = new Date(date).toLocaleDateString('pt-BR', { weekday: 'long' });
      const dayKey = dayName.toLowerCase();
      const dayHours = businessConfig.workingHours[dayKey];

      if (dayHours.closed) {
        return { available: false, slots: [], reason: 'Barbearia fechada neste dia' };
      }

      const slots = this.generateSlots(
        dayHours.open,
        dayHours.close,
        appointments,
        businessConfig.breakTime || 0
      );

      return { available: slots.length > 0, slots };
    } catch (error) {
      console.error('Erro ao calcular disponibilidade:', error);
      throw error;
    }
  }

  /**
   * Obtém configurações da barbearia
   */
  static async getBusinessConfig(barbershopId) {
    const doc = await db.collection('businessConfig').doc(barbershopId).get();
    if (!doc.exists) {
      throw new Error('Configurações de barbearia não encontradas');
    }
    return doc.data();
  }

  /**
   * Verifica se a data está bloqueada
   */
  static isBlockedDate(date, blockedDates) {
    return blockedDates && blockedDates.includes(date);
  }

  /**
   * Obtém agendamentos da barbearia para uma data
   */
  static async getAppointmentsForDate(barbershopId, date) {
    const snapshot = await db.collection('appointments')
      .where('barbershopId', '==', barbershopId)
      .where('date', '==', date)
      .where('status', 'in', ['pending', 'confirmed'])
      .get();

    return snapshot.docs.map(doc => ({
      time: doc.data().time,
      endTime: doc.data().endTime,
      duration: this.calculateDuration(doc.data().time, doc.data().endTime)
    }));
  }

  /**
   * Gera slots disponíveis baseado no horário de funcionamento
   */
  static generateSlots(openTime, closeTime, appointments, breakTime = 0) {
    const slots = [];
    const slotDuration = 30; // 30 minutos por slot padrão

    let current = this.timeToMinutes(openTime);
    const close = this.timeToMinutes(closeTime);

    while (current + slotDuration <= close) {
      const currentTime = this.minutesToTime(current);
      const nextTime = this.minutesToTime(current + slotDuration);

      // Verificar se o slot conflita com agendamentos
      if (!this.hasConflict(currentTime, nextTime, appointments, breakTime)) {
        slots.push({
          time: currentTime,
          available: true
        });
      }

      current += slotDuration;
    }

    return slots;
  }

  /**
   * Verifica se há conflito de horário
   */
  static hasConflict(startTime, endTime, appointments, breakTime) {
    const bufferStart = this.subtractMinutes(startTime, breakTime);
    const bufferEnd = this.addMinutes(endTime, breakTime);

    return appointments.some(apt => {
      const aptStart = apt.time;
      const aptEnd = apt.endTime;

      // Verificar sobreposição
      return (
        (this.timeToMinutes(startTime) < this.timeToMinutes(aptEnd)) &&
        (this.timeToMinutes(endTime) > this.timeToMinutes(aptStart))
      );
    });
  }

  /**
   * Converte hora HH:mm para minutos
   */
  static timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Converte minutos para HH:mm
   */
  static minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  /**
   * Calcula duração entre dois horários
   */
  static calculateDuration(startTime, endTime) {
    return this.timeToMinutes(endTime) - this.timeToMinutes(startTime);
  }

  /**
   * Subtrai minutos de uma hora
   */
  static subtractMinutes(timeStr, minutes) {
    return this.minutesToTime(this.timeToMinutes(timeStr) - minutes);
  }

  /**
   * Soma minutos a uma hora
   */
  static addMinutes(timeStr, minutes) {
    return this.minutesToTime(this.timeToMinutes(timeStr) + minutes);
  }
}

export default AvailabilityService;
