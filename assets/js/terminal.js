// ── Terminal typewriter ──
const termLines = [
  { text: "root@camila:~# whoami", cls: "cmd" },
  { text: "camila_arellano", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# cat focus.txt", cls: "cmd" },
  { text: "[+] Offensive Security", cls: "out" },
  { text: "[+] OSINT & Recon", cls: "out" },
  { text: "[+] Vulnerability Analysis", cls: "out" },
  { text: "[+] Linux Hardening", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# nmap -sV camila.dev", cls: "cmd" },
  { text: "PORT     STATE  SERVICE", cls: "out" },
  { text: "80/tcp   open   curiosity", cls: "out" },
  { text: "443/tcp  open   research", cls: "out" },
  { text: "22/tcp   open   persistence", cls: "out" },
  { text: "", cls: "" },
  { text: "root@camila:~# _", cls: "cursor cmd" },
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
    setTimeout(next, text === "" ? 80 : 320);
  }
  next();
}

// ── Live logs ──
const logLines = [
  { text: "[08:14:01] [INFO]  Interface wlan0mon UP", cls: "log-info" },
  { text: "[08:14:09] [OK]    Firewall rules loaded — 142 entries", cls: "log-ok" },
  { text: "[08:14:23] [WARN]  Beacon flood detected on CH6", cls: "log-warn" },
  { text: "[08:14:31] [ALERT] Deauth frames → target: 192.168.1.54", cls: "log-alert" },
  { text: "[08:14:38] [INFO]  Capturing handshake...", cls: "log-info" },
  { text: "[08:14:45] [OK]    EAPOL captured — writing to dump.pcap", cls: "log-ok" },
  { text: "[08:14:52] [INFO]  Awaiting next event...", cls: "log-info log-cursor" },
];

function animateLogs() {
  const el = document.getElementById("live-logs");
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
    setTimeout(next, 650);
  }
  next();
}

// ── Active nav link ──
document.querySelectorAll(".nav a").forEach(link => {
  if (link.href === window.location.href) link.classList.add("active");
});

typeTerminal("terminal-output", termLines);
typeTerminal("terminal-about", termLines);
animateLogs();