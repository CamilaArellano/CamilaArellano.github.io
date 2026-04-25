// ── Terminal typewriter ──
const termLines = [
  { text: "root@camila:~# whoami", cls: "cmd" },
  { text: "camila_arellano", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# cat skills.txt", cls: "cmd" },
  { text: "[+] Offensive Security", cls: "out" },
  { text: "[+] OSINT", cls: "out" },
  { text: "[+] Vulnerability Analysis", cls: "out" },
  { text: "[+] Linux Security", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# status", cls: "cmd" },
  { text: "> Monitoring threats...", cls: "cursor out" },
];

function typeTerminal(elementId, lines) {
  const el = document.getElementById(elementId);
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
    setTimeout(next, text === "" ? 80 : 360);
  }
  next();
}

// ── Live logs ──
const logLines = [
  { text: "[08:14:02] [INFO]    Monitoring traffic on wlan0mon...", cls: "log-info" },
  { text: "[08:14:09] [OK]      Firewall rules loaded. 142 entries.", cls: "log-ok" },
  { text: "[08:14:23] [WARNING] Suspicious beacon flood detected", cls: "log-warn" },
  { text: "[08:14:31] [ALERT]   Deauth attack → 192.168.1.54", cls: "log-alert" },
  { text: "[08:14:38] [OK]      Packet captured. Analysis pending.", cls: "log-ok" },
  { text: "[08:14:45] [INFO]    Waiting for next event...", cls: "log-info" },
];

function animateLogs(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let i = 0;
  function next() {
    if (i >= logLines.length) return;
    const { text, cls } = logLines[i];
    const span = document.createElement("span");
    span.className = cls;
    span.textContent = text;
    el.appendChild(span);
    el.appendChild(document.createElement("br"));
    i++;
    setTimeout(next, 700);
  }
  next();
}

// ── Active nav link ──
document.querySelectorAll(".nav a").forEach(link => {
  if (link.href === window.location.href) link.classList.add("active");
});

typeTerminal("terminal-output", termLines);
typeTerminal("terminal-about", termLines);
animateLogs("live-logs");