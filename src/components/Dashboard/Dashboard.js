import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import apiService from '../../services/api';
import WeeklyCalendar from './WeeklyCalendar';
import WorkoutSelector from './WorkoutSelector';
import './Dashboard.css';

const Dashboard = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState(null);
  const [lastWorkout, setLastWorkout] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [weightData, setWeightData] = useState([]);
  const [dailyTip, setDailyTip] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  
  // Sistema de Gamificación RPG
  const [playerStats, setPlayerStats] = useState({
    level: 15,
    currentXP: 1250,
    xpToNextLevel: 2000,
    strength: 75,
    endurance: 68,
    agility: 72,
    willpower: 80,
    social: 65,
    knowledge: 70
  });
  
  const [personaData, setPersonaData] = useState({
    arcana: 'Chariot',
    arcanaLevel: 7,
    socialLinks: [
      { name: 'Gimnasio', level: 8, maxLevel: 10 },
      { name: 'Nutrición', level: 6, maxLevel: 10 },
      { name: 'Meditación', level: 4, maxLevel: 10 },
      { name: 'Comunidad', level: 5, maxLevel: 10 }
    ],
    achievements: [
      { id: 1, name: 'Primer Entrenamiento', unlocked: true, icon: '🏋️' },
      { id: 2, name: 'Racha de 7 días', unlocked: true, icon: '🔥' },
      { id: 3, name: 'Meta de Peso Alcanzada', unlocked: false, icon: '🎯' },
      { id: 4, name: 'Maestro del Cardio', unlocked: true, icon: '❤️' },
      { id: 5, name: 'Disciplina de Hierro', unlocked: false, icon: '⚔️' }
    ]
  });

  // Sistema de Datos Contextuales Inteligentes
  const [contextualData, setContextualData] = useState({
    goalType: 'weight_loss', // weight_loss, muscle_gain, recomposition, maintenance
    currentPhase: 'cutting', // cutting, bulking, maintenance
    weeklyProgress: {
      weightChange: -0.8,
      bodyFatChange: -0.3,
      muscleGain: 0.2,
      strengthImprovement: 2.5
    },
    recommendations: [],
    nextMilestone: '',
    estimatedTimeToGoal: 12,
    macroTargets: {
      protein: 150,
      carbs: 180,
      fats: 65,
      calories: 2100
    },
    hydrationGoal: 2500,
    sleepGoal: 8,
    stressLevel: 'moderate'
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        await Promise.all([
          loadUserData(),
          loadLastWorkout(),
          loadStreakData(),
          loadWeightData(),
          generateDailyTip(),
          loadMotivationalQuote(),
          loadContextualData()
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [userID]);

  const loadUserData = async () => {
    try {
      // En desarrollo, usar datos mock
      const userData = apiService.getMockUserData(userID);
      setUserData(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
      // Fallback a datos mock en caso de error
      setUserData(apiService.getMockUserData(userID));
    }
  };

  const loadLastWorkout = async () => {
    try {
      // En desarrollo, usar datos mock
      const workout = apiService.getMockLastWorkout();
      setLastWorkout(workout);
    } catch (error) {
      console.error('Error loading last workout:', error);
      // Fallback a datos mock en caso de error
      setLastWorkout(apiService.getMockLastWorkout());
    }
  };

  const loadStreakData = async () => {
    // Simular datos de racha
    setStreakCount(5);
  };

  const loadWeightData = async () => {
    try {
      // En desarrollo, usar datos mock
      const weightData = apiService.getMockWeightData();
      setWeightData(weightData);
    } catch (error) {
      console.error('Error loading weight data:', error);
      // Fallback a datos mock en caso de error
      setWeightData(apiService.getMockWeightData());
    }
  };

  const loadContextualData = async () => {
    // Determinar tipo de objetivo basado en datos del usuario
    const goalType = determineGoalType();
    const contextualData = generateContextualData(goalType);
    setContextualData(contextualData);
  };

  const determineGoalType = () => {
    if (!userData) return 'weight_loss';
    
    const currentWeight = userData.currentWeight;
    const targetWeight = userData.targetWeight;
    const bmi = currentWeight / Math.pow(userData.height / 100, 2);
    
    if (currentWeight > targetWeight + 2) return 'weight_loss';
    if (currentWeight < targetWeight - 2) return 'muscle_gain';
    if (Math.abs(currentWeight - targetWeight) <= 2) return 'maintenance';
    return 'recomposition';
  };

  const generateContextualData = (goalType) => {
    const baseData = {
      goalType,
      currentPhase: goalType === 'weight_loss' ? 'cutting' : goalType === 'muscle_gain' ? 'bulking' : 'maintenance',
      weeklyProgress: {
        weightChange: goalType === 'weight_loss' ? -0.8 : goalType === 'muscle_gain' ? 0.3 : 0,
        bodyFatChange: goalType === 'weight_loss' ? -0.3 : goalType === 'muscle_gain' ? 0.1 : 0,
        muscleGain: goalType === 'muscle_gain' ? 0.4 : goalType === 'recomposition' ? 0.2 : 0.1,
        strengthImprovement: goalType === 'muscle_gain' ? 3.2 : 2.5
      },
      recommendations: [],
      nextMilestone: '',
      estimatedTimeToGoal: 12,
      macroTargets: {
        protein: 150,
        carbs: 180,
        fats: 65,
        calories: 2100
      },
      hydrationGoal: 2500,
      sleepGoal: 8,
      stressLevel: 'moderate'
    };

    // Personalizar según el objetivo
    switch (goalType) {
      case 'weight_loss':
        baseData.recommendations = [
          'Mantén un déficit calórico de 300-500 calorías',
          'Prioriza proteína para preservar músculo',
          'Incluye cardio 3-4 veces por semana',
          'Monitorea tu progreso semanal'
        ];
        baseData.nextMilestone = 'Perder 2kg más';
        baseData.macroTargets = {
          protein: 160,
          carbs: 150,
          fats: 55,
          calories: 1800
        };
        break;
      
      case 'muscle_gain':
        baseData.recommendations = [
          'Consume 1.6-2.2g de proteína por kg',
          'Entrena con pesos progresivos',
          'Descansa adecuadamente entre sesiones',
          'Mantén un pequeño superávit calórico'
        ];
        baseData.nextMilestone = 'Ganar 1kg de músculo';
        baseData.macroTargets = {
          protein: 180,
          carbs: 220,
          fats: 70,
          calories: 2400
        };
        break;
      
      case 'recomposition':
        baseData.recommendations = [
          'Mantén calorías de mantenimiento',
          'Enfócate en entrenamiento de fuerza',
          'Varía la intensidad del cardio',
          'Prioriza la calidad del sueño'
        ];
        baseData.nextMilestone = 'Reducir 1% de grasa corporal';
        baseData.macroTargets = {
          protein: 170,
          carbs: 200,
          fats: 65,
          calories: 2100
        };
        break;
      
      case 'maintenance':
        baseData.recommendations = [
          'Mantén tus hábitos actuales',
          'Varía tus entrenamientos',
          'Monitorea tu peso semanalmente',
          'Ajusta según sea necesario'
        ];
        baseData.nextMilestone = 'Mantener peso estable por 4 semanas';
        baseData.macroTargets = {
          protein: 150,
          carbs: 180,
          fats: 65,
          calories: 2100
        };
        break;
    }

    return baseData;
  };

  const generateDailyTip = async () => {
    try {
      // En desarrollo, usar datos mock
      const tips = apiService.getMockDailyTips();
      setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
    } catch (error) {
      console.error('Error loading daily tip:', error);
      // Fallback a datos mock en caso de error
      const tips = apiService.getMockDailyTips();
      setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
    }
  };

  const loadMotivationalQuote = async () => {
    const quotes = [
      "Cada entrenamiento te acerca un paso más a tu mejor versión 💪",
      "La disciplina es el puente entre metas y logros 🎯",
      "Tu cuerpo puede hacerlo. Es tu mente la que necesitas convencer 🧠",
      "El progreso no es siempre lineal, pero cada día cuenta 📈",
      "La consistencia es la clave del éxito en el fitness 🔑",
      "Cada gota de sudor es una inversión en tu futuro yo 💦",
      "No te rindas. Cada repetición te hace más fuerte 💪",
      "El único entrenamiento malo es el que no haces 🏋️‍♀️"
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const startWorkout = async (workoutType) => {
    try {
      await apiService.startWorkout(userID, workoutType);
      console.log(`Entrenamiento de ${workoutType} iniciado`);
      // Aquí se navegaría a la página de entrenamiento
    } catch (error) {
      console.error('Error starting workout:', error);
    }
  };

  const recordWeight = async () => {
    try {
      // Aquí se abriría un modal para ingresar el peso
      const weight = prompt('Ingresa tu peso actual (kg):');
      if (weight) {
        await apiService.recordWeight(userID, parseFloat(weight));
        console.log('Peso registrado');
        // Recargar datos de peso
        loadWeightData();
      }
    } catch (error) {
      console.error('Error recording weight:', error);
    }
  };

  const recordCalories = async () => {
    try {
      // Aquí se abriría un modal para ingresar las calorías
      const calories = prompt('Ingresa las calorías consumidas hoy:');
      if (calories) {
        await apiService.recordCalories(userID, parseInt(calories));
        console.log('Calorías registradas');
      }
    } catch (error) {
      console.error('Error recording calories:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando tu dashboard...</p>
      </div>
    );
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleWorkoutSelect = (workoutType) => {
    startWorkout(workoutType.id);
  };

  const getProgressPercentage = () => {
    if (!userData?.currentWeight || !userData?.targetWeight) return 0;
    const total = Math.abs(65 - userData.targetWeight);
    const current = Math.abs(userData.currentWeight - userData.targetWeight);
    return Math.round(((total - current) / total) * 100);
  };

  const getXPPercentage = () => {
    return Math.round((playerStats.currentXP / playerStats.xpToNextLevel) * 100);
  };

  const getStatColor = (value) => {
    if (value >= 80) return '#4CAF50';
    if (value >= 60) return '#FF9800';
    return '#F44336';
  };

  const getArcanaColor = (arcana) => {
    const arcanaColors = {
      'Chariot': '#FF6B6B',
      'Strength': '#4CAF50',
      'Temperance': '#2196F3',
      'Justice': '#FFC107',
      'Hermit': '#9C27B0',
      'Fortune': '#FF9800',
      'Star': '#00BCD4',
      'Moon': '#673AB7',
      'Sun': '#FFEB3B',
      'Judgement': '#795548'
    };
    return arcanaColors[arcana] || '#666';
  };

  const getGoalIcon = () => {
    switch (contextualData.goalType) {
      case 'weight_loss': return '📉';
      case 'muscle_gain': return '💪';
      case 'recomposition': return '⚖️';
      case 'maintenance': return '🔄';
      default: return '🎯';
    }
  };

  const getGoalLabel = () => {
    switch (contextualData.goalType) {
      case 'weight_loss': return 'Pérdida de Peso';
      case 'muscle_gain': return 'Ganancia Muscular';
      case 'recomposition': return 'Recomposición';
      case 'maintenance': return 'Mantenimiento';
      default: return 'Objetivo';
    }
  };

  const getPhaseLabel = () => {
    switch (contextualData.currentPhase) {
      case 'cutting': return 'Fase de Definición';
      case 'bulking': return 'Fase de Volumen';
      case 'maintenance': return 'Fase de Mantenimiento';
      default: return 'Fase Actual';
    }
  };

  return (
    <MainLayout>
      <div className="dashboard">
        {/* Header con información del usuario y Persona */}
        <header className="dashboard-header">
          <div className="user-info">
            <h1>¡Hola, {userData?.name}!</h1>
            <div className="goal-info">
              <span className="goal-icon">{getGoalIcon()}</span>
              <span className="goal-label">{getGoalLabel()}</span>
              <span className="phase-label">{getPhaseLabel()}</span>
            </div>
            <div className="persona-info">
              <span className="arcana-badge" style={{ backgroundColor: getArcanaColor(personaData.arcana) }}>
                {personaData.arcana} Lv.{personaData.arcanaLevel}
              </span>
            </div>
            {motivationalQuote && (
              <p className="motivational-quote">{motivationalQuote}</p>
            )}
          </div>
          <div className="player-stats-overview">
            <div className="level-display">
              <div className="level-circle">
                <span className="level-number">{playerStats.level}</span>
                <span className="level-label">NIVEL</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${getXPPercentage()}%` }}></div>
                <span className="xp-text">{playerStats.currentXP}/{playerStats.xpToNextLevel} XP</span>
              </div>
            </div>
            <div className="streak-counter">
              <div className="streak-badge">
                <span className="streak-number">{streakCount}</span>
                <span className="streak-label">días seguidos</span>
              </div>
            </div>
          </div>
        </header>

        {/* Datos Contextuales Inteligentes */}
        <section className="contextual-data-section">
          <h2>📊 Tu Progreso Semanal</h2>
          <div className="contextual-grid">
            <div className="progress-card">
              <div className="progress-header">
                <span className="progress-icon">⚖️</span>
                <span className="progress-label">Peso</span>
              </div>
              <div className="progress-value">
                <span className={`value ${contextualData.weeklyProgress.weightChange >= 0 ? 'positive' : 'negative'}`}>
                  {contextualData.weeklyProgress.weightChange > 0 ? '+' : ''}{contextualData.weeklyProgress.weightChange}kg
                </span>
                <span className="period">esta semana</span>
              </div>
            </div>
            
            <div className="progress-card">
              <div className="progress-header">
                <span className="progress-icon">💪</span>
                <span className="progress-label">Músculo</span>
              </div>
              <div className="progress-value">
                <span className="value positive">
                  +{contextualData.weeklyProgress.muscleGain}kg
                </span>
                <span className="period">esta semana</span>
              </div>
            </div>
            
            <div className="progress-card">
              <div className="progress-header">
                <span className="progress-icon">📈</span>
                <span className="progress-label">Fuerza</span>
              </div>
              <div className="progress-value">
                <span className="value positive">
                  +{contextualData.weeklyProgress.strengthImprovement}%
                </span>
                <span className="period">esta semana</span>
              </div>
            </div>
            
            <div className="progress-card">
              <div className="progress-header">
                <span className="progress-icon">🎯</span>
                <span className="progress-label">Próximo Hito</span>
              </div>
              <div className="progress-value">
                <span className="milestone-text">{contextualData.nextMilestone}</span>
                <span className="period">~{contextualData.estimatedTimeToGoal} semanas</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recomendaciones Contextuales */}
        <section className="recommendations-section">
          <h2>💡 Recomendaciones para tu Objetivo</h2>
          <div className="recommendations-grid">
            {contextualData.recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-icon">💡</div>
                <p className="recommendation-text">{recommendation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Macros y Nutrición Contextual */}
        <section className="nutrition-section">
          <h2>🍎 Tu Plan Nutricional</h2>
          <div className="nutrition-grid">
            <div className="macro-card">
              <div className="macro-header">
                <span className="macro-icon">🔥</span>
                <span className="macro-label">Calorías</span>
              </div>
              <div className="macro-value">{contextualData.macroTargets.calories}</div>
              <div className="macro-unit">kcal/día</div>
            </div>
            
            <div className="macro-card">
              <div className="macro-header">
                <span className="macro-icon">🥩</span>
                <span className="macro-label">Proteína</span>
              </div>
              <div className="macro-value">{contextualData.macroTargets.protein}g</div>
              <div className="macro-unit">por día</div>
            </div>
            
            <div className="macro-card">
              <div className="macro-header">
                <span className="macro-icon">🍞</span>
                <span className="macro-label">Carbohidratos</span>
              </div>
              <div className="macro-value">{contextualData.macroTargets.carbs}g</div>
              <div className="macro-unit">por día</div>
            </div>
            
            <div className="macro-card">
              <div className="macro-header">
                <span className="macro-icon">🥑</span>
                <span className="macro-label">Grasas</span>
              </div>
              <div className="macro-value">{contextualData.macroTargets.fats}g</div>
              <div className="macro-unit">por día</div>
            </div>
          </div>
        </section>

        {/* Sistema de Stats RPG */}
        <section className="rpg-stats-section">
          <h2>⚔️ Tus Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">💪</span>
                <span className="stat-name">Fuerza</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.strength}%`,
                    backgroundColor: getStatColor(playerStats.strength)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.strength}/100</span>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">🛡️</span>
                <span className="stat-name">Resistencia</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.endurance}%`,
                    backgroundColor: getStatColor(playerStats.endurance)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.endurance}/100</span>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">⚡</span>
                <span className="stat-name">Agilidad</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.agility}%`,
                    backgroundColor: getStatColor(playerStats.agility)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.agility}/100</span>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">🧠</span>
                <span className="stat-name">Voluntad</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.willpower}%`,
                    backgroundColor: getStatColor(playerStats.willpower)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.willpower}/100</span>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">👥</span>
                <span className="stat-name">Social</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.social}%`,
                    backgroundColor: getStatColor(playerStats.social)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.social}/100</span>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">📚</span>
                <span className="stat-name">Conocimiento</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${playerStats.knowledge}%`,
                    backgroundColor: getStatColor(playerStats.knowledge)
                  }}
                ></div>
              </div>
              <span className="stat-value">{playerStats.knowledge}/100</span>
            </div>
          </div>
        </section>

        {/* Social Links (Persona) */}
        <section className="social-links-section">
          <h2>🔗 Social Links</h2>
          <div className="social-links-grid">
            {personaData.socialLinks.map((link, index) => (
              <div key={index} className="social-link-card">
                <div className="link-header">
                  <span className="link-name">{link.name}</span>
                  <span className="link-level">Lv.{link.level}/{link.maxLevel}</span>
                </div>
                <div className="link-progress">
                  <div 
                    className="link-fill" 
                    style={{ width: `${(link.level / link.maxLevel) * 100}%` }}
                  ></div>
                </div>
                <div className="link-rewards">
                  {link.level >= 3 && <span className="reward">💪 +5 Fuerza</span>}
                  {link.level >= 5 && <span className="reward">🛡️ +5 Resistencia</span>}
                  {link.level >= 7 && <span className="reward">⚡ +5 Agilidad</span>}
                  {link.level >= 10 && <span className="reward">🌟 Habilidad Especial</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calendario Semanal */}
        <WeeklyCalendar 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* Selector de Entrenamiento */}
        <WorkoutSelector 
          lastWorkout={lastWorkout}
          onWorkoutSelect={handleWorkoutSelect}
        />

        {/* Accesos rápidos y Registro */}
        <section className="quick-actions">
          <h2>📊 Registro Diario</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={recordWeight}>
              <span className="action-icon">⚖️</span>
              <span>Registrar Peso</span>
              <span className="xp-reward">+10 XP</span>
            </button>
            <button className="action-btn" onClick={recordCalories}>
              <span className="action-icon">🍎</span>
              <span>Registrar Calorías</span>
              <span className="xp-reward">+5 XP</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">💧</span>
              <span>Registrar Agua</span>
              <span className="xp-reward">+3 XP</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📏</span>
              <span>Medidas Corporales</span>
              <span className="xp-reward">+8 XP</span>
            </button>
          </div>
        </section>

        {/* Logros */}
        <section className="achievements-section">
          <h2>🏆 Logros</h2>
          <div className="achievements-grid">
            {personaData.achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <span className="achievement-name">{achievement.name}</span>
                  {achievement.unlocked && (
                    <span className="achievement-xp">+50 XP</span>
                  )}
                </div>
                {!achievement.unlocked && (
                  <div className="achievement-lock">🔒</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Resumen de progreso */}
        <section className="progress-summary">
          <h2>📈 Tu Progreso</h2>
          <div className="progress-grid">
            <div className="weight-chart">
              <h3>Evolución del Peso (Última Semana)</h3>
              <div className="chart-container">
                {weightData.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${((data.weight - 64) / 2) * 100}%`,
                        backgroundColor: index === weightData.length - 1 ? '#4CAF50' : '#2196F3'
                      }}
                    ></div>
                    <span className="bar-label">{data.weight}kg</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="progress-stats">
              <div className="stat-card">
                <h4>Peso Actual</h4>
                <span className="stat-value">{userData?.currentWeight}kg</span>
              </div>
              <div className="stat-card">
                <h4>Meta</h4>
                <span className="stat-value">{userData?.targetWeight}kg</span>
              </div>
              <div className="stat-card">
                <h4>Progreso</h4>
                <span className="stat-value">
                  {getProgressPercentage()}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tip del día */}
        <section className="daily-tip">
          <h2>💡 Tip del Día</h2>
          <div className="tip-card">
            <p>{dailyTip}</p>
          </div>
        </section>

        {/* Personaje Pixel Art Mejorado */}
        <section className="character-section">
          <h2>🎮 Tu Personaje</h2>
          <div className="character-container">
            <div className="character-avatar">
              <div className="pixel-art-character">
                <div className="character-level">{playerStats.level}</div>
                <div className="character-arcana" style={{ backgroundColor: getArcanaColor(personaData.arcana) }}>
                  {personaData.arcana}
                </div>
              </div>
            </div>
            <div className="character-info">
              <h3>Persona: {personaData.arcana}</h3>
              <p>Tu espíritu interior se fortalece con cada entrenamiento. Desbloquea nuevas habilidades y evoluciona tu Persona.</p>
              <div className="character-stats">
                <div className="character-stat">
                  <span className="stat-label">Nivel</span>
                  <span className="stat-value">{playerStats.level}</span>
                </div>
                <div className="character-stat">
                  <span className="stat-label">XP</span>
                  <span className="stat-value">{playerStats.currentXP}</span>
                </div>
                <div className="character-stat">
                  <span className="stat-label">Logros</span>
                  <span className="stat-value">{personaData.achievements.filter(a => a.unlocked).length}</span>
                </div>
                <div className="character-stat">
                  <span className="stat-label">Social Links</span>
                  <span className="stat-value">{personaData.socialLinks.reduce((sum, link) => sum + link.level, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard; 