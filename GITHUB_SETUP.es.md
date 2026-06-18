# 🚀 GitHub Repo + APK Auto Build (Paso a paso)

## 1️⃣ Crear repo en GitHub

1. Ve a **https://github.com/new**
2. Nombre: `english-tech-practice` (o el que quieras)
3. Descripción: "English tech conversation practice app with AI coach"
4. **Private** o **Public** (como prefieras)
5. Clickea **"Create repository"**

---

## 2️⃣ Descargar todos los archivos

**Descarga estos 9 archivos que ya te preparé:**

```
App.js
package.json
app.json
eas.json
.gitignore
README.md
SETUP.es.md
.github/workflows/build.yml  ← Este es el nuevo (workflow)
```

Crea esta estructura en tu computadora:

```
english-tech-practice/
├── App.js
├── package.json
├── app.json
├── eas.json
├── .gitignore
├── README.md
├── SETUP.es.md
└── .github/
    └── workflows/
        └── build.yml
```

---

## 3️⃣ Subir a GitHub

Abre terminal en la carpeta `english-tech-practice/` y ejecuta:

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit: English Tech Practice app"

# Agregar remote (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/english-tech-practice.git

# Subir a main
git branch -M main
git push -u origin main
```

**Ejemplo real:**
```bash
git remote add origin https://github.com/fabian-dev/english-tech-practice.git
git push -u origin main
```

---

## 4️⃣ GitHub Actions compila automáticamente

Cuando hagas push:
1. GitHub ve el archivo `.github/workflows/build.yml`
2. Automáticamente inicia la compilación
3. En ~15-20 min termina

### Ver el progreso:
- Ve a tu repo en GitHub
- Clickea **"Actions"** (tab superior)
- Verás el build en progreso

---

## 5️⃣ Descargar el APK

**Opción A: Desde "Artifacts" (más fácil)**

1. En GitHub, ve a **Actions**
2. Clickea el build que dice ✅ **passed**
3. Scroll down hasta "Artifacts"
4. Descarga `app-release.apk`

**Opción B: Crear Release (para distribuir)**

1. Crea un tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. GitHub Actions genera un Release automáticamente
3. Descargá el APK desde **Releases**

---

## 🔄 Compilar de nuevo

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Actualizar descripción"
git push origin main
```

**GitHub Actions compila automáticamente.** Descargás el nuevo APK en 15-20 min.

---

## 📱 Instalar en tu Android

1. Descargá el `app-release.apk`
2. Transferilo a tu teléfono
3. Configuración → Seguridad → Permitir fuentes desconocidas
4. Abre el APK e instala

---

## ❓ Troubleshooting

| Problema | Solución |
|----------|----------|
| Build falla | Revisa el log en **Actions** → click en el build → scroll down |
| "Permission denied" en git | Usa SSH: `git@github.com:tu-usuario/repo.git` |
| No aparece en Artifacts | Espera a que termine. Si falla, ve el error en el log |
| APK no instala | Asegúrate de que Android 5.0+ |

---

## 🎉 ¡Listo!

Ya tienes:
- ✅ Repo con tu código
- ✅ GitHub Actions compilando automáticamente
- ✅ APK listo para descargar
- ✅ Máxima seguridad (tu código privado en GitHub)
- ✅ Actualizaciones automáticas

**Cualquier cambio que hagas → push → GitHub compila → descargas APK**
