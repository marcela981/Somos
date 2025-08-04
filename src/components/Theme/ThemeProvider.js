import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const [accentColor, setAccentColor] = useState(() => {
    const savedColor = localStorage.getItem('accentColor');
    return savedColor || 'orange';
  });

  const colorPalettes = {
    orange: {
      primary: '#ff6b6b',
      secondary: '#ffa726',
      tertiary: '#ff7043',
      gradient: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
      light: '#ffcdd2',
      dark: '#d32f2f'
    },
    purple: {
      primary: '#9c27b0',
      secondary: '#ba68c8',
      tertiary: '#7b1fa2',
      gradient: 'linear-gradient(45deg, #9c27b0, #ba68c8)',
      light: '#e1bee7',
      dark: '#6a1b9a'
    },
    cyan: {
      primary: '#00bcd4',
      secondary: '#4dd0e1',
      tertiary: '#0097a7',
      gradient: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
      light: '#b2ebf2',
      dark: '#006064'
    },
    lime: {
      primary: '#cddc39',
      secondary: '#d4e157',
      tertiary: '#afb42b',
      gradient: 'linear-gradient(45deg, #cddc39, #d4e157)',
      light: '#f0f4c3',
      dark: '#827717'
    },
    red: {
      primary: '#f44336',
      secondary: '#ef5350',
      tertiary: '#d32f2f',
      gradient: 'linear-gradient(45deg, #f44336, #ef5350)',
      light: '#ffcdd2',
      dark: '#b71c1c'
    },
    gray: {
      primary: '#757575',
      secondary: '#9e9e9e',
      tertiary: '#616161',
      gradient: 'linear-gradient(45deg, #757575, #9e9e9e)',
      light: '#eeeeee',
      dark: '#424242'
    }
  };

  const themes = {
    light: {
      background: '#ffffff',
      surface: '#f8f9fa',
      primary: '#1a1a2e',
      secondary: '#16213e',
      text: '#333333',
      textSecondary: '#666666',
      border: '#e0e0e0',
      shadow: 'rgba(0, 0, 0, 0.1)',
      overlay: 'rgba(255, 255, 255, 0.9)',
      card: '#ffffff',
      cardHover: '#f5f5f5'
    },
    dark: {
      background: '#1a1a2e',
      surface: '#16213e',
      primary: '#ffffff',
      secondary: '#0f3460',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      overlay: 'rgba(0, 0, 0, 0.8)',
      card: 'rgba(255, 255, 255, 0.08)',
      cardHover: 'rgba(255, 255, 255, 0.12)'
    }
  };

  const currentTheme = themes[theme];
  const currentColors = colorPalettes[accentColor];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
  };

  useEffect(() => {
    // Aplicar variables CSS al documento
    const root = document.documentElement;
    
    // Variables del tema
    root.style.setProperty('--background', currentTheme.background);
    root.style.setProperty('--surface', currentTheme.surface);
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--secondary', currentTheme.secondary);
    root.style.setProperty('--text', currentTheme.text);
    root.style.setProperty('--text-secondary', currentTheme.textSecondary);
    root.style.setProperty('--border', currentTheme.border);
    root.style.setProperty('--shadow', currentTheme.shadow);
    root.style.setProperty('--overlay', currentTheme.overlay);
    root.style.setProperty('--card', currentTheme.card);
    root.style.setProperty('--card-hover', currentTheme.cardHover);
    
    // Variables de color de acento
    root.style.setProperty('--accent-primary', currentColors.primary);
    root.style.setProperty('--accent-secondary', currentColors.secondary);
    root.style.setProperty('--accent-tertiary', currentColors.tertiary);
    root.style.setProperty('--accent-gradient', currentColors.gradient);
    root.style.setProperty('--accent-light', currentColors.light);
    root.style.setProperty('--accent-dark', currentColors.dark);
    
    // Aplicar clase al body para transiciones
    document.body.className = `theme-${theme}`;
  }, [theme, accentColor]);

  const value = {
    theme,
    accentColor,
    currentTheme,
    currentColors,
    colorPalettes,
    themes,
    toggleTheme,
    changeAccentColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 