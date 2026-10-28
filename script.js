const SERVER = philpolinetwork.minekeep.gg

function setStatus(type, text, info = "") {
  const badge = document.getElementById("status-badge");
  badge.className = "badge " + type;
  badge.textContent = text;
  document.getElementById("status-info").textContent = info;
}

async function ladeStatus() {
  try {
    const wartung = await fetch("status.json?" + Date.now()).then(r => r.json());
    if (wartung.maintenance) {
      setStatus("maintenance", "🛠 Wartungsmodus", wartung.message);
      return;
    }
    const data = await fetch(`https://api.mcsrvstat.us/3/${SERVER}`).then(r => r.json());
    if (data.online) {
      setStatus("online", "🟢 Online",
        `${data.players.online} / ${data.players.max} Spieler · Version ${data.version}`);
    } else {
      setStatus("offline", "🔴 Offline");
    }
  } catch (e) {
    setStatus("unknown", "Status nicht abrufbar");
  }
}

ladeStatus();
setInterval(ladeStatus, 60000); // jede Minute neu prüfen

document.getElementById("copy").addEventListener("click", () => {
  navigator.clipboard.writeText(document.getElementById("ip").textContent);
});