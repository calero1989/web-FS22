const formulario = document.getElementById('formularioStaff');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // PEGA AQUÍ TU URL (asegúrate de que esté entre las comillas)
    const webhookURL = "https://discord.com/api/webhooks/1496149202084954233/TfALhN8Z6F4xi953Eo9zfjgByfR-thwxQvuox3uNds2Pb392idLYPIkyQCDPEyqq_9Ec";

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const experiencia = document.getElementById('experiencia').value;

    const datos = {
        content: "📢 **Nueva postulación de Staff recibida**",
        embeds: [{
            title: "Candidato para FS22 Vanilla RP",
            color: 3066993,
            fields: [
                { name: "Usuario de Discord", value: nombre, inline: true },
                { name: "Edad", value: edad, inline: true },
                { name: "Experiencia/Motivo", value: experiencia }
            ],
            footer: { text: "Sistema de Postulaciones Privado" }
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(respuesta => {
        if (respuesta.ok) {
            alert("¡Postulación enviada con éxito! Revisa tu Discord.");
            formulario.reset();
        } else {
            alert("Discord rechazó el mensaje. Verifica el enlace del webhook.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Fallo al conectar con Discord.");
    });
});