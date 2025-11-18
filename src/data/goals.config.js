// Configuración centralizada de metas para el onboarding

// IDs de metas disponibles
export const GOAL_IDS = {
  REHAB: 'rehab',
  BODY_RECOMP: 'body_recomp',
  FAT_LOSS: 'fat_loss',
  MUSCLE_GAIN: 'muscle_gain',
  CARDIO_ENDURANCE: 'cardio_endurance',
  MAX_STRENGTH: 'max_strength',
  POWER_HIIT: 'power_hiit',
  MOBILITY_FLEX: 'mobility_flex',
  MAINTENANCE: 'maintenance',
  POSTURE: 'posture',
  HABITS_SLEEP_HYDRATION: 'habits_sleep_hydration',
  STRESS_WELLBEING: 'stress_wellbeing',
  SPORT_SPECIFIC: 'sport_specific',
  SEXUAL_PERFORMANCE: 'sexual_performance'
};

// Categorías de metas con sus objetivos
export const GOAL_CATEGORIES = [
  {
    id: 'rehabilitation',
    label: 'Rehabilitación',
    goals: [
      { 
        id: GOAL_IDS.REHAB, 
        label: 'Recuperación de lesiones', 
        description: 'Plan guiado para volver a la función segura tras una lesión.' 
      }
    ]
  },
  {
    id: 'sport',
    label: 'Deporte específico',
    goals: [
      { 
        id: GOAL_IDS.SPORT_SPECIFIC, 
        label: 'Entrenamiento específico por deporte', 
        description: 'Mejorar rendimiento en un deporte concreto.' 
      }
    ]
  },
  {
    id: 'fitness',
    label: 'Objetivos físicos',
    goals: [
      { 
        id: GOAL_IDS.BODY_RECOMP, 
        label: 'Recomposición corporal', 
        description: 'Reducir grasa y ganar/mantener masa muscular.' 
      },
      { 
        id: GOAL_IDS.FAT_LOSS, 
        label: 'Pérdida de grasa', 
        description: 'Disminuir % graso con enfoque en déficit y fuerza base.' 
      },
      { 
        id: GOAL_IDS.MUSCLE_GAIN, 
        label: 'Ganancia de músculo', 
        description: 'Hipertrofia con progresión de cargas y nutrición.' 
      },
      { 
        id: GOAL_IDS.CARDIO_ENDURANCE, 
        label: 'Mejora cardiorrespiratoria', 
        description: 'Aumentar VO₂max/resistencia (5K/10K, ciclismo, etc.).' 
      },
      { 
        id: GOAL_IDS.MAX_STRENGTH, 
        label: 'Fuerza máxima', 
        description: 'Mejorar 1RM y fuerza absoluta.' 
      },
      { 
        id: GOAL_IDS.POWER_HIIT, 
        label: 'Potencia/HIIT', 
        description: 'Picos de potencia, sprints, pliometría controlada.' 
      },
      { 
        id: GOAL_IDS.MOBILITY_FLEX, 
        label: 'Movilidad/Flexibilidad', 
        description: 'Optimizar ROM, control motor y técnica.' 
      },
      { 
        id: GOAL_IDS.MAINTENANCE, 
        label: 'Mantenimiento', 
        description: 'Conservar peso/masa/grasa actuales con salud.' 
      }
    ]
  },
  {
    id: 'health_habits',
    label: 'Salud y hábitos',
    goals: [
      { 
        id: GOAL_IDS.POSTURE, 
        label: 'Mejorar postura y core', 
        description: 'Higiene postural y estabilidad lumbopélvica.' 
      },
      { 
        id: GOAL_IDS.HABITS_SLEEP_HYDRATION, 
        label: 'Hábitos (sueño/hidratación)', 
        description: 'Rutinas de descanso, hidratación y constancia.' 
      },
      { 
        id: GOAL_IDS.STRESS_WELLBEING, 
        label: 'Estrés y bienestar', 
        description: 'Movimiento para manejo de estrés y ánimo.' 
      }
    ]
  },
  {
    id: 'sexual',
    label: 'Rendimiento sexual',
    goals: [
      { 
        id: GOAL_IDS.SEXUAL_PERFORMANCE, 
        label: 'Rendimiento sexual (bienestar y condición)', 
        description: 'Plan físico seguro para mejorar bienestar sexual.' 
      }
    ]
  }
];

