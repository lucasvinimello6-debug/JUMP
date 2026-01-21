/**
 * JUMP Frontend - Simple Demo Mode
 * Simula login e dados quando backend não está disponível
 */

// Usuários de teste
const DEMO_USERS = {
  'cliente@test.com': {
    id: 'user-1',
    name: 'João Cliente',
    email: 'cliente@test.com',
    phone: '11999999999',
    role: 'client',
    createdAt: new Date().toISOString()
  },
  'barbeiro@test.com': {
    id: 'barber-1',
    name: 'Maria Barbeira',
    email: 'barbeiro@test.com',
    phone: '11988888888',
    role: 'barber',
    createdAt: new Date().toISOString()
  }
};

const DEMO_PASSWORD = 'teste123456';

// Simula barbershops
const DEMO_BARBERSHOPS = [
  {
    id: 'shop-1',
    name: 'Barbearia do João',
    city: 'São Paulo',
    address: 'Rua das Flores, 123',
    phone: '1133334444',
    rating: 4.8,
    reviews: 256,
    distance: 2.3,
    image: 'https://images.unsplash.com/photo-1585314319236-1855c6c4e886?w=400&h=300&fit=crop'
  },
  {
    id: 'shop-2',
    name: 'Cortes Modernos',
    city: 'São Paulo',
    address: 'Avenida Paulista, 1000',
    phone: '1144445555',
    rating: 4.6,
    reviews: 189,
    distance: 5.1,
    image: 'https://images.unsplash.com/photo-1599351856676-eb5c6e3d5b3c?w=400&h=300&fit=crop'
  },
  {
    id: 'shop-3',
    name: 'Barbershop Premium',
    city: 'São Paulo',
    address: 'Rua Augusta, 2000',
    phone: '1155556666',
    rating: 4.9,
    reviews: 342,
    distance: 1.8,
    image: 'https://images.unsplash.com/photo-1560066620-ce8e6ad0a885?w=400&h=300&fit=crop'
  }
];

export class DemoAuthService {
  static login(email, password) {
    const user = DEMO_USERS[email];
    
    if (!user || password !== DEMO_PASSWORD) {
      throw new Error('Email ou senha inválidos');
    }

    const token = 'demo-token-' + Date.now();
    localStorage.setItem('authToken', token);
    localStorage.setItem('jumpUser', JSON.stringify(user));
    
    return { token, user };
  }

  static signup(userData) {
    const { name, email, phone, password } = userData;

    if (!name || !email || !phone || !password) {
      throw new Error('Preencha todos os campos');
    }

    if (DEMO_USERS[email]) {
      throw new Error('Email já cadastrado');
    }

    const user = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      role: 'client',
      createdAt: new Date().toISOString()
    };

    const token = 'demo-token-' + Date.now();
    localStorage.setItem('authToken', token);
    localStorage.setItem('jumpUser', JSON.stringify(user));
    
    // Salvar novo usuário
    DEMO_USERS[email] = user;
    
    return { token, user };
  }

  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('jumpUser');
  }

  static getCurrentUser() {
    const user = localStorage.getItem('jumpUser');
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated() {
    return !!localStorage.getItem('authToken') && !!this.getCurrentUser();
  }
}

export class DemoBarbershopApi {
  static async getBarbershops(city = null, search = null) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...DEMO_BARBERSHOPS];

    if (city) {
      results = results.filter(s => s.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (search) {
      results = results.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    return results;
  }

  static async getBarbershop(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return DEMO_BARBERSHOPS.find(s => s.id === id);
  }
}

export class DemoAppointmentApi {
  static async getAvailableSlots(barbershopId, date) {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simula slots disponíveis
    const slots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30'
    ];

    // Remove alguns slots aleatoriamente
    return slots.filter(() => Math.random() > 0.3);
  }

  static async createAppointment(appointmentData) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const appointment = {
      id: 'apt-' + Date.now(),
      ...appointmentData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    return appointment;
  }

  static async getAppointments(userId = null) {
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 'apt-1',
        barbershop: 'Barbearia do João',
        service: 'Corte + Barba',
        date: '2026-01-25',
        time: '14:00',
        status: 'confirmed',
        price: 80
      },
      {
        id: 'apt-2',
        barbershop: 'Cortes Modernos',
        service: 'Corte',
        date: '2026-02-01',
        time: '10:30',
        status: 'confirmed',
        price: 60
      }
    ];
  }
}
