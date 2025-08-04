# Somos Fitness - Aplicación de Fitness con IA

Una aplicación moderna de fitness que utiliza inteligencia artificial para personalizar rutinas de entrenamiento y ayudar a los usuarios a alcanzar sus objetivos de salud y fitness.

## 🚀 Características Principales

### 1. Onboarding Inteligente
- **Creación de Perfiles**: Sistema de perfiles individuales personalizados
- **Cuestionario Detallado**: Recopila información completa sobre objetivos, nivel de experiencia y equipamiento disponible
- **Datos Antropométricos**: Medidas corporales precisas para seguimiento del progreso
- **Equipamiento Disponible**: Adapta las rutinas al equipamiento que tienes en casa

### 2. Dashboard Personalizado
- **Misión Diaria**: Muestra el entrenamiento programado para el día
- **Accesos Rápidos**: Botones para iniciar entrenamiento, registrar peso y calorías
- **Resumen de Progreso**: Gráficos y estadísticas de tu evolución
- **Tips de IA**: Consejos personalizados basados en tus datos

### 3. Plan de Entrenamiento Inteligente
- **Rutinas Personalizadas**: Generadas por IA según tus objetivos y equipamiento
- **Alternativas en Casa**: Si no tienes acceso a ciertas máquinas, la IA te sugiere alternativas
- **Sistema de Feedback**: Califica ejercicios para que la IA aprenda tus preferencias
- **Integración de Cardio**: Sesiones de cardio y deportes específicos

### 4. Seguimiento de Progreso
- **Registro Histórico**: Historial completo de peso, medidas y rendimiento
- **Gráficos Interactivos**: Visualización de tu progreso con predicciones de la IA
- **Análisis de Rendimiento**: Detección de estancamientos y recomendaciones
- **Informes Semanales**: Resúmenes automáticos de tu progreso

### 5. Academia Deportiva
- **Entrenamiento Específico**: Drills y ejercicios para deportes específicos
- **Seguimiento de Habilidades**: Récords personales y evolución
- **Planes de Habilidades**: Generados por IA para mejorar en tu deporte

### 6. Centro de Motivación
- **Sistema de Accountability**: Seguimiento personal y motivación individual
- **Reto de los 5 Minutos**: Rutinas cortas para superar la pereza
- **Recordatorios de Motivación**: Te recuerda tu "por qué" en momentos difíciles
- **Sistema de Logros**: Medallas virtuales por hitos alcanzados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19**: Framework principal
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript ES6+**: Lógica de la aplicación
- **Responsive Design**: Optimizado para móviles y desktop

### Backend (Google Services)
- **Google Apps Script**: Backend serverless
- **Google Sheets**: Base de datos
- **Google APIs**: Integración con servicios de Google

## 📁 Estructura del Proyecto

```
somos/
├── public/                 # Archivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   └── Onboarding/    # Formulario de onboarding
│   ├── services/          # Servicios de API
│   ├── config/           # Configuración
│   ├── utils/            # Utilidades
│   └── styles/           # Estilos globales
├── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/somos-fitness.git
cd somos-fitness
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
REACT_APP_APP_NAME=Somos Fitness
REACT_APP_VERSION=1.0.0
REACT_APP_DEBUG=true
```

### 4. Ejecutar en desarrollo
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 🔧 Configuración del Backend (Google Apps Script)

### 1. Crear Google Sheet
- Crea una nueva hoja de cálculo en Google Sheets
- Organiza las hojas para diferentes tipos de datos (usuarios, progreso, rutinas, etc.)

### 2. Crear Google Apps Script
- Ve a [script.google.com](https://script.google.com)
- Crea un nuevo proyecto
- Implementa las funciones `doGet()` y `doPost()` para manejar las peticiones

### 3. Desplegar como Web App
- Configura el script como aplicación web
- Obtén la URL de la API
- Actualiza la variable `REACT_APP_API_URL` en tu `.env`

## 📱 Características Técnicas

### Arquitectura
- **Frontend Desacoplado**: React SPA que se comunica con Google Apps Script
- **Backend Serverless**: Google Apps Script como API
- **Base de Datos**: Google Sheets como base de datos
- **API RESTful**: Comunicación mediante endpoints REST

### Seguridad
- Validación de datos en frontend y backend
- Manejo de errores robusto
- Configuración de CORS en Google Apps Script

### Performance
- Lazy loading de componentes
- Optimización de imágenes
- Caching de datos
- Compresión de respuestas

## 🎯 Próximos Pasos

### Fase 1: Onboarding (✅ Completado)
- [x] Formulario de onboarding
- [x] Validación de datos
- [x] Integración con API
- [x] Diseño responsive

### Fase 2: Dashboard
- [ ] Dashboard principal
- [ ] Componentes de progreso
- [ ] Gráficos interactivos
- [ ] Sistema de notificaciones

### Fase 3: Plan de Entrenamiento
- [ ] Generador de rutinas
- [ ] Sistema de ejercicios
- [ ] Integración con videos/GIFs
- [ ] Sistema de feedback

### Fase 4: Progreso y Analytics
- [ ] Gráficos de progreso
- [ ] Análisis de rendimiento
- [ ] Predicciones de IA
- [ ] Informes automáticos

### Fase 5: Funcionalidades Avanzadas
- [ ] Academia deportiva
- [ ] Centro de motivación
- [ ] Sistema de logros
- [ ] Integración social

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: tu-email@ejemplo.com
- **Proyecto**: [https://github.com/tu-usuario/somos-fitness](https://github.com/tu-usuario/somos-fitness)

---

**¡Gracias por usar Somos Fitness! 💪**
