/**
 * JUMP Backend - Cloud Function para Lembretes Automáticos
 * Executa a cada 15-30 minutos
 */

import functions from 'firebase-functions';
import admin from 'firebase-admin';
import { NotificationService } from '../integrations/twilio.js';

// Inicializar Firebase Admin
admin.initializeApp();

/**
 * Função que verifica agendamentos nas próximas 2 horas
 * e envia lembretes automáticos
 */
export const appointmentReminderJob = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async (context) => {
    try {
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      // Formatar datas
      const today = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().slice(0, 5);

      // Query: Agendamentos confirmados nas próximas 2 horas
      const snapshot = await admin.firestore().collection('appointments')
        .where('date', '==', today)
        .where('status', '==', 'confirmed')
        .where('reminderSent', '==', false)
        .get();

      let reminders_sent = 0;
      let errors = 0;

      for (const doc of snapshot.docs) {
        const appointment = doc.data();

        // Verificar se o agendamento é nas próximas 2 horas
        if (appointment.time >= currentTime && 
            appointment.time <= twoHoursLater.toTimeString().slice(0, 5)) {

          try {
            // Obter dados do usuário (cliente)
            const userDoc = await admin.firestore().collection('users').doc(appointment.userId).get();
            const user = userDoc.data();

            // Obter dados da barbearia
            const barbershopDoc = await admin.firestore().collection('barbershops').doc(appointment.barbershopId).get();
            const barbershop = barbershopDoc.data();

            // Enviar lembrete
            const result = await NotificationService.sendAppointmentReminder(
              {
                date: appointment.date,
                time: appointment.time,
                barbershopName: barbershop.name,
                serviceName: appointment.serviceName
              },
              user.phone
            );

            if (result.success) {
              // Atualizar flag de lembrete enviado
              await admin.firestore().collection('appointments').doc(doc.id).update({
                reminderSent: true,
                reminderType: 'whatsapp',
                updatedAt: admin.firestore.Timestamp.now()
              });

              reminders_sent++;

              // Log no banco de dados de notificações
              await admin.firestore().collection('notifications').add({
                userId: appointment.userId,
                appointmentId: doc.id,
                type: 'reminder',
                channel: 'whatsapp',
                message: `Lembrete para agendamento em ${appointment.date} às ${appointment.time}`,
                status: 'sent',
                sentAt: admin.firestore.Timestamp.now()
              });
            } else {
              errors++;
              console.error(`Erro ao enviar lembrete para ${user.phone}:`, result.error);
            }
          } catch (error) {
            errors++;
            console.error(`Erro ao processar agendamento ${doc.id}:`, error);
          }
        }
      }

      console.log(`Lembretes: ${reminders_sent} enviados, ${errors} erros`);
      return { success: true, reminders_sent, errors };
    } catch (error) {
      console.error('Erro na função de lembretes:', error);
      throw error;
    }
  });

/**
 * Função que cancela agendamentos não confirmados após 1 hora
 */
export const cancelPendingAppointments = functions.pubsub
  .schedule('every 60 minutes')
  .onRun(async (context) => {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      // Query: Agendamentos pendentes há mais de 1 hora
      const snapshot = await admin.firestore().collection('appointments')
        .where('status', '==', 'pending')
        .where('createdAt', '<', admin.firestore.Timestamp.fromDate(oneHourAgo))
        .get();

      let cancelled = 0;

      for (const doc of snapshot.docs) {
        await admin.firestore().collection('appointments').doc(doc.id).update({
          status: 'cancelled',
          updatedAt: admin.firestore.Timestamp.now()
        });
        cancelled++;
      }

      console.log(`${cancelled} agendamentos pendentes foram cancelados automaticamente`);
      return { success: true, cancelled };
    } catch (error) {
      console.error('Erro ao cancelar agendamentos pendentes:', error);
      throw error;
    }
  });

export default {
  appointmentReminderJob,
  cancelPendingAppointments
};
