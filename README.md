# web-FS22 — Postulaciones Staff

Web publicada en: **https://calero1989.github.io/web-FS22/**

Los avisos van al canal Discord **#postulaciones-web** mediante un **servidor API** (no webhook en el navegador).

## Por qué cambió el sistema

GitHub Pages es solo HTML/JS. Enviar el webhook **desde el navegador** a Discord suele **fallar** (CORS) y deja el webhook **público** en GitHub.

Flujo correcto:

```
GitHub Pages (formulario + reCAPTCHA)
        ↓ HTTPS
VPS API (web-postulaciones-staff/server.py)
        ↓ verifica reCAPTCHA + webhook secreto
Discord #postulaciones-web
```

## Configuración rápida

### 1. Webhook nuevo en Discord

1. Canal **#postulaciones-web** → ⚙️ → Integraciones → Webhooks → **Nuevo webhook**.
2. Nombre: `Postulaciones Web FS22`.
3. Copia la URL (empieza por `https://discord.com/api/webhooks/...`).
4. Pégala en el VPS en `recaptcha.env` como `DISCORD_WEBHOOK_URL=...`  
   **No la subas a GitHub.**

### 2. API en el VPS

Carpeta hermana: `../web-postulaciones-staff/`  
Ver `../web-postulaciones-staff/RECAPTCHA_SETUP.md`.

### 3. URL pública HTTPS

GitHub Pages usa **HTTPS**; el API también debe ser **HTTPS** (túnel Cloudflare, dominio con SSL, etc.).

Copia `config.example.js` → `config.js` y pon:

```javascript
window.VCT_POSTULACION_API = "https://TU_URL_PUBLICA/api/postulacion";
```

Sube a GitHub solo `config.js` con la URL pública (o usa GitHub Secrets + Actions si prefieres no commitear la URL).

### 4. Google reCAPTCHA — dominio

En la clave **web-FS22** añade: `calero1989.github.io`

## Archivos

| Archivo | Uso |
|---------|-----|
| `index.html` | Formulario |
| `script.js` | Envía al API (sin webhook en cliente) |
| `config.js` | URL del API en el VPS |
| `style.css` | Estilos |

## Repositorio

https://github.com/calero1989/web-FS22
