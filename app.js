/*
 * Personalize this small block, then save. No server or database is used.
 */
const copy = {
  recipient: "you",
  intro: "I’m sorry for the hurt I caused. I wish I had handled things with more care.",
  detail:
    "I know a few words cannot undo anything. I just want to own my part, listen properly, and let my actions be kinder from here.",
  signature: "With a very sorry heart, — Your name",
  returnNotes: [
    "A small hello from me: I’m still sorry, and I’m still trying to do better.",
    "The apology is still here—quietly, sincerely, and without a timer.",
    "A tiny reminder: you do not owe me a reply. I just want you to know I mean this.",
    "I packed this page with soft colors because I hope your day feels a little softer, too.",
  ],
};

const byId = (id) => document.getElementById(id);

byId("recipient-name").textContent = copy.recipient;
byId("intro-copy").textContent = copy.intro;
byId("detail-copy").textContent = copy.detail;
byId("signature-copy").textContent = copy.signature;

const visitKey = "tiny-sorry-note-visits";
let visitCount = 0;

try {
  visitCount = Number(window.localStorage.getItem(visitKey)) || 0;
  window.localStorage.setItem(visitKey, String(visitCount + 1));
} catch {
  // The page still works if storage is blocked by the browser.
}

const returnNote = copy.returnNotes[visitCount % copy.returnNotes.length];
byId("return-copy").textContent =
  visitCount === 0 ? `P.S. ${returnNote}` : `A new little note for visit ${visitCount + 1}: ${returnNote}`;

const heartLayer = document.querySelector(".floating-hearts");
const heartColors = ["#ec7898", "#c899e6", "#f3ae7f", "#e95b84"];

for (let index = 0; index < 10; index += 1) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = index % 3 === 0 ? "✦" : "♥";
  heart.style.setProperty("--left", `${5 + Math.random() * 90}%`);
  heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  heart.style.setProperty("--size", `${15 + Math.random() * 16}px`);
  heart.style.setProperty("--duration", `${10 + Math.random() * 9}s`);
  heart.style.setProperty("--delay", `${-Math.random() * 18}s`);
  heart.style.setProperty("--color", heartColors[index % heartColors.length]);
  heartLayer.appendChild(heart);
}

function sendHeartBurst() {
  const totalHearts = 17;

  for (let index = 0; index < totalHearts; index += 1) {
    const heart = document.createElement("span");
    const angle = (Math.PI * 2 * index) / totalHearts + (Math.random() - 0.5) * 0.35;
    const distance = 72 + Math.random() * 150;

    heart.className = "burst-heart";
    heart.textContent = index % 4 === 0 ? "✦" : "♥";
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--rotation", `${-40 + Math.random() * 80}deg`);
    heart.style.setProperty("--size", `${14 + Math.random() * 15}px`);
    heart.style.setProperty("--color", heartColors[index % heartColors.length]);

    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }

  byId("response").textContent = "A tiny heart has been sent. I mean it.";
}

byId("heart-button").addEventListener("click", sendHeartBurst);

byId("space-button").addEventListener("click", () => {
  const isQuiet = document.body.classList.toggle("quiet");
  byId("space-button").textContent = isQuiet ? "Quiet mode is on" : "I need a little space";
  byId("response").textContent = isQuiet
    ? "Of course. There is no timer and no expectation."
    : "The little animations are back, gently.";
});
