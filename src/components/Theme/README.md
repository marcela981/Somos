# Sistema de Temas - Somos Fitness

## Descripción

El sistema de temas permite cambiar dinámicamente entre modo claro y oscuro, así como seleccionar diferentes colores de acento para personalizar la experiencia del usuario.

## Componentes

### ThemeProvider
Proveedor de contexto que maneja el estado del tema y los colores de acento.

### ColorPalette
Componente de interfaz para seleccionar el tema y color de acento.

## Uso

### 1. Envolver la aplicación con ThemeProvider

```jsx
import { ThemeProvider } from './components/Theme';

function App() {
  return (
    <ThemeProvider>
      {/* Tu aplicación aquí */}
    </ThemeProvider>
  );
}
```

### 2. Usar el hook useTheme

```jsx
import { useTheme } from './components/Theme';

function MyComponent() {
  const { 
    theme, 
    accentColor, 
    toggleTheme, 
    changeAccentColor 
  } = useTheme();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <p>Color de acento: {accentColor}</p>
      <button onClick={toggleTheme}>Cambiar tema</button>
      <button onClick={() => changeAccentColor('purple')}>
        Cambiar a morado
      </button>
    </div>
  );
}
```

### 3. Agregar el componente ColorPalette

```jsx
import { ColorPalette } from './components/Theme';

function Layout() {
  return (
    <div>
      <header>
        <ColorPalette />
      </header>
      {/* Resto del contenido */}
    </div>
  );
}
```

## Colores Disponibles

- **Naranja** (default): `#ff6b6b` → `#ffa726`
- **Morado**: `#9c27b0` → `#ba68c8`
- **Azul Cian**: `#00bcd4` → `#4dd0e1`
- **Verde Lima**: `#cddc39` → `#d4e157`
- **Rojo**: `#f44336` → `#ef5350`
- **Gris**: `#757575` → `#9e9e9e`

## Variables CSS

El sistema utiliza variables CSS que se actualizan automáticamente:

### Tema
- `--background`: Color de fondo principal
- `--surface`: Color de superficie
- `--text`: Color de texto principal
- `--text-secondary`: Color de texto secundario
- `--border`: Color de bordes
- `--shadow`: Color de sombras
- `--card`: Color de tarjetas
- `--card-hover`: Color de tarjetas al hacer hover

### Color de Acento
- `--accent-primary`: Color primario del acento
- `--accent-secondary`: Color secundario del acento
- `--accent-tertiary`: Color terciario del acento
- `--accent-gradient`: Gradiente del acento
- `--accent-light`: Versión clara del acento
- `--accent-dark`: Versión oscura del acento

## Persistencia

Las preferencias del usuario se guardan automáticamente en `localStorage`:
- `theme`: 'light' o 'dark'
- `accentColor`: nombre del color seleccionado

## Características

- ✅ Cambio dinámico entre modo claro y oscuro
- ✅ 6 colores de acento diferentes
- ✅ Persistencia de preferencias
- ✅ Transiciones suaves
- ✅ Diseño responsivo
- ✅ Vista previa en tiempo real
- ✅ Accesibilidad (ARIA labels)
- ✅ Animaciones fluidas

## Ejemplo de Integración

```jsx
import React from 'react';
import { ThemeProvider, ColorPalette } from './components/Theme';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <h1>Somos Fitness</h1>
          <ColorPalette />
        </header>
        <main className="app-main">
          {/* Contenido de la aplicación */}
        </main>
      </div>
    </ThemeProvider>
  );
}
``` 