import React, { useState, useEffect } from 'react';
import './OnboardingForm.css';

const SportForm = ({ value, onChange, disabled = false, rehabSeverity }) => {
  const [localData, setLocalData] = useState(value || {
    sportId: '',
    sportOther: '',
    discipline: '',
    level: '',
    roleOrCategory: '',
    peakTargetDate: '',
    sessionsPerWeek: 0,
    availableEquipment: [],
    preferredDays: [],
    previousInjuries: '',
    constraints: '',
    metricsFocus: [],
    notes: ''
  });

  // Sincronizar con value prop
  useEffect(() => {
    if (value) {
      setLocalData(value);
    }
  }, [value]);

  const handleFieldChange = (field, fieldValue) => {
    const updated = { ...localData, [field]: fieldValue };
    setLocalData(updated);
    onChange(updated);
  };

  const handleArrayChange = (field, item, checked) => {
    const current = localData[field] || [];
    const updated = checked
      ? [...current, item]
      : current.filter(i => i !== item);
    handleFieldChange(field, updated);
  };

  // Lista de deportes
  const sportOptions = [
    // Artes marciales y deportes de combate
    'Taekwondo',
    'Karate',
    'Hapkido',
    'Krav Maga',
    'UFC/MMA',
    'Judo',
    'Jiu-jitsu',
    'Boxeo',
    'Muay Thai',
    // Otros
    'Ciclismo',
    'Tenis',
    'Natación',
    'Escalada',
    'Patinaje',
    'Skateboarding',
    'Fútbol',
    'Básquetbol',
    'Voleibol',
    'Atletismo',
    'Béisbol',
    'CrossFit',
    'other'
  ];

  const isMartialArts = ['Taekwondo', 'Karate', 'Hapkido', 'Krav Maga', 'UFC/MMA', 'Judo', 'Jiu-jitsu', 'Boxeo', 'Muay Thai'].includes(localData.sportId);
  const isCycling = localData.sportId === 'Ciclismo';

  // Opciones de disciplina según deporte
  const getDisciplineOptions = () => {
    if (isCycling) {
      return ['ruta', 'mtb', 'pista'];
    }
    if (isMartialArts) {
      return ['kumite', 'kata'];
    }
    return [];
  };

  const levelOptions = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
    { value: 'competencia', label: 'Competencia' }
  ];

  const equipmentOptions = [
    'barras',
    'mancuernas',
    'bici',
    'rodillo',
    'colchoneta',
    'bandas',
    'peso corporal',
    'máquinas',
    'accesorios específicos'
  ];

  const dayOptions = [
    { value: 'lun', label: 'Lunes' },
    { value: 'mar', label: 'Martes' },
    { value: 'mie', label: 'Miércoles' },
    { value: 'jue', label: 'Jueves' },
    { value: 'vie', label: 'Viernes' },
    { value: 'sab', label: 'Sábado' },
    { value: 'dom', label: 'Domingo' }
  ];

  const metricsOptions = [
    { value: 'potencia', label: 'Potencia' },
    { value: 'resistencia', label: 'Resistencia' },
    { value: 'agilidad', label: 'Agilidad' },
    { value: 'técnica', label: 'Técnica' },
    { value: 'flexibilidad', label: 'Flexibilidad' },
    { value: 'fuerza', label: 'Fuerza' }
  ];

  // Validar peakTargetDate
  const validatePeakDate = () => {
    if (!localData.peakTargetDate) return null;
    const date = new Date(localData.peakTargetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return 'La fecha objetivo no puede ser en el pasado';
    }
    return null;
  };

  const peakDateWarning = validatePeakDate();

  return (
    <div className="sport-form-container">
      <h3>Información del Deporte</h3>
      <p className="form-description">
        Completa los detalles sobre tu deporte para crear un plan de entrenamiento específico.
      </p>

      {/* Aviso si hay rehab moderada/severa */}
      {(rehabSeverity === 'severa' || rehabSeverity === 'moderada') && (
        <div className="goal-warning" style={{ marginBottom: '16px' }}>
          ⚠️ Prioriza rehabilitación antes de cargas específicas de alto impacto.
        </div>
      )}

      <div className="form-group">
        <label>Selecciona tu deporte: <span style={{ color: 'red' }}>*</span></label>
        <select
          value={localData.sportId}
          onChange={(e) => {
            const newSportId = e.target.value;
            handleFieldChange('sportId', newSportId);
            // Limpiar discipline si cambia el deporte
            if (newSportId !== localData.sportId) {
              handleFieldChange('discipline', '');
            }
          }}
          required
          disabled={disabled}
        >
          <option value="">Selecciona un deporte</option>
          {sportOptions.map(sport => (
            <option key={sport} value={sport}>
              {sport === 'other' ? 'Otro (especificar)' : sport}
            </option>
          ))}
        </select>
      </div>

      {/* Campo "Otro" */}
      {localData.sportId === 'other' && (
        <div className="form-group">
          <label>Especifica el deporte: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            value={localData.sportOther || ''}
            onChange={(e) => handleFieldChange('sportOther', e.target.value)}
            placeholder="Ej: Parkour, Rugby, etc."
            required
            minLength={3}
            maxLength={100}
            disabled={disabled}
          />
        </div>
      )}

      {/* Disciplina (condicional) */}
      {getDisciplineOptions().length > 0 && (
        <div className="form-group">
          <label>Disciplina (opcional):</label>
          <select
            value={localData.discipline}
            onChange={(e) => handleFieldChange('discipline', e.target.value)}
            disabled={disabled}
          >
            <option value="">Selecciona una disciplina</option>
            {getDisciplineOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Nivel:</label>
        <select
          value={localData.level}
          onChange={(e) => handleFieldChange('level', e.target.value)}
          disabled={disabled}
        >
          <option value="">Selecciona tu nivel</option>
          {levelOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Sesiones por semana:</label>
        <input
          type="number"
          min="1"
          max="14"
          value={localData.sessionsPerWeek || ''}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            if (val >= 1 && val <= 14) {
              handleFieldChange('sessionsPerWeek', val);
            }
          }}
          placeholder="3-4 recomendado"
          disabled={disabled}
        />
        <small style={{ color: '#6b7280', fontSize: '0.85rem' }}>
          Rango: 1-14 sesiones por semana
        </small>
      </div>

      <div className="form-group">
        <label>Fecha objetivo (competencia/pico) (opcional):</label>
        <input
          type="date"
          value={localData.peakTargetDate || ''}
          onChange={(e) => handleFieldChange('peakTargetDate', e.target.value)}
          disabled={disabled}
        />
        {peakDateWarning && (
          <small style={{ color: '#f59e0b', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
            ⚠️ {peakDateWarning}
          </small>
        )}
      </div>

      <div className="form-group">
        <label>Equipo disponible:</label>
        <div className="preferences-grid">
          {equipmentOptions.map(equip => (
            <label key={equip} className="checkbox-label">
              <input
                type="checkbox"
                checked={localData.availableEquipment?.includes(equip) || false}
                onChange={(e) => handleArrayChange('availableEquipment', equip, e.target.checked)}
                disabled={disabled}
              />
              <span>{equip}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Métricas de foco:</label>
        <div className="preferences-grid">
          {metricsOptions.map(metric => (
            <label key={metric.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={localData.metricsFocus?.includes(metric.value) || false}
                onChange={(e) => handleArrayChange('metricsFocus', metric.value, e.target.checked)}
                disabled={disabled}
              />
              <span>{metric.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportForm;
