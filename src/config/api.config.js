// Configuración de la API
export const API_CONFIG = {
  // URL base de Google Apps Script
  BASE_URL: process.env.REACT_APP_API_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  
  // Configuración de la aplicación
  APP_NAME: process.env.REACT_APP_APP_NAME || 'Somos Fitness',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Configuración de desarrollo
  DEBUG: process.env.REACT_APP_DEBUG === 'true' || false,
  
  // Timeouts
  REQUEST_TIMEOUT: 10000, // 10 segundos
  
  // Configuración de reintentos
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

// Configuración de endpoints
export const ENDPOINTS = {
  ONBOARDING: '/onboarding',
  USER: '/user',
  PROGRESS: '/progress',
  WORKOUT: '/workout',
  FEEDBACK: '/feedback',
  MEASUREMENTS: '/measurements',
  STATISTICS: '/statistics',
  PROFILES: '/profiles',
  CONFIG: '/config',
  AI_RECOMMENDATIONS: '/ai/recommendations',
};

// Configuración de acciones
export const ACTIONS = {
  SAVE_ONBOARDING: 'saveOnboarding',
  SAVE_DAILY_PROGRESS: 'saveDailyProgress',
  GET_WORKOUT_ROUTINE: 'getWorkoutRoutine',
  SAVE_EXERCISE_FEEDBACK: 'saveExerciseFeedback',
  SAVE_BODY_MEASUREMENTS: 'saveBodyMeasurements',
  SWITCH_PROFILE: 'switchProfile',
  CREATE_PROFILE: 'createProfile',
  SAVE_APP_CONFIG: 'saveAppConfig',
};

// Configuración de errores
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta de nuevo.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  NOT_FOUND: 'Recurso no encontrado.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  VALIDATION_ERROR: 'Los datos ingresados no son válidos.',
  UNKNOWN_ERROR: 'Error inesperado. Intenta de nuevo.',
};

// Configuración de validación
export const VALIDATION_RULES = {
  MIN_AGE: 13,
  MAX_AGE: 100,
  MIN_WEIGHT: 30, // kg
  MAX_WEIGHT: 300, // kg
  MIN_HEIGHT: 100, // cm
  MAX_HEIGHT: 250, // cm
  MIN_MEASUREMENT: 20, // cm
  MAX_MEASUREMENT: 200, // cm
};

// Configuración de objetivos
export const GOALS = {
  LOSE_FAT: 'Reducción del Tejido Adiposo (Pérdida de Grasa)',
  GAIN_MUSCLE: 'Hipertrofia Muscular (Aumento de Masa Muscular)',
  GAIN_STRENGTH: 'Adaptaciones Neurales y Aumento de la Fuerza Máxima',
  RECOMPOSITION: 'Recomposición Corporal',
  IMPROVE_RESISTANCE: 'Mejora de la Resistencia (Muscular y/o Cardiovascular)',
  IMPROVE_POWER: 'Mejora de la Potencia (Entrenamiento de Potencia)',
  IMPROVE_MOBILITY: 'Mejora de la Movilidad y Flexibilidad',
};

// Configuración de niveles de experiencia
export const EXPERIENCE_LEVELS = {
  BEGINNER: 'Principiante (nunca o casi nunca he entrenado)',
  INTERMEDIATE: 'Intermedio (he entrenado antes, conozco los ejercicios básicos)',
  ADVANCED: 'Avanzado (entreno de forma consistente)',
};

// Configuración de equipamiento
export const EQUIPMENT = {
  BODYWEIGHT: 'bodyweight',
  RESISTANCE_BANDS: 'resistanceBands',
  DUMBBELLS: 'dumbbells',
  PULL_UP_BAR: 'pullUpBar',
  FULL_GYM: 'fullGym',
};

// Configuración de tipos de ejercicio
export const EXERCISE_TYPES = {
  WEIGHTS: 'Pesas',
  MACHINE: 'Máquina',
  CARDIO: 'Cardio',
  HIIT: 'HIIT',
  YOGA: 'Yoga',
  CALISTHENICS: 'Calistenia',
};

// Configuración de objetivos secundarios y terciarios
export const SECONDARY_GOALS = {
  CARDIOVASCULAR_RESISTANCE: 'Aumento de la Resistencia Cardiovascular',
  POWER_IMPROVEMENT: 'Mejora de la Potencia',
  AGILITY_COORDINATION: 'Incremento de la Agilidad y la Coordinación',
  SKILLS_TECHNIQUE: 'Dominio de Habilidades y Técnica de Ejercicios',
  FLEXIBILITY_MOBILITY: 'Mejora de la Flexibilidad y Movilidad Articular',
  BALANCE_IMPROVEMENT: 'Mejora del Equilibrio',
  STRESS_REDUCTION: 'Reducción del Estrés y Mejora de la Salud Mental',
  POSTURE_IMPROVEMENT: 'Mejora de la Postura Corporal',
  ENERGY_SLEEP: 'Aumento de los Niveles de Energía y Mejora de la Calidad del Sueño',
  SPECIFIC_SPORT: 'Entrenamiento para un Deporte Específico',
  PRENATAL_POSTPARTUM: 'Entrenamiento Prenatal o Postparto',
}; 