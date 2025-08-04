import { API_CONFIG, ENDPOINTS, ACTIONS, ERROR_MESSAGES } from '../config/api.config';

// Configuración de la API
const API_BASE_URL = API_CONFIG.BASE_URL;

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Método genérico para hacer peticiones
  async makeRequest(endpoint, method = 'GET', data = null) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Guardar datos del onboarding
  async saveOnboardingData(userData) {
    return this.makeRequest(ENDPOINTS.ONBOARDING, 'POST', {
      action: ACTIONS.SAVE_ONBOARDING,
      data: userData
    });
  }

  // Obtener datos del usuario
  async getUserData(userId) {
    return this.makeRequest(`${ENDPOINTS.USER}/${userId}`, 'GET');
  }

  // Guardar progreso diario
  async saveDailyProgress(userId, progressData) {
    return this.makeRequest(ENDPOINTS.PROGRESS, 'POST', {
      action: ACTIONS.SAVE_DAILY_PROGRESS,
      userId,
      data: progressData
    });
  }

  // Obtener rutina de entrenamiento
  async getWorkoutRoutine(userId, date) {
    return this.makeRequest(`${ENDPOINTS.WORKOUT}/${userId}`, 'POST', {
      action: ACTIONS.GET_WORKOUT_ROUTINE,
      date
    });
  }

  // Guardar feedback de ejercicio
  async saveExerciseFeedback(userId, exerciseId, feedback) {
    return this.makeRequest(ENDPOINTS.FEEDBACK, 'POST', {
      action: ACTIONS.SAVE_EXERCISE_FEEDBACK,
      userId,
      exerciseId,
      feedback
    });
  }

  // Obtener progreso histórico
  async getProgressHistory(userId) {
    return this.makeRequest(`${ENDPOINTS.PROGRESS}/${userId}`, 'GET');
  }

  // Obtener recomendaciones de la IA
  async getAIRecommendations(userId) {
    return this.makeRequest(`${ENDPOINTS.AI_RECOMMENDATIONS}/${userId}`, 'GET');
  }

  // Guardar mediciones corporales
  async saveBodyMeasurements(userId, measurements) {
    return this.makeRequest(ENDPOINTS.MEASUREMENTS, 'POST', {
      action: ACTIONS.SAVE_BODY_MEASUREMENTS,
      userId,
      data: measurements
    });
  }

  // Obtener estadísticas
  async getStatistics(userId) {
    return this.makeRequest(`${ENDPOINTS.STATISTICS}/${userId}`, 'GET');
  }

  // Cambiar perfil
  async switchProfile(profileId) {
    return this.makeRequest('/profile/switch', 'POST', {
      action: ACTIONS.SWITCH_PROFILE,
      profileId
    });
  }

  // Obtener lista de perfiles
  async getProfiles() {
    return this.makeRequest(ENDPOINTS.PROFILES, 'GET');
  }

  // Crear nuevo perfil
  async createProfile(profileData) {
    return this.makeRequest('/profile', 'POST', {
      action: ACTIONS.CREATE_PROFILE,
      data: profileData
    });
  }

  // Eliminar perfil
  async deleteProfile(profileId) {
    return this.makeRequest(`/profile/${profileId}`, 'DELETE');
  }

  // Obtener configuración de la aplicación
  async getAppConfig() {
    return this.makeRequest(ENDPOINTS.CONFIG, 'GET');
  }

  // Guardar configuración de la aplicación
  async saveAppConfig(config) {
    return this.makeRequest(ENDPOINTS.CONFIG, 'POST', {
      action: ACTIONS.SAVE_APP_CONFIG,
      data: config
    });
  }

  // Método para manejar errores de red
  handleNetworkError(error) {
    console.error('Network Error:', error);
    
    // Aquí puedes implementar lógica específica para diferentes tipos de errores
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    if (error.message.includes('404')) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    
    if (error.message.includes('500')) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }
    
    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }

  // Método para validar respuestas
  validateResponse(response) {
    if (!response || typeof response !== 'object') {
      throw new Error('Respuesta inválida del servidor');
    }
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response;
  }
}

// Instancia singleton del servicio de API
const apiService = new ApiService();

export default apiService; 