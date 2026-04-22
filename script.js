document.getElementById('staffForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Verificar si el usuario marcó el reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (captchaResponse.length == 0) {
        alert("Por favor, completa la verificación 'No soy un robot'.");
        return;
    }

    // 2. Tu configuración (Pega tu Webhook aquí)
    const webhookURL = "TU_WEBHOOK_DE_DISCORD_AQUI"; 

    // 3. Recoger los datos del formulario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const experience = document.getElementById('experience').value;

    // 4. Crear el mensaje para Discord
    const payload = {
        embeds: [{
            title: "🛡️ NUEVA POSTULACIÓN VERIFICADA",
            description: "Se ha recibido una nueva solicitud a través de la web oficial.",
            color: 3066993, // Color verde
            fields: [
                { name: "👤 Usuario Discord", value: username, inline: true },
                { name: "📧 Correo Electrónico", value: email, inline: true },
                { name: "🎂 Edad", value: age, inline: true },
                { name: "📝 Experiencia", value: experience }
            ],
            footer: { text: "Sistema de Seguridad FS22 | reCAPTCHA ✅" },
            timestamp: new Date()
        }]
    };

    // 5. Enviar a Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('status').innerText = "✅ ¡Postulación enviada con éxito!";
            document.getElementById('status').style.color = "#43b581";
            document.getElementById('staffForm').reset(); // Limpia el formulario
            grecaptcha.reset(); // Reinicia el captcha
        } else {
            document.getElementById('status').innerText = "❌ Error al enviar. Revisa el Webhook.";
            document.getElementById('status').style.color = "#f04747";
        }
    })
    .catch(error => {
        document.getElementById('status').innerText = "❌ Error de conexión con el servidor.";
        console.error('Error:', error);
    });
});
