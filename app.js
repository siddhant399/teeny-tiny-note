/*
 * Personalize this small block, then save. No server or database is used.
 */
const copy = {
  recipient: "you",
  intro: "Tiny peace potato for you. 🥔",
  signature: "— your little goober",
  returnNotes: [
    "a polite pigeon brought snacks.",
    "emergency confetti: deployed.",
    "tiny truce flag: waving.",
    "peace cookie has arrived.",
    "soft vibes, no pressure.",
  ],
};

const byId = (id) => document.getElementById(id);

byId("recipient-name").textContent = copy.recipient;
byId("intro-copy").textContent = copy.intro;
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
byId("return-copy").textContent = `goofy status: ${returnNote}`;

const heartLayer = document.querySelector(".floating-hearts");
const heartColors = ["#ec7898", "#c899e6", "#f3ae7f", "#e95b84"];
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

for (let index = 0; index < 10; index += 1) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♥", "✦", "☁", "✿"][index % 4];
  heart.style.setProperty("--left", `${5 + Math.random() * 90}%`);
  heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  heart.style.setProperty("--size", `${15 + Math.random() * 16}px`);
  heart.style.setProperty("--duration", `${10 + Math.random() * 9}s`);
  heart.style.setProperty("--delay", `${-Math.random() * 18}s`);
  heart.style.setProperty("--color", heartColors[index % heartColors.length]);
  heartLayer.appendChild(heart);
}

function launchBurst(symbols, total = 17) {
  for (let index = 0; index < total; index += 1) {
    const heart = document.createElement("span");
    const angle = (Math.PI * 2 * index) / total + (Math.random() - 0.5) * 0.35;
    const distance = 72 + Math.random() * 150;

    heart.className = "burst-heart";
    heart.textContent = randomFrom(symbols);
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--rotation", `${-40 + Math.random() * 80}deg`);
    heart.style.setProperty("--size", `${14 + Math.random() * 15}px`);
    heart.style.setProperty("--color", heartColors[index % heartColors.length]);

    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

function sendHeartBurst() {
  launchBurst(["♥", "♥", "✦", "♡"], 22);
  byId("response").textContent = randomFrom([
    "zoom! heart rocket deployed.",
    "plonk. a heart bonked the sky.",
    "tiny love missile: launched.",
  ]);
}

byId("heart-button").addEventListener("click", sendHeartBurst);

const goofFaces = ["🥴", "🫠", "🤹", "🪿", "👾", "🫧"];
const goofButton = byId("goof-button");
const goofFace = goofButton.querySelector(".goof-orb__face");

goofButton.addEventListener("click", () => {
  goofFace.textContent = randomFrom(goofFaces);
  goofButton.classList.remove("is-booped");
  void goofButton.offsetWidth;
  goofButton.classList.add("is-booped");
  launchBurst(["✦", "★", "●", "☁"], 14);
  byId("response").textContent = randomFrom([
    "blorb has been successfully booped.",
    "sproing! excellent boop work.",
    "the goofball is feeling sparkly.",
  ]);
});

goofButton.addEventListener("animationend", (event) => {
  if (event.animationName === "boop") {
    goofButton.classList.remove("is-booped");
  }
});

byId("space-button").addEventListener("click", () => {
  const isQuiet = document.body.classList.toggle("quiet");
  byId("space-button").textContent = isQuiet ? "Wiggles paused" : "Shhh, pause wiggles";
  byId("response").textContent = isQuiet
    ? "the chaos has been gently put in a jar."
    : "jar opened. mild chaos resumes.";
});
