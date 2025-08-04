import React from 'react';
import './WorkoutSelector.css';

const WorkoutSelector = ({ lastWorkout, onWorkoutSelect }) => {
  const workoutOptions = [
    {
      id: 'cardio',
      name: 'Cardio',
      icon: '🏃‍♀️',
      description: 'Entrenamiento cardiovascular',
      duration: '30-45 min',
      intensity: 'Moderada'
    },
    {
      id: 'strength',
      name: 'Fuerza',
      icon: '💪',
      description: 'Entrenamiento de fuerza',
      duration: '45-60 min',
      intensity: 'Alta'
    },
    {
      id: 'flexibility',
      name: 'Flexibilidad',
      icon: '🧘‍♀️',
      description: 'Estiramientos y yoga',
      duration: '20-30 min',
      intensity: 'Baja'
    },
    {
      id: 'hiit',
      name: 'HIIT',
      icon: '⚡',
      description: 'Entrenamiento de alta intensidad',
      duration: '20-30 min',
      intensity: 'Muy Alta'
    },
    {
      id: 'balance',
      name: 'Equilibrio',
      icon: '🎯',
      description: 'Entrenamiento de equilibrio',
      duration: '25-35 min',
      intensity: 'Moderada'
    },
    {
      id: 'sports',
      name: 'Deportes',
      icon: '⚽',
      description: 'Entrenamiento específico',
      duration: '45-60 min',
      intensity: 'Variable'
    }
  ];

  const getRestReminder = () => {
    if (!lastWorkout) return null;
    
    const lastWorkoutDate = new Date(lastWorkout.date);
    const today = new Date();
    const daysDiff = Math.floor((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));
    
    // Si han pasado más de 2 días o es una nueva semana, no mostrar recordatorio
    if (daysDiff > 2 || daysDiff === 0) return null;
    
    const restHours = 48 - (daysDiff * 24);
    if (restHours <= 0) return null;
    
    return {
      muscleGroup: lastWorkout.muscleGroup,
      restHours: restHours
    };
  };

  const restReminder = getRestReminder();

  return (
    <div className="workout-selector">
      <div className="selector-header">
        <h2>🎯 ¿Qué deseas entrenar hoy?</h2>
        {restReminder && (
          <div className="rest-reminder">
            <span className="reminder-icon">⏰</span>
            <p>
              Recuerda que tu último entrenamiento fue de <strong>{lastWorkout.type}</strong> 
              y tu zona muscular <strong>{restReminder.muscleGroup}</strong> necesita 
              un descanso de <strong>{restReminder.restHours}h</strong>
            </p>
          </div>
        )}
      </div>
      
      <div className="workout-options">
        {workoutOptions.map((option) => (
          <button
            key={option.id}
            className="workout-option"
            onClick={() => onWorkoutSelect(option)}
          >
            <div className="option-icon">{option.icon}</div>
            <div className="option-content">
              <h3 className="option-name">{option.name}</h3>
              <p className="option-description">{option.description}</p>
              <div className="option-details">
                <span className="detail">⏱️ {option.duration}</span>
                <span className="detail">🔥 {option.intensity}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSelector; 