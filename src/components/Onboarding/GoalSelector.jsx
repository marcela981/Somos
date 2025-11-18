import React, { useState, useMemo } from 'react';
import { GOAL_CATEGORIES } from '../../data/goals.config';
import './GoalSelector.css';

const GoalSelector = ({ 
  label, 
  value, 
  onChange, 
  disabledGoalIds = [], 
  highlightId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Filtrar metas según búsqueda
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return GOAL_CATEGORIES;
    }

    const query = searchQuery.toLowerCase();
    return GOAL_CATEGORIES.map(category => ({
      ...category,
      goals: category.goals.filter(goal => 
        goal.label.toLowerCase().includes(query) ||
        goal.description.toLowerCase().includes(query)
      )
    })).filter(category => category.goals.length > 0);
  }, [searchQuery]);

  // Ordenar categorías: Rehabilitación primero si highlightId es 'rehab'
  const orderedCategories = useMemo(() => {
    const categories = [...filteredCategories];
    if (highlightId === 'rehab') {
      const rehabIndex = categories.findIndex(c => c.id === 'rehabilitation');
      if (rehabIndex > 0) {
        const [rehabCategory] = categories.splice(rehabIndex, 1);
        categories.unshift(rehabCategory);
      }
    }
    return categories;
  }, [filteredCategories, highlightId]);

  // Toggle acordeón
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Expandir categoría si contiene highlightId
  React.useEffect(() => {
    if (highlightId) {
      const category = GOAL_CATEGORIES.find(cat => 
        cat.goals.some(g => g.id === highlightId)
      );
      if (category) {
        setExpandedCategories(prev => ({
          ...prev,
          [category.id]: true
        }));
      }
    }
  }, [highlightId]);

  const handleGoalSelect = (goalId) => {
    if (disabledGoalIds.includes(goalId)) {
      return; // No permitir seleccionar metas deshabilitadas
    }
    onChange(goalId === value ? '' : goalId);
  };

  return (
    <div className="goal-selector-container">
      <label className="goal-selector-label">{label}</label>
      
      {/* Buscador */}
      <div className="goal-search-container">
        <input
          type="text"
          className="goal-search-input"
          placeholder="Buscar metas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Acordeones por categoría */}
      <div className="goal-categories-container" role="radiogroup" aria-label={label}>
        {orderedCategories.map(category => (
          <div key={category.id} className="goal-category">
            <button
              type="button"
              className="goal-category-header"
              onClick={() => toggleCategory(category.id)}
              aria-expanded={expandedCategories[category.id] || false}
            >
              <span className="goal-category-label">{category.label}</span>
              <span className="goal-category-arrow">
                {expandedCategories[category.id] ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories[category.id] && (
              <div className="goal-chips-container">
                {category.goals.map(goal => {
                  const isSelected = value === goal.id;
                  const isDisabled = disabledGoalIds.includes(goal.id);
                  const isHighlighted = highlightId === goal.id;
                  
                  return (
                    <div
                      key={goal.id}
                      className={`goal-chip ${isSelected ? 'goal-chip-selected' : ''} ${isDisabled ? 'goal-chip-disabled' : ''} ${isHighlighted ? 'goal-chip-highlighted' : ''}`}
                      role="radio"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      aria-label={goal.label}
                      onClick={() => !isDisabled && handleGoalSelect(goal.id)}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                          e.preventDefault();
                          handleGoalSelect(goal.id);
                        }
                      }}
                      tabIndex={isDisabled ? -1 : 0}
                      title={isDisabled ? 'Meta ya seleccionada en otra posición' : goal.description}
                    >
                      <span className="goal-chip-label">{goal.label}</span>
                      {isHighlighted && !isSelected && (
                        <span className="goal-chip-hint">💡 Sugerida</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredCategories.length === 0 && (
        <div className="goal-no-results">
          No se encontraron metas que coincidan con "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default GoalSelector;

