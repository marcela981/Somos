import React, { useState, useEffect } from 'react';
import './OnboardingForm.css';

const SexualPerformanceForm = ({ value, onChange, disabled = false }) => {
  const [localData, setLocalData] = useState(value || {
    focusAreas: [],
    sessionsPerWeek: 0,
    notes: '',
    privacyOk: false
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

  const focusAreasOptions = [
    { value: 'resistencia', label: 'Resistencia' },
    { value: 'suelo_pelvico', label: 'Suelo pélvico' },
    { value: 'movilidad_cadera', label: 'Movilidad de cadera' },
    { value: 'core_postura', label: 'Core/postura' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'gestión_estrés_sueño', label: 'Gestión de estrés/sueño' }
  ];

  const redFlagsOptions = [
    'Dolor pélvico o lumbar persistente',
    'Cirugía pélvica reciente (<3 meses)',
    'Cualquier síntoma preocupante no valorado'
  ];

  const hasRedFlags = localData.redFlags && localData.redFlags.length > 0;

  return (
    <div className="sexual-performance-form-container">
      <h3>Rendimiento Sexual - Bienestar Físico</h3>
      
      <div className="form-group">
        <p className="disclaimer" style={{ 
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '4px'
        }}>
          Si presentas dolor, sangrado, disfunción severa u otros signos de alarma, consulta con un profesional.
        </p>
      </div>

      <div className="form-group">
        <label>Áreas de enfoque: <span style={{ color: 'red' }}>*</span></label>
        <div className="preferences-grid">
          {focusAreasOptions.map(area => (
            <label key={area.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={localData.focusAreas?.includes(area.value) || false}
                onChange={(e) => handleArrayChange('focusAreas', area.value, e.target.checked)}
                disabled={disabled}
              />
              <span>{area.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Sesiones por semana:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={localData.sessionsPerWeek || ''}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            if (val >= 1 && val <= 10) {
              handleFieldChange('sessionsPerWeek', val);
            }
          }}
          placeholder="3-4 recomendado"
          disabled={disabled}
        />
        <small style={{ color: '#6b7280', fontSize: '0.85rem' }}>
          Rango: 1-10 sesiones por semana
        </small>
      </div>


      <div className="form-group">
        <label>Notas:</label>
        <textarea
          value={localData.notes || ''}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          placeholder="Cualquier información adicional que consideres relevante..."
          rows="3"
          maxLength={500}
          disabled={disabled}
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={localData.privacyOk || false}
            onChange={(e) => handleFieldChange('privacyOk', e.target.checked)}
            required
            disabled={disabled}
          />
          <span>
            Entiendo que este plan es de bienestar físico y no reemplaza atención clínica. 
            <span style={{ color: 'red' }}> *</span>
          </span>
        </label>
      </div>

      <small style={{ 
        color: '#6b7280', 
        fontSize: '0.85rem', 
        display: 'block', 
        marginTop: '8px',
        fontStyle: 'italic'
      }}>
        Este módulo se enfoca exclusivamente en condición física, movilidad y bienestar. 
        No incluye contenido explícito ni reemplaza la consulta médica o terapia especializada.
      </small>
    </div>
  );
};

export default SexualPerformanceForm;
