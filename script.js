document.getElementById('staffForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const webhookURL = "TU_WEBHOOK_AQUI";https://discord.com/api/webhooks/1496149202084954233/TfALhN8Z6F4xi953Eo9zfjgByfR-thwxQvuox3uNds2Pb392idLYPIkyQCDPEyqq_9Ec // <--- PEGA TU ENLACE DE DISCORD AQUÍ

    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const experience = document.getElementById('experience').value;

    const payload = {
        embeds: [{
            title: "📩 Nueva Postulación de Staff",
            color: 7419530,
            fields: [
                { name: "Usuario", value: username, inline: true },
                { name: "Edad", value: age, inline: true },
                { name: "Experiencia", value: experience }
            ],
            footer: { text: "FS22 Vanilla RP" },
            timestamp: new Date()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('status').innerText = "✅ ¡Enviado con éxito!";
            document.getElementById('staffForm').reset();
        } else {
            document.getElementById('status').innerText = "❌ Error al enviar.";
        }
    })
    .catch(error => {
        document.getElementById('status').innerText = "❌ Error de conexión.";
    });
});
