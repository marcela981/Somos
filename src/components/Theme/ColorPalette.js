import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import './ColorPalette.css';

const ColorPalette = () => {
  const { 
    theme, 
    accentColor, 
    toggleTheme, 
    changeAccentColor,
    colorPalettes 
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions = [
    { name: 'orange', label: 'Naranja', icon: '🟠', color: '#ff6b6b' },
    { name: 'purple', label: 'Morado', icon: '🟣', color: '#9c27b0' },
    { name: 'cyan', label: 'Azul Cian', icon: '🔵', color: '#00bcd4' },
    { name: 'lime', label: 'Verde Lima', icon: '🟢', color: '#cddc39' },
    { name: 'red', label: 'Rojo', icon: '🔴', color: '#f44336' },
    { name: 'gray', label: 'Gris', icon: '⚫', color: '#757575' }
  ];

  const handleColorSelect = (colorName) => {
    changeAccentColor(colorName);
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="color-palette">
      {/* Botón principal */}
      <button 
        className="palette-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir paleta de colores"
      >
        <span className="palette-icon">🎨</span>
        <span className="palette-label">Tema</span>
      </button>

      {/* Panel de configuración */}
      {isOpen && (
        <div className="palette-panel">
          <div className="palette-header">
            <h3>Personalizar Tema</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar paleta"
            >
              ✕
            </button>
          </div>

          {/* Selector de modo claro/oscuro */}
          <div className="theme-section">
            <h4>Modo</h4>
            <div className="theme-toggle">
              <button 
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeToggle()}
              >
                <span className="theme-icon">☀️</span>
                <span>Claro</span>
              </button>
              <button 
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeToggle()}
              >
                <span className="theme-icon">🌙</span>
                <span>Oscuro</span>
              </button>
            </div>
          </div>

          {/* Selector de color de acento */}
          <div className="color-section">
            <h4>Color de Acento</h4>
            <div className="color-grid">
              {colorOptions.map((option) => (
                <button
                  key={option.name}
                  className={`color-option ${accentColor === option.name ? 'active' : ''}`}
                  onClick={() => handleColorSelect(option.name)}
                  style={{ '--color': option.color }}
                  aria-label={`Seleccionar color ${option.label}`}
                >
                  <span className="color-icon">{option.icon}</span>
                  <span className="color-label">{option.label}</span>
                  <div className="color-preview" style={{ backgroundColor: option.color }}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Vista previa del tema actual */}
          <div className="preview-section">
            <h4>Vista Previa</h4>
            <div className="theme-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-avatar" style={{ background: colorPalettes[accentColor].gradient }}></div>
                  <div className="preview-info">
                    <div className="preview-title">Tu Personaje</div>
                    <div className="preview-subtitle">Nivel 15</div>
                  </div>
                </div>
                <div className="preview-stats">
                  <div className="preview-stat">
                    <span className="stat-label">Fuerza</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ 
                          width: '75%',
                          background: colorPalettes[accentColor].gradient 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="preview-stat">
                    <span className="stat-label">Resistencia</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ 
                          width: '68%',
                          background: colorPalettes[accentColor].gradient 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del tema */}
          <div className="theme-info">
            <div className="info-item">
              <span className="info-label">Tema actual:</span>
              <span className="info-value">{theme === 'light' ? 'Claro' : 'Oscuro'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Color de acento:</span>
              <span className="info-value">{colorOptions.find(c => c.name === accentColor)?.label}</span>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div 
          className="palette-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ColorPalette; 