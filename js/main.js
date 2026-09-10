// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---- Demo: simulated accelerometer signal + classifier readout ----
const PROFILES = {
  ruminando: { base: 0.25, amp: 0.35, freq: 0.9, noise: 0.08, energy: "baixa", freqLabel: "~0,9 Hz", alert: "nenhum" },
  comendo:   { base: 0.45, amp: 0.55, freq: 0.4, noise: 0.15, energy: "média", freqLabel: "~0,4 Hz", alert: "nenhum" },
  andando:   { base: 0.6,  amp: 0.8,  freq: 1.8, noise: 0.25, energy: "alta", freqLabel: "~1,8 Hz", alert: "nenhum" },
  cio:       { base: 0.5,  amp: 1.6,  freq: 3.2, noise: 0.5,  energy: "muito alta", freqLabel: "rajadas 3+ Hz", alert: "🔥 possível cio" },
  repouso:   { base: 0.1,  amp: 0.08, freq: 0.2, noise: 0.03, energy: "mínima", freqLabel: "—", alert: "nenhum" },
};
let current = "ruminando";
let t = 0;
const canvas = document.getElementById("accel-chart");
const ctx = canvas ? canvas.getContext("2d") : null;
const history = new Array(220).fill(0);

function sample(p) {
  // Burst pattern for cio: spikes every ~2.5s
  let burst = 1;
  if (current === "cio") {
    const phase = (t % 2.5) / 2.5;
    burst = phase < 0.18 ? 2.6 : 0.7;
  }
  const wave = Math.sin(t * p.freq * Math.PI * 2) * p.amp * burst;
  const jitter = (Math.random() - 0.5) * 2 * p.noise;
  return p.base + wave + jitter;
}

function draw() {
  if (!ctx) return;
  const p = PROFILES[current];
  t += 0.05;
  history.push(sample(p));
  history.shift();
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  // grid
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let y = 0; y < H; y += 22) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  // signal
  ctx.strokeStyle = "#c8f04a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  history.forEach((v, i) => {
    const x = (i / (history.length - 1)) * W;
    const y = H - Math.min(Math.max(v / 2.4, 0), 1) * (H - 16) - 8;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  requestAnimationFrame(draw);
}

function setBehavior(name) {
  current = name;
  const p = PROFILES[name];
  document.getElementById("current-behavior").textContent = name;
  document.getElementById("dominant-freq").textContent = p.freqLabel;
  document.getElementById("signal-energy").textContent = p.energy;
  document.getElementById("alert-state").textContent = p.alert;
  document.querySelectorAll("#behavior-buttons .btn").forEach((b) => {
    const active = b.dataset.behavior === name;
    b.classList.toggle("btn-primary", active);
    b.classList.toggle("btn-ghost", !active);
  });
}

document.querySelectorAll("#behavior-buttons .btn").forEach((b) => {
  b.addEventListener("click", () => setBehavior(b.dataset.behavior));
});

if (ctx) {
  setBehavior("ruminando");
  requestAnimationFrame(draw);
}
