const $ = (id) => document.getElementById(id);
const state = { devices: [], selected: null, timer: null };

async function api(path, opts) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function setStatus(msg, ok) {
  const el = $("api-status");
  el.textContent = msg;
  el.className = "alert-chip " + (ok ? "alert-ok" : "alert-danger");
}

async function loadAll() {
  try {
    const [devices, alerts] = await Promise.all([
      api("/api/devices"),
      api("/api/alerts?open=1"),
    ]);
    setStatus("● API online", true);
    state.devices = devices;
    renderDevices(devices);
    renderAlerts(alerts);
    if (!state.selected && devices.length) selectDevice(devices[0].id);
    else if (state.selected) loadTelemetry(state.selected);
  } catch (e) {
    setStatus("○ API offline — suba o backend (docker compose up)", false);
  }
}

function renderDevices(devices) {
  const box = $("device-list");
  box.innerHTML = "";
  if (!devices.length) {
    box.innerHTML = "<p>Nenhum dispositivo cadastrado.</p>";
    return;
  }
  devices.forEach((d) => {
    const card = document.createElement("button");
    card.className = "card" + (d.id === state.selected ? " selected" : "");
    card.style.cssText = "cursor:pointer;text-align:left;width:100%" + (d.id === state.selected ? ";outline:3px solid var(--lime)" : "");
    card.innerHTML = `<h3 style="margin:0">${d.name || d.id}</h3>
      <small style="color:var(--muted)">${d.id}</small>
      <p style="margin:.4rem 0 0;font-size:.85rem">Último sinal: ${d.last_seen ? new Date(d.last_seen).toLocaleString("pt-BR") : "—"}<br>
      Energia: ${d.last_mag != null ? Number(d.last_mag).toFixed(2) + " g" : "—"} · Bateria: ${d.last_batt != null ? Number(d.last_batt).toFixed(2) + " V" : "—"}</p>`;
    card.addEventListener("click", () => selectDevice(d.id));
    box.appendChild(card);
  });
}

async function selectDevice(id) {
  state.selected = id;
  renderDevices(state.devices);
  await loadTelemetry(id);
}

async function loadTelemetry(id) {
  try {
    const rows = await api(`/api/devices/${encodeURIComponent(id)}/telemetry?limit=300`);
    drawTelemetry(rows.slice().reverse());
    $("telemetry-count").textContent = `${rows.length} pontos`;
  } catch (e) {
    $("telemetry-count").textContent = "falha ao carregar";
  }
}

function drawTelemetry(rows) {
  const canvas = $("telemetry-chart");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  for (let y = 0; y < H; y += 24) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  if (!rows.length) return;
  const mags = rows.map((r) => Number(r.mag) || 0);
  const max = Math.max(2.5, ...mags);
  ctx.strokeStyle = "#c8f04a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  mags.forEach((v, i) => {
    const x = (i / Math.max(mags.length - 1, 1)) * W;
    const y = H - (v / max) * (H - 16) - 8;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  // limiar de alerta
  const yt = H - (1.8 / max) * (H - 16) - 8;
  ctx.strokeStyle = "#e5484d";
  ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(0, yt); ctx.lineTo(W, yt); ctx.stroke();
  ctx.setLineDash([]);
}

function renderAlerts(alerts) {
  const box = $("alert-list");
  box.innerHTML = "";
  $("alert-count").textContent = `${alerts.length} abertos`;
  if (!alerts.length) {
    box.innerHTML = "<p>Nenhum alerta aberto. 🎉</p>";
    return;
  }
  alerts.forEach((a) => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.marginBottom = ".7rem";
    div.innerHTML = `<strong>[${a.type}]</strong> ${a.message}<br>
      <small style="color:var(--muted)">${a.device_id} · ${new Date(a.time).toLocaleString("pt-BR")}</small><br>
      <button data-ack="${a.id}" class="btn btn-primary" style="padding:.35rem .9rem;font-size:.8rem;margin-top:.5rem;border:none;cursor:pointer">Marcar lido</button>`;
    box.appendChild(div);
  });
  box.querySelectorAll("[data-ack]").forEach((b) => {
    b.addEventListener("click", async () => {
      await api(`/api/alerts/${b.dataset.ack}/ack`, { method: "POST" });
      loadAll();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadAll();
  state.timer = setInterval(loadAll, 15000);
});