// Conflictos entre metas (cuando se seleccionan como primarias simultáneas)
export const GOAL_CONFLICTS = {
  [GOAL_IDS.FAT_LOSS]: [GOAL_IDS.MUSCLE_GAIN],
  [GOAL_IDS.MUSCLE_GAIN]: [GOAL_IDS.FAT_LOSS],
  [GOAL_IDS.BODY_RECOMP]: [],
  [GOAL_IDS.REHAB]: [],
  [GOAL_IDS.CARDIO_ENDURANCE]: [],
  [GOAL_IDS.MAX_STRENGTH]: [],
  [GOAL_IDS.POWER_HIIT]: [],
  [GOAL_IDS.MOBILITY_FLEX]: [],
  [GOAL_IDS.MAINTENANCE]: [],
  [GOAL_IDS.POSTURE]: [],
  [GOAL_IDS.HABITS_SLEEP_HYDRATION]: [],
  [GOAL_IDS.STRESS_WELLBEING]: [],
  [GOAL_IDS.SPORT_SPECIFIC]: [],
  [GOAL_IDS.SEXUAL_PERFORMANCE]: []
};

// Sugerencias de metas complementarias
export const GOAL_SUGGESTIONS = {
  [GOAL_IDS.REHAB]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAX_STRENGTH, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.SPORT_SPECIFIC]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAX_STRENGTH, GOAL_IDS.CARDIO_ENDURANCE],
  [GOAL_IDS.SEXUAL_PERFORMANCE]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.HABITS_SLEEP_HYDRATION, GOAL_IDS.STRESS_WELLBEING],
  [GOAL_IDS.FAT_LOSS]: [GOAL_IDS.MAX_STRENGTH, GOAL_IDS.CARDIO_ENDURANCE, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.MUSCLE_GAIN]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.HABITS_SLEEP_HYDRATION, GOAL_IDS.MAINTENANCE],
  [GOAL_IDS.BODY_RECOMP]: [GOAL_IDS.MAX_STRENGTH, GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.CARDIO_ENDURANCE]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAX_STRENGTH, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.MAX_STRENGTH]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.HABITS_SLEEP_HYDRATION, GOAL_IDS.MAINTENANCE],
  [GOAL_IDS.POWER_HIIT]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAX_STRENGTH, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.MOBILITY_FLEX]: [GOAL_IDS.MAX_STRENGTH, GOAL_IDS.MAINTENANCE, GOAL_IDS.HABITS_SLEEP_HYDRATION],
  [GOAL_IDS.MAINTENANCE]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.HABITS_SLEEP_HYDRATION, GOAL_IDS.STRESS_WELLBEING],
  [GOAL_IDS.POSTURE]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAX_STRENGTH],
  [GOAL_IDS.HABITS_SLEEP_HYDRATION]: [GOAL_IDS.MOBILITY_FLEX, GOAL_IDS.MAINTENANCE],
  [GOAL_IDS.STRESS_WELLBEING]: [GOAL_IDS.HABITS_SLEEP_HYDRATION, GOAL_IDS.MOBILITY_FLEX]
};

// Función helper para obtener una meta por ID
export const getGoalById = (goalId) => {
  for (const category of GOAL_CATEGORIES) {
    const goal = category.goals.find(g => g.id === goalId);
    if (goal) return goal;
  }
  return null;
};

// Función helper para verificar conflictos
export const hasConflict = (goalId1, goalId2) => {
  if (!goalId1 || !goalId2) return false;
  return (GOAL_CONFLICTS[goalId1] || []).includes(goalId2) || 
         (GOAL_CONFLICTS[goalId2] || []).includes(goalId1);
};

// Función helper para obtener sugerencias
export const getSuggestions = (goalId) => {
  return GOAL_SUGGESTIONS[goalId] || [];
};

