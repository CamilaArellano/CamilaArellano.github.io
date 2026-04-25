// TERMINAL
const termLines = [
  { text: "root@camila:~# whoami", cls: "cmd" },
  { text: "camila_arellano", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# status", cls: "cmd" },
  { text: "> Monitoring threats...", cls: "cursor out" },
];

function typeTerminal(id, lines) {
  const el = document.getElementById(id);
  if (!el) return;

  let i = 0;

  function next() {
    if (i >= lines.length) return;

    const { text, cls } = lines[i];
    const span = document.createElement("span");

    if (cls) span.className = cls;
    span.innerHTML = text || "&nbsp;";

    el.appendChild(span);
    el.appendChild(document.createElement("br"));

    i++;
    setTimeout(next, 300);
  }

  next();
}

typeTerminal("terminal-output", termLines);

// LOGS
const logs = [
  "[INFO] Monitoring wlan0...",
  "[OK] Firewall active",
  "[WARN] Suspicious traffic",
  "[ALERT] Deauth attack detected",
];

function animateLogs() {
  const el = document.getElementById("live-logs");
  if (!el) return;

  let i = 0;

  function next() {
    if (i >= logs.length) return;

    el.innerHTML += logs[i] + "\n";
    i++;
    setTimeout(next, 600);
  }

  next();
}

animateLogs();