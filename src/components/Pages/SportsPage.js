import React from 'react';
import MainLayout from '../Layout/MainLayout';
import './Pages.css';

const SportsPage = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>⚽ Deportes</h1>
          <p>Entrena habilidades específicas para tu deporte favorito</p>
        </div>
        
        <div className="page-content">
          <div className="coming-soon">
            <div className="coming-soon-icon">🏃‍♀️</div>
            <h2>Próximamente</h2>
            <p>Esta sección estará disponible en la próxima actualización</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SportsPage; 