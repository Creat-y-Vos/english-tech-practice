# 📱 Guía: Cómo generar el APK (Paso a paso en español)

## ¿Qué es lo que vamos a hacer?

Convertir el código React Native en un APK listo para instalar en tu Android.

---

## 🔴 OPCIÓN 1: EAS Build Online (Recomendado - más fácil)

**Ventaja:** No necesitas Android Studio. Expo compila en sus servidores.  
**Tiempo:** ~20 minutos total

### Paso 1: Crear cuenta en Expo (si no la tienes)

1. Ve a [expo.dev](https://expo.dev)
2. Clickea "Sign up"
3. Completa el registro (gratis)

### Paso 2: Instalar EAS CLI

Abre terminal y ejecuta:

```bash
npm install -g eas-cli
```

Verifica que se instaló:

```bash
eas --version
```

### Paso 3: Loguarte en Expo desde terminal

```bash
eas login
```

Te pedirá email y contraseña. Ingresa las de tu cuenta Expo.

### Paso 4: Crear un Proyecto en Expo

1. Ve a [expo.dev/projects](https://expo.dev/projects)
2. Clickea "Create project"
3. Dale un nombre (ej: "english-tech-practice")
4. **COPIA el Project ID** (se ve como `12345678-abcd-...`)

### Paso 5: Agregar Project ID al código

Abre el archivo `app.json` y busca esta línea:

```json
"projectId": "your-project-id-here"
```

Reemplazala con tu Project ID:

```json
"projectId": "12345678-abcd-efgh-ijkl-mnopqrstuvwx"
```

Guarda el archivo.

### Paso 6: Instalar dependencias

En terminal, en la carpeta del proyecto:

```bash
npm install
```

Espera a que termine (2-3 minutos).

### Paso 7: Compilar el APK

```bash
eas build --platform android --profile preview
```

El sistema va a:
- Validar el proyecto
- Compilar en los servidores de Expo
- Generarte un APK

**Esto tarda ~15-20 minutos.** Puedes cerrar terminal y seguir más tarde.

### Paso 8: Descargar el APK

Cuando termine:
- Verás un link en terminal
- O ve a [expo.dev/accounts/](https://expo.dev/accounts/) → Builds
- Clickea el build que dice "finished"
- Descarga el `.apk`

---

## 🟠 OPCIÓN 2: Compilación Local (Si tienes Android Studio)

**Tiempo:** ~30 minutos (incluye descargas)

### Paso 1-5: Igual que OPCIÓN 1

(Hace falta tener Android Studio instalado con Android SDK)

### Paso 6: Instalar dependencias

```bash
npm install
```

### Paso 7: Generar APK localmente

```bash
expo build:android
```

Sigue las preguntas. Expo descargará Android SDK y compilará.

---

## 🟢 OPCIÓN 3: Emulador local (Solo para testing rápido)

Si querés probar la app antes de generar APK:

```bash
npm run android
```

(Requiere Android Studio + emulador)

---

## ✅ Instalar el APK en tu teléfono

Cuando ya tengas el `.apk`:

1. **Descargalo** en tu computadora
2. **Conecta tu teléfono** por USB (o pasa por cable/AirDrop)
3. En tu **Android**, ve a Configuración:
   - Busca "Seguridad" o "Privacidad"
   - Habilita "Instalar apps de fuentes desconocidas"
4. Abre el archivo `.apk` con el **Gestor de archivos**
5. Toca **"Instalar"**
6. ¡Listo! Aparecerá en tu inicio

---

## 🔒 Permisos que la app necesita

La app pide permiso de **Internet** (para hablar con la IA). Cuando instales:
- Android te pedirá confirmación
- Clickea "Permitir"

---

## 📤 Cómo subirlo a tu repo

Después de generar el APK:

```bash
# Si usas Git
git add .
git commit -m "APK build 1.0"
git push origin main

# Opcionalmente, sube el APK a GitHub Releases o un Drive
```

---

## 🐛 Problemas comunes

| Problema | Solución |
|----------|----------|
| "Permission denied" en terminal | Usa `sudo` o instala con permisos de admin |
| "projectId not found" | Verifica que copiaste bien el ID en `app.json` |
| "Build failed" en EAS | Intenta nuevamente, a veces falla por timeout |
| APK no instala | Desinstala versiones viejas primero |
| Chat no funciona | Revisa conexión a internet en el teléfono |

---

## 🚀 Próximos pasos

1. **Genera el APK** (Opción 1 es la más fácil)
2. **Instálalo** en tu Android
3. **Prueba** las 4 conversaciones
4. **Muestra** el progreso a tu profe
5. **Usa 4-5 días/semana** para que veas resultados

---

## ❓ ¿Necesitas ayuda?

Si algo no funciona:
1. Revisa los mensajes de error en terminal
2. Copia el error y búscalo en Google
3. Verifica que cumples los requisitos (Node.js v18+)

¡Mucho éxito! 🎉
