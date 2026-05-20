document.getElementById("staffForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const status = document.getElementById("status");
  const btn = document.getElementById("submitBtn");
  const apiUrl = window.VCT_POSTULACION_API;

  if (!apiUrl || apiUrl.includes("TU_URL")) {
    status.style.color = "#f04747";
    status.innerText =
      "❌ Falta configurar config.js con la URL del API (ver README).";
    return;
  }

  const captcha = typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "";
  if (!captcha) {
    status.style.color = "#f04747";
    status.innerText = "❌ Completa la verificación «No soy un robot».";
    return;
  }

  status.style.color = "#faa61a";
  status.innerText = "Enviando…";
  btn.disabled = true;

  const body = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    age: document.getElementById("age").value,
    experience: document.getElementById("experience").value.trim(),
    "g-recaptcha-response": captcha,
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      status.style.color = "#43b581";
      status.innerText = data.mensaje || "✅ Postulación enviada.";
      document.getElementById("staffForm").reset();
      grecaptcha.reset();
    } else {
      status.style.color = "#f04747";
      status.innerText = data.error || "❌ No se pudo enviar. Inténtalo más tarde.";
    }
  } catch (err) {
    status.style.color = "#f04747";
    status.innerText =
      "❌ Error de conexión con el servidor. Comprueba config.js (debe ser HTTPS desde GitHub Pages).";
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
