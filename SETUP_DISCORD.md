# Arreglar avisos en #postulaciones-web

## Por qué no llegaba nada

1. El webhook estaba en `script.js` en GitHub → **público** y a menudo **bloqueado por CORS** desde Pages.
2. Hay que enviar desde el **VPS** (`server.py`), no desde el navegador.

## Pasos (en orden)

### 1. Nuevo webhook en Discord

Canal **#postulaciones-web** (ID `1496149783969136740`):

1. Editar canal → **Integraciones** → **Webhooks** → **Nuevo webhook**.
2. Copiar la URL completa.
3. En el VPS, archivo `/opt/vct-staff-web/recaptcha.env`:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/.....
```

4. **Revoca** el webhook antiguo que estaba en GitHub (ya es público).

### 2. Desplegar API en el VPS

Desde tu PC:

```powershell
cd "c:\Users\judit\Documents\CÓDIGO FUENTE\web-postulaciones-staff"
# Edita recaptcha.env local con DISCORD_WEBHOOK_URL antes de desplegar
.\deploy-vps.ps1
```

### 3. URL HTTPS pública

GitHub Pages (`https://calero1989.github.io`) **no puede** llamar a `http://217.76.139.72:8090`.

Opciones:

- **Cloudflare Tunnel** en el VPS apuntando al puerto 8090.
- Dominio con nginx + Let's Encrypt.

Pon la URL en `web-FS22/config.example.js`:

```javascript
window.VCT_POSTULACION_API = "https://xxxx.trycloudflare.com/api/postulacion";
```

### 4. Subir web a GitHub

```powershell
cd "c:\Users\judit\Documents\CÓDIGO FUENTE\web-FS22"
git add index.html script.js style.css config.example.js README.md SETUP_DISCORD.md
git commit -m "Postulaciones: API VPS + reCAPTCHA, sin webhook en cliente"
git push
```

### 5. Google reCAPTCHA

Dominio permitido: `calero1989.github.io`

En producción en el VPS quita `RECAPTCHA_DEV_SKIP=1` del `recaptcha.env`.
