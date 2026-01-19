/**
 * JUMP Backend - Integração Twilio
 * Envio de notificações via WhatsApp e SMS
 */

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export class NotificationService {
  /**
   * Envia notificação via WhatsApp
   */
  static async sendWhatsAppMessage(phoneNumber, message) {
    try {
      const result = await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phoneNumber}`,
        body: message
      });

      console.log(`WhatsApp enviado: ${result.sid}`);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('Erro ao enviar WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Envia notificação via SMS
   */
  static async sendSmsMessage(phoneNumber, message) {
    try {
      const result = await twilio.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        body: message
      });

      console.log(`SMS enviado: ${result.sid}`);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Envia lembrete de agendamento
   */
  static async sendAppointmentReminder(appointment, userPhone) {
    const message = `
Olá! 👋 Lembrando que você tem um agendamento agendado para:
📅 ${appointment.date} às ${appointment.time}
📍 ${appointment.barbershopName}
💈 Serviço: ${appointment.serviceName}

Confirme sua presença ou cancele com 24 horas de antecedência.
Obrigado!
JUMP - Seu Agendamento Inteligente
    `.trim();

    return await this.sendWhatsAppMessage(userPhone, message);
  }

  /**
   * Envia confirmação de agendamento
   */
  static async sendConfirmationMessage(appointment, userPhone) {
    const message = `
✅ Seu agendamento foi confirmado!
🗓️ Data: ${appointment.date}
⏰ Hora: ${appointment.time}
📍 Local: ${appointment.barbershopName}
💈 Serviço: ${appointment.serviceName}

Até breve! 💪
JUMP - Seu Agendamento Inteligente
    `.trim();

    return await this.sendWhatsAppMessage(userPhone, message);
  }

  /**
   * Envia cancelamento de agendamento
   */
  static async sendCancellationMessage(appointment, userPhone, reason = '') {
    const reasonText = reason ? `\nMotivo: ${reason}` : '';
    const message = `
❌ Seu agendamento foi cancelado.
📅 Data: ${appointment.date}
⏰ Hora: ${appointment.time}
📍 Local: ${appointment.barbershopName}${reasonText}

Entre em contato conosco se tiver dúvidas.
JUMP - Seu Agendamento Inteligente
    `.trim();

    return await this.sendWhatsAppMessage(userPhone, message);
  }
}

export default NotificationService;
