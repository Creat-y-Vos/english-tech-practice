# English Tech Practice - React Native App

App para practicar conversaciones de negocios en inglés con coach de IA.

## 📱 Requisitos

- Node.js v18+ instalado
- npm o yarn
- Cuenta en Expo (gratuita) - [expo.dev](https://expo.dev)
- Android Studio + SDK (opcional, solo si compilas localmente)

## 🚀 Instalación rápida

### 1. Clonar/descargar el proyecto
```bash
git clone <tu-repo>
cd english-tech-practice
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Compilar el APK (opción recomendada: EAS Build online)

**Opción A: EAS Build (recomendado - no requiere Android Studio)**

```bash
# 1. Instalar EAS CLI
npm install -g eas-cli

# 2. Loguarte en Expo
eas login

# 3. Compilar APK
eas build --platform android --profile preview

# El APK se descargará automáticamente en ~15-20 min
# O puedes verlo en: https://expo.dev/accounts/[tu-usuario]/builds
```

**Opción B: Compilación local (requiere Android Studio)**

```bash
# 1. Instalar Expo CLI localmente
npm install expo-cli

# 2. Crear build local
expo build:android

# El APK se generará y descargará
```

**Opción C: Emulador local rápido (desarrollo)**

```bash
# Ejecutar en emulador Android (requiere Android Studio)
npm run android

# O en web (sin instalar en Android)
npm run web
```

## 📦 Estructura del proyecto

```
.
├── App.js                 # Componente principal (React Native)
├── app.json              # Configuración Expo
├── package.json          # Dependencias
├── eas.json              # Configuración de compilación
├── assets/               # Iconos y splash screen (opcional)
└── README.md            # Este archivo
```

## 🔧 Configuración importante

### Agregar tu Project ID a Expo

1. Ve a [expo.dev](https://expo.dev)
2. Crea un nuevo proyecto
3. Copia el Project ID
4. Pégalo en `app.json` donde dice `"projectId": "your-project-id-here"`

```json
// En app.json
"extra": {
  "eas": {
    "projectId": "12345678-1234-1234-1234-123456789012"
  }
}
```

### Variable de entorno para API de Anthropic

El app ya tiene integrada la API de Anthropic para el chat. La API key se envía directamente desde el cliente.

**IMPORTANTE:** En producción, deberías manejar las API keys de forma segura (backend proxy). Por ahora, para desarrollo/testing, funciona así.

## 🎯 Instalación del APK en tu teléfono

1. **Descarga el APK** que genera EAS Build
2. En tu Android, habilita "Instalar apps de fuentes desconocidas":
   - Configuración → Seguridad → Permitir instalación desde fuentes desconocidas
3. Abre el APK con el gestor de archivos
4. Toca "Instalar"
5. ¡Listo! La app estará en tu inicio

## 💡 Características de la app

- ✅ Racha de días (tracker visual)
- ✅ Chat con IA coach (corrección en tiempo real)
- ✅ 4 temas de práctica: Present Results, Team, Kick-off, Strategic Decisions
- ✅ Vocabulario personalizado (agrega tus palabras)
- ✅ Semanal stats
- ✅ US English

## 🐛 Troubleshooting

### "Build failed" en EAS
- Asegúrate de tener la `projectId` correcta en `app.json`
- Verifica tu internet
- Intenta nuevamente: `eas build --platform android --profile preview`

### APK no instala en Android
- Verifica que tu versión Android sea 5.0+
- Desinstala versiones anteriores de la app
- Habilita "Fuentes desconocidas" en Seguridad

### Chat no funciona
- Verifica tu conexión a internet
- Chequea que la API de Anthropic está correcta (en el código)
- En modo desarrollo, los errores aparecen en la app

## 📝 Personalización

Para cambiar temas, colores o textos:
1. Abre `App.js`
2. Modifica los estilos en `StyleSheet.create()`
3. Cambia los `topics` array para nuevos temas
4. Recompila: `eas build --platform android --profile preview`

## 📦 Distribución

Si quieres compartir la app:
1. El APK se puede distribuir por email, Google Drive, etc.
2. O usa TestFlight (iOS) / Google Play (requiere cuenta desarrollador)

## 🤝 Contribuciones

Cambios sugeridos para mejorar:
- Agregar guardado local de chats (AsyncStorage)
- Notificaciones diarias de recordatorio
- Integración con Google Drive para backup
- Modo offline parcial

---

**Cualquier problema:** revisa los logs en terminal o contacta al equipo de desarrollo.

¡Buena suerte practicando inglés! 🚀
