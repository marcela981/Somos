import React, { useState, useMemo } from 'react';
import apiService from '../../services/api';
import { SECONDARY_GOALS } from '../../config/api.config';
import GoalSelector from './GoalSelector';
import SportForm from './SportForm';
import SexualPerformanceForm from './SexualPerformanceForm';
import { GOAL_SUGGESTIONS, GOAL_CONFLICTS, GOAL_IDS, hasConflict, getGoalById } from '../../data/goals.config';
import './OnboardingForm.css';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Perfil
    profileName: '',
    
    // Metas (nuevo sistema)
    goals: {
      primary: '',   // GoalId
      secondary: '', // GoalId | ''
      tertiary: ''   // GoalId | ''
    },
    
    // Mantener compatibilidad con registros previos
    mainGoal: '', // Se mantiene para compatibilidad
    additionalGoals: [], // Se mantiene para compatibilidad
    
         // Datos antropométricos
     gender: '',
     age: '',
     initialWeight: '',
     height: '',
     neck: '',
     chest: '',
     waist: '',
     hips: '',
     bicepsRelaxed: '',
     bicepsFlexed: '',
     thighs: '',
    
    // Nivel de experiencia
    experienceLevel: '',
    
    // Equipamiento disponible
    equipment: {
      bodyweight: false,
      resistanceBands: false,
      dumbbells: false,
      pullUpBar: false,
      fullGym: false
    },
    dumbbellRange: '',
    
         // Preferencias y limitaciones
     exercisePreferences: [],
     injuries: '',
     
     // Deporte favorito
     favoriteSport: '',
     
     //  :::::::::::::::::::::::::::: Implementación menstruación :::::::::::::::::::::::::::: 
     // Información del período (solo para mujeres)
     // hasPeriod: false,
     // periodInfo: {
     //   cycleLength: '',
     //   periodLength: '',
     //   symptoms: []
     // },
     // :::::::::::::::::::::::::::: Fin de implementación ::::::::::::::::::::::::::::
     
     // Motivación
     motivation: '',
     
     // Rehabilitación
     rehab: {
       bodyPart: '',
       specificInjury: '',
       severity: '',
       timeSince: {
         value: '',
         unit: 'días'
       },
       side: '',
       dominantSide: '',
       painNRS: 0,
       swelling: false,
       romLimitation: '',
       instability: '',
       functionalLimits: [],
       medicalIndications: '',
       details: '',
       redFlags: [],
       hasMedicalClearance: false,
       notice: ''
     },
     
     // Deporte específico
     sport: {
       sportId: '',
       sportOther: '',
       discipline: '',
       level: '',
       roleOrCategory: '',
       peakTargetDate: '',
       sessionsPerWeek: 3,
       availableEquipment: [],
       preferredDays: [],
       previousInjuries: '',
       constraints: '',
       metricsFocus: [],
       notes: ''
     },
     
     // Rendimiento sexual
     sexual: {
       focusAreas: [],
       sessionsPerWeek: 2,
       notes: '',
       privacyOk: false,
       redFlags: []
     }
  });

  // Calcular sugerencias dinámicas para Meta 2 y Meta 3
  const suggestionForMeta2 = useMemo(() => {
    if (formData.goals.primary && GOAL_SUGGESTIONS[formData.goals.primary]) {
      return GOAL_SUGGESTIONS[formData.goals.primary][0];
    }
    return undefined;
  }, [formData.goals.primary]);

  const suggestionForMeta3 = useMemo(() => {
    if (formData.goals.secondary && GOAL_SUGGESTIONS[formData.goals.secondary]) {
      return GOAL_SUGGESTIONS[formData.goals.secondary][0];
    }
    if (formData.goals.primary && GOAL_SUGGESTIONS[formData.goals.primary]) {
      return GOAL_SUGGESTIONS[formData.goals.primary][1];
    }
    return undefined;
  }, [formData.goals.primary, formData.goals.secondary]);

  // Verificar si hay conflicto entre metas
  const hasGoalConflict = useMemo(() => {
    const { primary, secondary, tertiary } = formData.goals;
    return hasConflict(primary, secondary) || 
           hasConflict(primary, tertiary) || 
           hasConflict(secondary, tertiary);
  }, [formData.goals]);

  // Verificar si alguna meta es rehabilitación
  const hasRehabGoal = useMemo(() => {
    return formData.goals.primary === GOAL_IDS.REHAB ||
           formData.goals.secondary === GOAL_IDS.REHAB ||
           formData.goals.tertiary === GOAL_IDS.REHAB;
  }, [formData.goals]);

  // Conflictos suaves (avisos no bloqueantes)
  const softConflicts = useMemo(() => {
    const conflicts = [];
    const { primary, secondary, tertiary } = formData.goals;
    const allGoals = [primary, secondary, tertiary].filter(Boolean);

    // fat_loss vs muscle_gain
    if ((allGoals.includes('fat_loss') && allGoals.includes('muscle_gain')) ||
        (allGoals.includes('muscle_gain') && allGoals.includes('fat_loss'))) {
      conflicts.push('Estas metas pueden competir entre sí. Te recomendaremos micro-ciclos y métricas realistas.');
    }

    // rehab severa/moderada con sport_specific
    if (allGoals.includes('sport_specific') && hasRehabGoal) {
      const severity = formData.rehab?.severity;
      if (severity === 'severa' || severity === 'moderada') {
        conflicts.push('Si estás en fase de lesión moderada/severa, prioriza rehabilitación antes del trabajo específico de alto impacto.');
      }
    }

    return conflicts;
  }, [formData.goals, formData.rehab, hasRehabGoal]);

  // Verificar si alguna meta es deporte específico
  const hasSportGoal = useMemo(() => {
    return formData.goals.primary === GOAL_IDS.SPORT_SPECIFIC ||
           formData.goals.secondary === GOAL_IDS.SPORT_SPECIFIC ||
           formData.goals.tertiary === GOAL_IDS.SPORT_SPECIFIC;
  }, [formData.goals]);

  // Verificar si alguna meta es rendimiento sexual
  const hasSexualGoal = useMemo(() => {
    return formData.goals.primary === GOAL_IDS.SEXUAL_PERFORMANCE ||
           formData.goals.secondary === GOAL_IDS.SEXUAL_PERFORMANCE ||
           formData.goals.tertiary === GOAL_IDS.SEXUAL_PERFORMANCE;
  }, [formData.goals]);

  const experienceLevels = [
    'Principiante (nunca o casi nunca he entrenado)',
    'Intermedio (he entrenado antes, conozco los ejercicios básicos)',
    'Avanzado (entreno de forma consistente)'
  ];

     const exerciseTypes = [
     'Pesas',
     'Máquina',
     'Cardio',
     'HIIT',
     'Yoga',
     'Calistenia'
   ];

   const genderOptions = [
     'Femenino',
     'Masculino',
     'No binario',
     'Prefiero no decir'
   ];

   const sportOptions = [
     'Artes marciales',
     'Fútbol',
     'Baloncesto',
     'Tenis',
     'Natación',
     'Atletismo',
     'Ciclismo',
     'Boxeo',
     'Kickboxing',
     'Yoga',
     'Pilates',
     'CrossFit',
     'Running',
     'Volleyball',
     'Béisbol',
     'Hockey',
     'Rugby',
     'Golf',
     'Esquí',
     'Surf',
     'Escalada',
     'Danza',
     'Gimnasia',
     'Otro'
   ];

   // Opciones para rehab
   const bodyPartOptions = [
     { value: 'tobillo', label: 'Tobillo' },
     { value: 'rodilla', label: 'Rodilla' },
     { value: 'muñeca', label: 'Muñeca' },
     { value: 'hombro', label: 'Hombro' },
     { value: 'otro', label: 'Otro' }
   ];

   const severityOptions = ['leve', 'moderada', 'severa'];
   const timeUnitOptions = ['días', 'semanas', 'meses'];
   const sideOptions = ['izquierda', 'derecha', 'ambas'];
   const dominantSideOptions = ['izquierda', 'derecha'];
   const romLimitationOptions = ['ninguna', 'leve', 'moderada', 'severa'];
   const instabilityOptions = ['no', 'leve', 'moderada', 'severa'];
   const functionalLimitsOptions = [
     'Caminar >15min',
     'Correr',
     'Saltar',
     'Subir/bajar escaleras',
     'Empujar/empujes',
     'Tracciones',
     'Cargar >5kg'
   ];
   const redFlagsOptions = [
     'Dolor nocturno intenso o progresivo',
     'Pérdida de fuerza/sensibilidad',
     'Bloqueo articular',
     'Fiebre o signos de infección',
     'Deformidad evidente',
     'Trauma de alta energía'
   ];

   //  :::::::::::::::::::::::::::: Implementación menstruación :::::::::::::::::::::::::::: 
   // const periodSymptoms = [
   //   'Cólicos menstruales',
   //   'Fatiga',
   //   'Cambios de humor',
   //   'Hinchazón',
   //   'Dolor de espalda',
   //   'Dolor de cabeza',
   //   'Náuseas',
   //   'Sensibilidad en los senos',
   //   'Acné',
   //   'Antojos de comida',
   //   'Insomnio',
   //   'Ninguno'
   // ];
   // :::::::::::::::::::::::::::: Fin de implementación ::::::::::::::::::::::::::::

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoalChange = (goalType, goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [goalType]: goalId
      }
    }));
  };

  const handleEquipmentChange = (equipment, checked) => {
    setFormData(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [equipment]: checked
      }
    }));
  };

  const handlePreferenceChange = (preference, checked) => {
    setFormData(prev => ({
      ...prev,
      exercisePreferences: checked 
        ? [...prev.exercisePreferences, preference]
        : prev.exercisePreferences.filter(p => p !== preference)
    }));
  };

  // Handlers para rehab
  const handleRehabChange = (field, value) => {
    // Caso especial para bodyPart "otro"
    if (field === 'bodyPart' && value === 'otro') {
      setFormData(prev => ({
        ...prev,
        rehab: {
          ...prev.rehab,
          bodyPart: '',
          notice: 'No disponible en este momento.'
        }
      }));
      return;
    }
    
    // Si cambia bodyPart a un valor válido, limpiar notice
    if (field === 'bodyPart' && value !== 'otro') {
      setFormData(prev => ({
        ...prev,
        rehab: {
          ...prev.rehab,
          [field]: value,
          notice: ''
        }
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      rehab: {
        ...prev.rehab,
        [field]: value
      }
    }));
  };

  const handleRehabNestedChange = (path, value) => {
    setFormData(prev => ({
      ...prev,
      rehab: {
        ...prev.rehab,
        [path]: {
          ...prev.rehab[path],
          ...value
        }
      }
    }));
  };

  const handleFunctionalLimitsChange = (opt, checked) => {
    setFormData(prev => ({
      ...prev,
      rehab: {
        ...prev.rehab,
        functionalLimits: checked 
          ? [...prev.rehab.functionalLimits, opt]
          : prev.rehab.functionalLimits.filter(f => f !== opt)
      }
    }));
  };

  const handleRedFlagsChange = (opt, checked) => {
    setFormData(prev => ({
      ...prev,
      rehab: {
        ...prev.rehab,
        redFlags: checked 
          ? [...prev.rehab.redFlags, opt]
          : prev.rehab.redFlags.filter(r => r !== opt)
      }
    }));
  };

  // Handlers para sport
  const handleSportChange = (sportData) => {
    setFormData(prev => ({
      ...prev,
      sport: sportData
    }));
  };

  // Handlers para sexual performance
  const handleSexualChange = (sexualData) => {
    setFormData(prev => ({
      ...prev,
      sexual: sexualData
    }));
  };

  const addAdditionalGoal = () => {
    setFormData(prev => ({
      ...prev,
      additionalGoals: [...prev.additionalGoals, { goal: '', sport: '' }]
    }));
  };

  const removeAdditionalGoal = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalGoals: prev.additionalGoals.filter((_, i) => i !== index)
    }));
  };

     const updateAdditionalGoal = (index, field, value) => {
     setFormData(prev => ({
       ...prev,
       additionalGoals: prev.additionalGoals.map((goal, i) => 
         i === index ? { ...goal, [field]: value } : goal
       )
     }));
   };

   //  :::::::::::::::::::::::::::: Implementación menstruación :::::::::::::::::::::::::::: 
   // const handlePeriodSymptomChange = (symptom, checked) => {
   //   setFormData(prev => ({
   //     ...prev,
   //     periodInfo: {
   //       ...prev.periodInfo,
   //       symptoms: checked 
   //         ? [...prev.periodInfo.symptoms, symptom]
   //         : prev.periodInfo.symptoms.filter(s => s !== symptom)
   //     }
   //   }));
   // };

   // const updatePeriodInfo = (field, value) => {
   //   setFormData(prev => ({
   //     ...prev,
   //     periodInfo: {
   //       ...prev.periodInfo,
   //       [field]: value
   //     }
   //   }));
   // };
   // :::::::::::::::::::::::::::: Fin de implementación ::::::::::::::::::::::::::::

           const nextStep = () => {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validación para rehab
  const isRehabValid = () => {
    if (!hasRehabGoal) {
      return true; // No requiere validación si no hay meta de rehabilitación
    }

    const validBodyParts = ['tobillo', 'rodilla', 'muñeca', 'hombro'];
    const hasValidBodyPart = validBodyParts.includes(formData.rehab.bodyPart);
    const hasSeverity = formData.rehab.severity !== '';
    const hasTimeSince = formData.rehab.timeSince.value !== '' && parseInt(formData.rehab.timeSince.value) > 0;
    const hasMedicalClearance = formData.rehab.hasMedicalClearance === true;
    const hasNoRedFlags = formData.rehab.redFlags.length === 0;

    return hasValidBodyPart && hasSeverity && hasTimeSince && hasMedicalClearance && hasNoRedFlags;
  };

  // Validación para sport
  const isSportValid = () => {
    if (!hasSportGoal) {
      return true; // No requiere validación si no hay meta de deporte
    }

    // sportId es requerido
    if (!formData.sport.sportId || formData.sport.sportId.trim() === '') {
      return false;
    }

    // Si es "other", sportOther es requerido (min 3 caracteres)
    if (formData.sport.sportId === 'other') {
      return formData.sport.sportOther && formData.sport.sportOther.trim().length >= 3;
    }

    // Validar sessionsPerWeek si se proporciona (1-14)
    if (formData.sport.sessionsPerWeek !== undefined && formData.sport.sessionsPerWeek !== null) {
      const sessions = parseInt(formData.sport.sessionsPerWeek);
      if (isNaN(sessions) || sessions < 1 || sessions > 14) {
        return false;
      }
    }

    return true;
  };

  // Validación para sexual performance
  const isSexualValid = () => {
    if (!hasSexualGoal) {
      return true; // No requiere validación si no hay meta de rendimiento sexual
    }

    // focusAreas debe tener al menos 1 elemento
    const hasFocusAreas = formData.sexual.focusAreas && formData.sexual.focusAreas.length > 0;
    if (!hasFocusAreas) {
      return false;
    }

    // privacyOk es requerido
    if (formData.sexual.privacyOk !== true) {
      return false;
    }

    // Validar sessionsPerWeek si se proporciona (1-10)
    if (formData.sexual.sessionsPerWeek !== undefined && formData.sexual.sessionsPerWeek !== null) {
      const sessions = parseInt(formData.sexual.sessionsPerWeek);
      if (isNaN(sessions) || sessions < 1 || sessions > 10) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Validar red flags antes de enviar
      if (hasRehabGoal && formData.rehab.redFlags.length > 0) {
        setSubmitMessage('No se puede continuar con signos de alarma detectados. Por favor, consulta con un profesional de salud.');
        setIsSubmitting(false);
        return;
      }

      // Red flags en sexual performance son advertencias no bloqueantes (solo warning)
      // No bloqueamos el envío, pero generamos un warning

      // Preparar datos para enviar
      const profileId = formData.profileId || `profile_${Date.now()}`;
      const onboardingData = {
        profileId,
        goals: {
          primary: formData.goals.primary,
          secondary: formData.goals.secondary || null,
          tertiary: formData.goals.tertiary || null
        },
        rehab: hasRehabGoal ? formData.rehab : null,
        sport: hasSportGoal ? formData.sport : null,
        sexual: hasSexualGoal ? formData.sexual : null,
        // Mantener compatibilidad: mapear goals a mainGoal y additionalGoals
        mainGoal: formData.goals.primary || formData.mainGoal,
        additionalGoals: [
          formData.goals.secondary,
          formData.goals.tertiary
        ].filter(Boolean).map(goalId => ({ goal: goalId })),
        // Incluir otros campos del formulario
        profileName: formData.profileName,
        gender: formData.gender,
        age: formData.age,
        initialWeight: formData.initialWeight,
        height: formData.height,
        experienceLevel: formData.experienceLevel,
        equipment: formData.equipment,
        exercisePreferences: formData.exercisePreferences,
        injuries: formData.injuries,
        favoriteSport: formData.favoriteSport,
        motivation: formData.motivation,
        createdAt: new Date().toISOString()
      };

      // Enviar datos al backend
      const response = await apiService.saveOnboardingData(onboardingData);
      
      if (response.success) {
        setSubmitMessage('¡Perfil creado exitosamente! Redirigiendo al dashboard...');
        // TODO: Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          // Aquí implementaremos la navegación al dashboard
          console.log('Redirigiendo al dashboard...');
        }, 2000);
      } else {
        setSubmitMessage('Error al crear el perfil. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al guardar datos:', error);
      setSubmitMessage('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-container">
            <h2>¡Holi! ¿Estas lista para inciar este cambio?</h2>
            <p>Vamos a crear tu perfil personalizado para que la IA pueda ayudarte a alcanzar tus objetivos de fitness.</p>
            
            <div className="form-group">
              <label>Tu nombre:</label>
              <input
                type="text"
                value={formData.profileName}
                onChange={(e) => handleInputChange('profileName', e.target.value)}
                placeholder="Ej: Alejandra"
                required
              />
            </div>


          </div>
        );

      case 1:
        return (
          <div className="step-container">
            <h2>Selecciona tus metas</h2>
            <p>Elige hasta 3 metas. La Meta 1 es obligatoria, las otras dos son opcionales pero recomendadas.</p>
            
            {/* Meta 1 (Principal) */}
            <GoalSelector
              label="Meta 1 (principal)"
              value={formData.goals.primary}
              onChange={(goalId) => handleGoalChange('primary', goalId)}
              disabledGoalIds={[]}
            />

            {/* Meta 2 (Opcional) */}
            <GoalSelector
              label="Meta 2 (opcional)"
              value={formData.goals.secondary}
              onChange={(goalId) => handleGoalChange('secondary', goalId)}
              disabledGoalIds={[formData.goals.primary].filter(Boolean)}
              highlightId={suggestionForMeta2}
            />

            {/* Meta 3 (Opcional) */}
            <GoalSelector
              label="Meta 3 (opcional)"
              value={formData.goals.tertiary}
              onChange={(goalId) => handleGoalChange('tertiary', goalId)}
              disabledGoalIds={[formData.goals.primary, formData.goals.secondary].filter(Boolean)}
              highlightId={suggestionForMeta3}
            />

            {/* Aviso de conflictos */}
            {hasGoalConflict && (
              <div className="goal-warning">
                ⚠️ Estas metas pueden competir entre sí. Te recomendaremos micro-ciclos y métricas realistas.
              </div>
            )}

            {/* Conflictos suaves (avisos no bloqueantes) */}
            {softConflicts.length > 0 && softConflicts.map((conflict, index) => (
              <div key={index} className="goal-warning">
                ⚠️ {conflict}
              </div>
            ))}

            {/* Subformulario de Rehabilitación */}
            {hasRehabGoal && (
              <div className="rehab-form-container">
                <h3>Información de la Lesión</h3>
                
                <div className="form-group">
                  <label>Parte afectada:</label>
                  <select
                    value={formData.rehab.bodyPart}
                    onChange={(e) => handleRehabChange('bodyPart', e.target.value)}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    {bodyPartOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {formData.rehab.notice && (
                    <small className="notice-warning">{formData.rehab.notice}</small>
                  )}
                </div>

                {formData.rehab.bodyPart && formData.rehab.bodyPart !== '' && (
                  <>
                    <div className="form-group">
                      <label>Severidad:</label>
                      <select
                        value={formData.rehab.severity}
                        onChange={(e) => handleRehabChange('severity', e.target.value)}
                        required
                      >
                        <option value="">Selecciona una opción</option>
                        {severityOptions.map(option => (
                          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tiempo desde la lesión:</label>
                      <div className="field-inline">
                        <input
                          type="number"
                          min="1"
                          value={formData.rehab.timeSince.value}
                          onChange={(e) => handleRehabNestedChange('timeSince', { value: e.target.value, unit: formData.rehab.timeSince.unit })}
                          placeholder="0"
                          required
                          style={{ flex: 1 }}
                        />
                        <select
                          value={formData.rehab.timeSince.unit}
                          onChange={(e) => handleRehabNestedChange('timeSince', { value: formData.rehab.timeSince.value, unit: e.target.value })}
                          style={{ flex: 1 }}
                        >
                          {timeUnitOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="rehab-grid">
                      <div className="form-group">
                        <label>Lado afectado:</label>
                        <select
                          value={formData.rehab.side}
                          onChange={(e) => handleRehabChange('side', e.target.value)}
                          required
                        >
                          <option value="">Selecciona una opción</option>
                          {sideOptions.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Lado dominante (opcional):</label>
                        <select
                          value={formData.rehab.dominantSide}
                          onChange={(e) => handleRehabChange('dominantSide', e.target.value)}
                        >
                          <option value="">Selecciona una opción</option>
                          {dominantSideOptions.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Dolor (NRS 0-10): {formData.rehab.painNRS}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={formData.rehab.painNRS}
                        onChange={(e) => handleRehabChange('painNRS', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.rehab.swelling}
                          onChange={(e) => handleRehabChange('swelling', e.target.checked)}
                        />
                        <span>¿Hay edema (hinchazón)?</span>
                      </label>
                    </div>

                    <div className="rehab-grid">
                      <div className="form-group">
                        <label>Limitación de Rango de Movimiento:</label>
                        <select
                          value={formData.rehab.romLimitation}
                          onChange={(e) => handleRehabChange('romLimitation', e.target.value)}
                          required
                        >
                          <option value="">Selecciona una opción</option>
                          {romLimitationOptions.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Inestabilidad:</label>
                        <select
                          value={formData.rehab.instability}
                          onChange={(e) => handleRehabChange('instability', e.target.value)}
                          required
                        >
                          <option value="">Selecciona una opción</option>
                          {instabilityOptions.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Limitaciones funcionales:</label>
                      <div className="preferences-grid">
                        {functionalLimitsOptions.map(option => (
                          <label key={option} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={formData.rehab.functionalLimits.includes(option)}
                              onChange={(e) => handleFunctionalLimitsChange(option, e.target.checked)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Indicaciones médicas recibidas:</label>
                      <textarea
                        value={formData.rehab.medicalIndications}
                        onChange={(e) => handleRehabChange('medicalIndications', e.target.value)}
                        placeholder="Ej: Reposo relativo, fisioterapia, evitar carga..."
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Detalles adicionales:</label>
                      <textarea
                        value={formData.rehab.details}
                        onChange={(e) => handleRehabChange('details', e.target.value)}
                        placeholder="Información adicional sobre tu lesión..."
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Banderas rojas (signos de alarma):</label>
                      <div className="preferences-grid">
                        {redFlagsOptions.map(option => (
                          <label key={option} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={formData.rehab.redFlags.includes(option)}
                              onChange={(e) => handleRedFlagsChange(option, e.target.checked)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                      {formData.rehab.redFlags.length > 0 && (
                        <div className="alert-blocking">
                          Se detectaron signos de alarma. Por tu seguridad, te recomendamos consultar con un profesional de salud antes de continuar.
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.rehab.hasMedicalClearance}
                          onChange={(e) => handleRehabChange('hasMedicalClearance', e.target.checked)}
                          required
                        />
                        <span>Confirmo que cuento con autorización médica para iniciar un plan de recuperación supervisado.</span>
                      </label>
                    </div>

                    <small style={{ color: '#6b7280', fontSize: '0.85rem', display: 'block', marginTop: '8px' }}>
                      Este módulo no reemplaza la evaluación de un profesional. Usa la información como guía general.
                    </small>
                  </>
                )}
              </div>
            )}

            {/* Subformulario de Deporte Específico */}
            {hasSportGoal && (
              <div className="sport-form-container">
                <SportForm
                  value={formData.sport}
                  onChange={handleSportChange}
                  rehabSeverity={formData.rehab?.severity}
                />
              </div>
            )}

            {/* Subformulario de Rendimiento Sexual */}
            {hasSexualGoal && (
              <div className="sexual-performance-form-container">
                <SexualPerformanceForm
                  value={formData.sexual}
                  onChange={handleSexualChange}
                />
              </div>
            )}

          </div>
        );

             case 2:
         return (
           <div className="step-container">
             <h2>Datos Antropométricos</h2>
             <p>Estos datos nos ayudarán a medir tu progreso de manera más precisa.</p>
             
             <div className="form-row">
               <div className="form-group">
                 <label>Sexo:</label>
                 <select
                   value={formData.gender}
                   onChange={(e) => handleInputChange('gender', e.target.value)}
                   required
                 >
                   <option value="">Selecciona una opción</option>
                   {genderOptions.map(option => (
                     <option key={option} value={option}>{option}</option>
                   ))}
                 </select>
               </div>

               <div className="form-group">
                 <label>Fecha de nacimiento:</label>
                 <input
                   type="date"
                   value={formData.birthDate}
                   onChange={(e) => handleInputChange('birthDate', e.target.value)}
                   placeholder="2001-11-01"
                   required
                 />
               </div>
             </div>

             <div className="form-row">
               <div className="form-group">
                 <label>Edad:</label>
                 <input
                   type="number"
                   value={formData.age}
                   onChange={(e) => handleInputChange('age', e.target.value)}
                   placeholder="25"
                   required
                 />
               </div>
               
               <div className="form-group">
                 <label>Peso inicial (kg):</label>
                 <input
                   type="number"
                   step="0.1"
                   value={formData.initialWeight}
                   onChange={(e) => handleInputChange('initialWeight', e.target.value)}
                   placeholder="70.5"
                   required
                 />
               </div>
             </div>

             <div className="form-row">
               <div className="form-group">
                 <label>Altura (cm):</label>
                 <input
                   type="number"
                   value={formData.height}
                   onChange={(e) => handleInputChange('height', e.target.value)}
                   placeholder="175"
                   required
                 />
               </div>
             </div>
            
            <h3>Medidas corporales (cm):</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Cuello:</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.neck}
                  onChange={(e) => handleInputChange('neck', e.target.value)}
                  placeholder="38"
                />
              </div>
              
              <div className="form-group">
                <label>Pecho:</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.chest}
                  onChange={(e) => handleInputChange('chest', e.target.value)}
                  placeholder="95"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cintura:</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  placeholder="80"
                />
              </div>
              
              <div className="form-group">
                <label>Caderas:</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.hips}
                  onChange={(e) => handleInputChange('hips', e.target.value)}
                  placeholder="95"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bíceps (relajado):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bicepsRelaxed}
                  onChange={(e) => handleInputChange('bicepsRelaxed', e.target.value)}
                  placeholder="30"
                />
              </div>
              
              <div className="form-group">
                <label>Bíceps (contraído):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bicepsFlexed}
                  onChange={(e) => handleInputChange('bicepsFlexed', e.target.value)}
                  placeholder="35"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Muslos:</label>
              <input
                type="number"
                step="0.1"
                value={formData.thighs}
                onChange={(e) => handleInputChange('thighs', e.target.value)}
                placeholder="55"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-container">
            <h2>Nivel de Experiencia</h2>
            <p>Esto nos ayudará a crear rutinas apropiadas para tu nivel.</p>
            
            <div className="form-group">
              <label>¿Cuál es tu nivel de experiencia?</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                required
              >
                <option value="">Selecciona tu nivel</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <h3>Equipamiento Disponible</h3>
            <p>¡Esta es la sección más importante! Marca lo que tienes disponible para eliminar excusas.</p>
            
            <div className="equipment-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.equipment.bodyweight}
                  onChange={(e) => handleEquipmentChange('bodyweight', e.target.checked)}
                />
                <span>Solo mi cuerpo (calistenia)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.equipment.resistanceBands}
                  onChange={(e) => handleEquipmentChange('resistanceBands', e.target.checked)}
                />
                <span>Bandas de resistencia</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.equipment.dumbbells}
                  onChange={(e) => handleEquipmentChange('dumbbells', e.target.checked)}
                />
                <span>Mancuernas</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.equipment.pullUpBar}
                  onChange={(e) => handleEquipmentChange('pullUpBar', e.target.checked)}
                />
                <span>Barra de dominadas</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.equipment.fullGym}
                  onChange={(e) => handleEquipmentChange('fullGym', e.target.checked)}
                />
                <span>Acceso a gimnasio completo</span>
              </label>
            </div>

            {formData.equipment.dumbbells && (
              <div className="form-group">
                <label>Rango de peso de tus mancuernas (kg):</label>
                <input
                  type="text"
                  value={formData.dumbbellRange}
                  onChange={(e) => handleInputChange('dumbbellRange', e.target.value)}
                  placeholder="Ej: 2kg, 5kg, 10kg, 15kg"
                />
              </div>
            )}
          </div>
        );

             case 4:
         return (
           <div className="step-container">
             <h2>Preferencias y Deportes</h2>
             
             <div className="form-group">
               <label>¿Qué tipo de ejercicio disfrutas?</label>
               <div className="preferences-grid">
                 {exerciseTypes.map(type => (
                   <label key={type} className="checkbox-label">
                     <input
                       type="checkbox"
                       checked={formData.exercisePreferences.includes(type)}
                       onChange={(e) => handlePreferenceChange(type, e.target.checked)}
                     />
                     <span>{type}</span>
                   </label>
                 ))}
               </div>
             </div>

             <div className="form-group">
               <label>¿Tienes un deporte favorito?</label>
               <select
                 value={formData.favoriteSport}
                 onChange={(e) => handleInputChange('favoriteSport', e.target.value)}
               >
                 <option value="">Selecciona tu deporte favorito (opcional)</option>
                 {sportOptions.map(sport => (
                   <option key={sport} value={sport}>{sport}</option>
                 ))}
               </select>
             </div>

             <div className="form-group">
               <label>¿Tienes alguna lesión o limitación física?</label>
               <textarea
                 value={formData.injuries}
                 onChange={(e) => handleInputChange('injuries', e.target.value)}
                 placeholder="Ej: Lesión en la rodilla derecha, dolor en la espalda baja..."
                 rows="3"
               />
             </div>
           </div>
         );

             case 5:
         return (
           <div className="step-container">
             {/* _________________ Implementación menstruación */}
             {/* <h2>Información del Período (Opcional)</h2>
             <p>Esta información nos ayudará a personalizar tu entrenamiento según tu ciclo menstrual.</p>
             
             {formData.gender === 'Femenino' && (
               <>
                 <div className="form-group">
                   <label className="checkbox-label">
                     <input
                       type="checkbox"
                       checked={formData.hasPeriod}
                       onChange={(e) => handleInputChange('hasPeriod', e.target.checked)}
                     />
                     <span>¿Tienes período menstrual?</span>
                   </label>
                 </div>

                 {formData.hasPeriod && (
                   <div className="period-info-container">
                     <div className="form-row">
                       <div className="form-group">
                         <label>Duración del ciclo (días):</label>
                         <input
                           type="number"
                           value={formData.periodInfo.cycleLength}
                           onChange={(e) => updatePeriodInfo('cycleLength', e.target.value)}
                           placeholder="28"
                           min="20"
                           max="40"
                         />
                       </div>
                       
                       <div className="form-group">
                         <label>Duración del período (días):</label>
                         <input
                           type="number"
                           value={formData.periodInfo.periodLength}
                           onChange={(e) => updatePeriodInfo('periodLength', e.target.value)}
                           placeholder="5"
                           min="2"
                           max="10"
                         />
                       </div>
                     </div>

                     <div className="form-group">
                       <label>¿Qué síntomas experimentas durante tu período?</label>
                       <div className="symptoms-grid">
                         {periodSymptoms.map(symptom => (
                           <label key={symptom} className="checkbox-label">
                             <input
                               type="checkbox"
                               checked={formData.periodInfo.symptoms.includes(symptom)}
                               onChange={(e) => handlePeriodSymptomChange(symptom, e.target.checked)}
                             />
                             <span>{symptom}</span>
                           </label>
                         ))}
                       </div>
                     </div>
                   </div>
                 )}
               </>
             )} */}
             {/* :::::::::::::::::::::::::::: Fin de implementación::::::::::::::: */}

             <div className="form-group">
               <label>¿Por qué quieres alcanzar tu objetivo?</label>
               <textarea
                 value={formData.motivation}
                 onChange={(e) => handleInputChange('motivation', e.target.value)}
                 placeholder="Ej: Quiero sentirme más fuerte y confiado, mejorar mi salud para mi familia..."
                 rows="4"
                 required
               />
             </div>

             <div className="summary">
               <h3>Resumen de tu perfil:</h3>
               <p><strong>Nombre:</strong> {formData.profileName}</p>
               <p><strong>Sexo:</strong> {formData.gender}</p>
               <p><strong>Meta Principal:</strong> {getGoalById(formData.goals.primary)?.label || 'No seleccionada'}</p>
               {formData.goals.secondary && (
                 <p><strong>Meta 2:</strong> {getGoalById(formData.goals.secondary)?.label || formData.goals.secondary}</p>
               )}
               {formData.goals.tertiary && (
                 <p><strong>Meta 3:</strong> {getGoalById(formData.goals.tertiary)?.label || formData.goals.tertiary}</p>
               )}
               <p><strong>Deporte Favorito:</strong> {formData.favoriteSport || 'No especificado'}</p>
               {/*  :::::::::::::::::::::::::::: Implementación menstruación ::::::::::::::::::::::::::::  */}
               {/* {formData.gender === 'Femenino' && formData.hasPeriod && (
                 <div>
                   <p><strong>Información del Período:</strong></p>
                   <p>Ciclo: {formData.periodInfo.cycleLength} días | Período: {formData.periodInfo.periodLength} días</p>
                   {formData.periodInfo.symptoms.length > 0 && (
                     <p>Síntomas: {formData.periodInfo.symptoms.join(', ')}</p>
                   )}
                 </div>
               )} */}
               {/* :::::::::::::::::::::::::::: Fin de implementación::::::::::::::: */}
               <p><strong>Nivel:</strong> {formData.experienceLevel}</p>
               <p><strong>Equipamiento:</strong> {Object.keys(formData.equipment).filter(key => formData.equipment[key]).join(', ') || 'Ninguno seleccionado'}</p>
             </div>
           </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
             <div className="progress-bar">
         <div 
           className="progress-fill" 
           style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
         ></div>
       </div>

      <div className="step-content">
        {renderStep()}
      </div>

      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button 
            className="btn btn-secondary" 
            onClick={prevStep}
          >
            Anterior
          </button>
        )}
        
                 {currentStep < 5 ? (
           <button 
             className="btn btn-primary" 
             onClick={nextStep}
            disabled={
              (currentStep === 0 && !formData.profileName) ||
              (currentStep === 1 && (!formData.goals.primary || 
                (hasRehabGoal && !isRehabValid()) || 
                (hasSportGoal && !isSportValid()) || 
                (hasSexualGoal && !isSexualValid()))) ||
              (currentStep === 2 && (!formData.gender || !formData.age || !formData.initialWeight || !formData.height)) ||
              (currentStep === 3 && !formData.experienceLevel) ||
              (currentStep === 4 && formData.exercisePreferences.length === 0)
            }
           >
             Siguiente
           </button>
         ) : (
          <button 
            className="btn btn-success" 
            onClick={handleSubmit}
            disabled={!formData.motivation || isSubmitting || 
              (hasRehabGoal && formData.rehab.redFlags.length > 0)}
          >
            {isSubmitting ? 'Guardando...' : '¡Comenzar mi viaje!'}
          </button>
        )}
        
        {submitMessage && (
          <div className={submitMessage.includes('Error') ? 'error-message' : 'success-message'}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;