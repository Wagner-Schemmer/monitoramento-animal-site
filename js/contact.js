// Form de contato -> Supabase (preencha SUPABASE_URL e SUPABASE_ANON_KEY)
const SUPABASE_URL = "https://SUA-URL.supabase.co";
const SUPABASE_ANON_KEY = "SUA-ANON-KEY";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("contact-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      source: "site",
    };
    if (!payload.name || !payload.email || !payload.message) {
      status.textContent = "Preencha todos os campos.";
      return;
    }
    status.textContent = "Enviando...";
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      status.textContent = "✅ Mensagem enviada! Retornamos em breve.";
    } catch (err) {
      status.textContent = "❌ Falha ao enviar. Tente o e-mail direto abaixo.";
    }
  });
});
