let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  handleMobileInputs();
}

window.addEventListener("keydown", (event) => {
  handleKeyPress(event.code, "ArrowRight", "right", true);
  handleKeyPress(event.code, "ArrowLeft", "left", true);
  handleKeyPress(event.code, "ArrowDown", "down", true);
  handleKeyPress(event.code, "ArrowUp", "up", true);
  handleKeyPress(event.code, "Space", "space", true);
});

window.addEventListener("keyup", (event) => {
  handleKeyPress(event.code, "ArrowRight", "right", false);
  handleKeyPress(event.code, "ArrowLeft", "left", false);
  handleKeyPress(event.code, "ArrowDown", "down", false);
  handleKeyPress(event.code, "ArrowUp", "up", false);
  handleKeyPress(event.code, "Space", "space", false);
});

function handleMobileInputs() {
  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");
  const upButton = document.getElementById("up");
  const downButton = document.getElementById("down");
  const spaceButton = document.getElementById("space");

  setEventListener(leftButton, "left");
  setEventListener(rightButton, "right");
  setEventListener(upButton, "up");
  setEventListener(downButton, "down");
  setEventListener(spaceButton, "space");
}

function setEventListener(button, direction) {
  button.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput(direction, true);
  });

  button.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput(direction, false);
  });
}

function handleKeyPress(pressedKey, keyCode, keyboardKey, status) {
  if (pressedKey === keyCode) {
    keyboard[keyboardKey] = status;
  }
}

function handleMobileInput(keyboardKey, status) {
  keyboard[keyboardKey] = status;
}

function toggleSoundTrack() {
  if (soundTrack.muted) {
    ummuteSoundTrack();
  } else {
    muteSoundTrack();
  }
}

function muteSoundTrack() {
  const img = document
    .getElementById("mute-background-sound-button")
    .querySelector("img");

  soundTrack.muted = true;
  img.src = "../el-pollo-loco/img/menue/icons-bg-music-off.png";
}

function ummuteSoundTrack() {
  const img = document
    .getElementById("mute-background-sound-button")
    .querySelector("img");

  soundTrack.muted = false;
  img.src = "../el-pollo-loco/img/menue/icons-bg-music-on.png";
}

function toggleAllSounds() {
  const img = document.getElementById("mute-all-sounds-button").querySelector("img");

  if (!muted) {
    muteAllSounds(img);
  } else {
    unmuteAllSounds(img);
  }
}

function muteAllSounds(img) {
  allSounds.forEach((sound) => (sound.muted = true));
  muted = true;
  img.src = "../el-pollo-loco/img/menue/icons-sound-fx-off.png";
}

function unmuteAllSounds(img) {
  allSounds.forEach((sound) => (sound.muted = false));
  muted = false;
  img.src = "../el-pollo-loco/img/menue/icons-sound-fx-on.png";
}

function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  const container = document.getElementById("container");
  const img = document.getElementById("full-screen-button").querySelector("img");

  if (!document.fullscreenElement) {
    enterFullscreen(container, canvas, img);
  } else {
    exitFullscreen(canvas, img);
  }
}

function enterFullscreen(container, canvas, img) {
  container.requestFullscreen();
  canvas.classList.add("fullscreen");
  img.src = "../el-pollo-loco/img/menue/compress-solid.svg";
}

function exitFullscreen(canvas, img) {
  document.exitFullscreen();
  canvas.classList.remove("fullscreen");
  img.src = "../el-pollo-loco/img/menue/expand-solid.svg";
}

function showEndscreen(callback) {
  let endScreen = document.getElementById("game-over-overlay");
  endScreen.innerHTML = callback();
  endScreen.classList.remove("d-none");
  document.getElementById("mobile-overlay").classList.add("d-none");
}

function toggleControls() {
  const controls = document.getElementById("controls");

  controls.classList.toggle("d-none");
}

function toggleMobileOverlay() {
  const mobileOverlay = document.getElementById("mobile-overlay");

  if (!mobileOverlay.checkVisibility()) {
    mobileOverlay.classList.remove("d-none");
    mobileOverlay.style = "display: flex;";
  } else {
    mobileOverlay.classList.add("d-none");
    mobileOverlay.style = "";
  }
}
