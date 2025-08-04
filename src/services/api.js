// API Service - Centraliza todas las llamadas al backend
// Según la arquitectura descrita en Context.txt, esto se conectaría con Google Apps Script

class ApiService {
  constructor() {
    // URL base de la API de Google Apps Script
    this.baseURL = process.env.REACT_APP_API_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  }

  // Método genérico para hacer peticiones
  async makeRequest(endpoint, method = 'GET', data = null) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Obtener datos del usuario
  async getUserData(userId) {
    return this.makeRequest(`/user/${userId}`);
  }

  // Obtener entrenamiento del día
  async getTodayWorkout(userId) {
    return this.makeRequest(`/workout/today/${userId}`);
  }

  // Obtener datos de progreso
  async getProgressData(userId, days = 7) {
    return this.makeRequest(`/progress/${userId}?days=${days}`);
  }

  // Obtener datos de peso
  async getWeightData(userId, days = 7) {
    return this.makeRequest(`/weight/${userId}?days=${days}`);
  }

  // Registrar peso
  async recordWeight(userId, weight, date = new Date().toISOString()) {
    return this.makeRequest('/weight/record', 'POST', {
      userId,
      weight,
      date
    });
  }

  // Registrar calorías
  async recordCalories(userId, calories, date = new Date().toISOString()) {
    return this.makeRequest('/calories/record', 'POST', {
      userId,
      calories,
      date
    });
  }

  // Obtener tip del día
  async getDailyTip(userId) {
    return this.makeRequest(`/tip/daily/${userId}`);
  }

  // Obtener racha de entrenamientos
  async getStreakCount(userId) {
    return this.makeRequest(`/streak/${userId}`);
  }

  // Iniciar entrenamiento
  async startWorkout(userId, workoutId) {
    return this.makeRequest('/workout/start', 'POST', {
      userId,
      workoutId,
      startTime: new Date().toISOString()
    });
  }

  // Completar entrenamiento
  async completeWorkout(userId, workoutId, feedback = null) {
    return this.makeRequest('/workout/complete', 'POST', {
      userId,
      workoutId,
      endTime: new Date().toISOString(),
      feedback
    });
  }

  // Obtener recomendaciones de IA
  async getAIRecommendations(userId, context = {}) {
    return this.makeRequest('/ai/recommendations', 'POST', {
      userId,
      context
    });
  }

  // Simulación de datos para desarrollo
  getMockUserData(userId) {
    return {
      id: userId,
      name: 'Marcela',
      goal: 'Tonificar',
      experienceLevel: 'Intermedio',
      equipment: ['Mancuernas', 'Bandas de resistencia'],
      currentWeight: 65,
      targetWeight: 62,
      height: 165,
      age: 28,
      createdAt: '2024-01-01T00:00:00Z'
    };
  }

  getMockLastWorkout() {
    return {
      id: 'workout-001',
      type: 'Fuerza',
      muscleGroup: 'Pecho y Tríceps',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Ayer
      duration: '45 minutos',
      exercises: [
        { 
          name: 'Press de banca', 
          sets: 4, 
          reps: 12, 
          rest: '60s',
          equipment: 'Mancuernas',
          alternative: 'Flexiones de pecho'
        },
        { 
          name: 'Dominadas asistidas', 
          sets: 3, 
          reps: 8, 
          rest: '90s',
          equipment: 'Barra de dominadas',
          alternative: 'Remo con bandas'
        },
        { 
          name: 'Remo con mancuernas', 
          sets: 3, 
          reps: 15, 
          rest: '60s',
          equipment: 'Mancuernas',
          alternative: 'Remo con bandas'
        }
      ],
      completed: true,
      estimatedCalories: 250
    };
  }

  getMockWeightData() {
    return [
      { date: '2024-01-15', weight: 65.2 },
      { date: '2024-01-16', weight: 65.0 },
      { date: '2024-01-17', weight: 64.8 },
      { date: '2024-01-18', weight: 64.9 },
      { date: '2024-01-19', weight: 64.7 },
      { date: '2024-01-20', weight: 64.5 },
      { date: '2024-01-21', weight: 64.3 }
    ];
  }

  getMockDailyTips() {
    return [
      "¡Veo que no has descansado bien! Recuerda que el músculo crece en el descanso, no solo en el gym.",
      "Hoy es un buen día para aumentar la intensidad. ¡Tu cuerpo está listo para más!",
      "No olvides hidratarte bien durante el entrenamiento. El agua es tu mejor aliada.",
      "¡Excelente progreso! Tu consistencia está dando resultados visibles.",
      "Hoy es día de descanso activo. Considera hacer una caminata ligera o estiramientos.",
      "Tu progreso en fuerza está mejorando. ¡Sigue así!"
    ];
  }
}

// Exportar una instancia única del servicio
const apiService = new ApiService();
export default apiService; 