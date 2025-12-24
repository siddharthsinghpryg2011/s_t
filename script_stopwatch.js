let name_you = localStorage.getItem("namer");
let music_naam = localStorage.getItem("music_name");

/* -------- NAME (ASK EVERY TIME) -------- */
let userName = prompt("Enter your name:");

if (userName !== null && userName.trim() !== "") {
  // User entered a valid name
  name_you = userName;
  localStorage.setItem("namer", name_you);
}

// Show name from localStorage if input was empty or cancelled
document.getElementById("username").textContent =
  name_you ? `Hi, ${name_you}` : "";

/* -------- YOUTUBE LINK (ASK + SAVE EVERY TIME) -------- */
let ytLink = prompt("Enter YouTube music link:");
if (ytLink !== null && userName.trim() !== "") {
  music_naam = ytLink;
  localStorage.setItem("music_name", music_naam);
}

let videoId = ytLink
  ? ytLink.split("/").pop().split("?")[0]
  : music_naam.split("/").pop().split("?")[0];

/* -------- STOPWATCH -------- */
let startTime = 0;
let elapsed = 0;
let timer = null;
let running = false;

const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("second");
const startPause = document.getElementById("startPause");

function update(ms) {
  let t = Math.floor(ms / 1000);
  h.textContent = String(Math.floor(t / 3600)).padStart(2, "0");
  m.textContent = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  s.textContent = String(t % 60).padStart(2, "0");
}

startPause.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      update(elapsed);
    }, 50);
    running = true;
    startPause.textContent = "⏸";
  } else {
    clearInterval(timer);
    running = false;
    startPause.textContent = "▶";
  }
};

document.getElementById("reset").onclick = () => {
  clearInterval(timer);
  elapsed = 0;
  update(0);
  running = false;
  startPause.textContent = "▶";
};

/* -------- RANDOM BACKGROUND -------- */
let bg = Math.floor(Math.random() * 14);
document.body.style.backgroundImage =
  `url(images/background${bg}.jpg)`;

/* -------- YOUTUBE AUDIO -------- */
let player;
let muted = false;
let playing = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videoId,
    playerVars: { autoplay: 0, controls: 0 }
  });
}

/* PLAY / PAUSE TOGGLE */
document.getElementById("music").onclick = () => {
  if (!player) return;
  playing ? player.pauseVideo() : player.playVideo();
  playing = !playing;
};

/* MUTE TOGGLE */
document.getElementById("mute").onclick = () => {
  if (!player) return;
  muted ? player.unMute() : player.mute();
  muted = !muted;
  mute.textContent = muted ? "🔇" : "🔊";
};


