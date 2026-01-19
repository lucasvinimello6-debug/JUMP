/**
 * JUMP Backend - Database Configuration
 * Firestore Schema Initialization
 */

export const firestoreSchema = {
  collections: {
    users: {
      description: "Perfil dos usuários (clientes e barbeiros)",
      fields: {
        uid: "string (ID do Firebase)",
        email: "string",
        displayName: "string",
        photoURL: "string",
        phone: "string",
        role: "string (client, barber, admin)",
        userType: "string (customer, professional)",
        createdAt: "timestamp",
        updatedAt: "timestamp",
        isActive: "boolean"
      }
    },

    services: {
      description: "Catálogo de serviços oferecidos",
      fields: {
        id: "string (auto-generated)",
        name: "string - Ex: Degradê",
        price: "number - Ex: 60",
        duration: "number - Em minutos",
        description: "string",
        category: "string (cortes, barba, combo, extras)",
        icon: "string (material icon name)",
        active: "boolean",
        barbershopId: "string (referência)",
        createdAt: "timestamp",
        updatedAt: "timestamp"
      }
    },

    appointments: {
      description: "Agendamentos realizados",
      fields: {
        id: "string (auto-generated)",
        userId: "string - ID do cliente",
        clientName: "string - Nome exibição",
        barberId: "string - ID do barbeiro",
        barbershopId: "string - ID da barbearia",
        serviceId: "string - ID do serviço",
        date: "string - ISO (YYYY-MM-DD)",
        time: "string - HH:mm",
        endTime: "string - HH:mm (calculado)",
        status: "string (pending, confirmed, done, cancelled, no-show)",
        notes: "string - Observações do cliente",
        reminderSent: "boolean",
        reminderType: "string (whatsapp, sms, email)",
        createdAt: "timestamp",
        updatedAt: "timestamp",
        cancelledAt: "timestamp (se cancelado)"
      }
    },

    businessConfig: {
      description: "Configurações da barbearia",
      fields: {
        barbershopId: "string (referência)",
        workingHours: {
          monday: "{ open: '09:00', close: '19:00', closed: false }",
          tuesday: "{ open: '09:00', close: '19:00', closed: false }",
          wednesday: "{ open: '09:00', close: '19:00', closed: false }",
          thursday: "{ open: '09:00', close: '19:00', closed: false }",
          friday: "{ open: '09:00', close: '20:00', closed: false }",
          saturday: "{ open: '09:00', close: '18:00', closed: false }",
          sunday: "{ open: '10:00', close: '17:00', closed: true }"
        },
        blockedDates: "array - Datas que a barbearia está fechada",
        breakTime: "number - Tempo entre agendamentos (minutos)",
        advanceBookingDays: "number - Dias à frente que aceita agendamentos",
        timezone: "string - Ex: America/Sao_Paulo",
        updatedAt: "timestamp"
      }
    },

    barbershops: {
      description: "Perfil das barbearias",
      fields: {
        id: "string (auto-generated)",
        name: "string",
        email: "string",
        phone: "string",
        address: "string",
        city: "string",
        state: "string",
        zipCode: "string",
        latitude: "number",
        longitude: "number",
        photoURL: "string",
        description: "string",
        rating: "number (1-5)",
        totalReviews: "number",
        ownerId: "string - Referência ao usuário admin",
        barbers: "array<string> - IDs dos barbeiros",
        services: "array<string> - IDs dos serviços",
        isActive: "boolean",
        createdAt: "timestamp",
        updatedAt: "timestamp"
      }
    },

    reviews: {
      description: "Avaliações dos clientes",
      fields: {
        id: "string (auto-generated)",
        appointmentId: "string",
        userId: "string - ID do cliente",
        barbershopId: "string",
        rating: "number (1-5)",
        comment: "string",
        createdAt: "timestamp",
        updatedAt: "timestamp"
      }
    },

    notifications: {
      description: "Histórico de notificações enviadas",
      fields: {
        id: "string (auto-generated)",
        userId: "string",
        appointmentId: "string",
        type: "string (reminder, confirmation, cancellation)",
        channel: "string (whatsapp, sms, email)",
        message: "string",
        status: "string (sent, failed, delivered)",
        sentAt: "timestamp",
        error: "string (se falhou)"
      }
    }
  }
};

/**
 * Firestore Security Rules
 */
export const firestoreSecurityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Acesso público apenas para serviços e barbearias
    match /services/{document=**} {
      allow read;
    }
    match /barbershops/{document=**} {
      allow read;
    }

    // Usuários só podem ver seu próprio perfil
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }

    // Clientes podem ver e criar seus agendamentos
    match /appointments/{appointmentId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }

    // Barbeiros podem gerenciar agendamentos de sua barbearia
    match /appointments/{appointmentId} {
      allow read, write: if request.auth.uid in get(/databases/$(database)/documents/barbershops/$(resource.data.barbershopId)).data.barbers;
    }

    // Configurações da barbearia - apenas admin
    match /businessConfig/{config} {
      allow read: if true;
      allow write: if isBarberAdmin();
    }

    // Reviews públicas
    match /reviews/{document=**} {
      allow read;
      allow create: if request.auth != null;
    }

    // Função auxiliar
    function isBarberAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
`;

export default firestoreSchema;
