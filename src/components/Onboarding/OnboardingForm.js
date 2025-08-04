import React, { useState } from 'react';
import apiService from '../../services/api';
import { SECONDARY_GOALS } from '../../config/api.config';
import './OnboardingForm.css';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Perfil
    profileName: '',
    
    // Objetivo principal
    mainGoal: '',
    
    // Metas adicionales
    additionalGoals: [],
    
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
     motivation: ''
  });

  const goals = [
    'Reducción del Tejido Adiposo (Pérdida de Grasa)',
    'Hipertrofia Muscular (Aumento de Masa Muscular)',
    'Adaptaciones Neurales y Aumento de la Fuerza Máxima',
    'Recomposición Corporal',
    'Mejora de la Resistencia (Muscular y/o Cardiovascular)',
    'Mejora de la Potencia (Entrenamiento de Potencia)',
    'Mejora de la Movilidad y Flexibilidad',
  ];

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Preparar datos para enviar
      const onboardingData = {
        ...formData,
        createdAt: new Date().toISOString(),
        profileId: `profile_${Date.now()}` // Generar ID único
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
            <h2>¿Cuál es tu objetivo principal?</h2>
            <p>Esta información es clave para que la IA personalice tu plan de entrenamiento.</p>
            
            <div className="form-group">
              <label>Selecciona tu meta principal:</label>
              <select
                value={formData.mainGoal}
                onChange={(e) => handleInputChange('mainGoal', e.target.value)}
                required
              >
                <option value="">Selecciona una opción</option>
                {goals.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            <h3>Metas Adicionales (Opcional)</h3>
            <p>¿Tienes otras metas que te gustaría alcanzar? Puedes añadir hasta 2 metas adicionales.</p>
            
            {formData.additionalGoals.map((additionalGoal, index) => (
              <div key={index} className="additional-goal-container">
                <div className="additional-goal-header">
                  <h4>Meta {index + 2}</h4>
                  <button 
                    type="button" 
                    className="btn-remove-goal"
                    onClick={() => removeAdditionalGoal(index)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Selecciona tu meta adicional:</label>
                  <select
                    value={additionalGoal.goal}
                    onChange={(e) => updateAdditionalGoal(index, 'goal', e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    {Object.values(SECONDARY_GOALS).map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>

                {additionalGoal.goal === SECONDARY_GOALS.SPECIFIC_SPORT && (
                  <div className="form-group">
                    <label>¿Qué deporte específico?</label>
                    <input
                      type="text"
                      value={additionalGoal.sport}
                      onChange={(e) => updateAdditionalGoal(index, 'sport', e.target.value)}
                      placeholder="Ej: Fútbol, Baloncesto, Tenis..."
                    />
                  </div>
                )}
              </div>
            ))}

            {formData.additionalGoals.length < 2 && (
              <div className="add-goal-container">
                <button 
                  type="button" 
                  className="btn-add-goal"
                  onClick={addAdditionalGoal}
                >
                  + Añadir Meta Adicional
                </button>
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
               <p><strong>Objetivo Principal:</strong> {formData.mainGoal}</p>
               {formData.additionalGoals.length > 0 && (
                 <div>
                   <p><strong>Metas Adicionales:</strong></p>
                   <ul>
                     {formData.additionalGoals.map((goal, index) => (
                       <li key={index}>
                         {goal.goal}
                         {goal.sport && ` - ${goal.sport}`}
                       </li>
                     ))}
                   </ul>
                 </div>
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
               (currentStep === 1 && !formData.mainGoal) ||
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
            disabled={!formData.motivation || isSubmitting}
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