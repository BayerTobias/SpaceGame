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

  leftButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput("left", true);
  });
  leftButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput("left", false);
  });
  rightButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput("right", true);
  });
  rightButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput("right", false);
  });
  upButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput("up", true);
  });
  upButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput("up", false);
  });
  downButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput("down", true);
  });
  downButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput("down", false);
  });
  spaceButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleMobileInput("space", true);
  });
  spaceButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleMobileInput("space", false);
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
    soundTrack.muted = false;
  } else {
    soundTrack.muted = true;
  }
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
  img.src = "../el-pollo-loco/img/menue/volume-xmark-solid.svg";
}

function unmuteAllSounds(img) {
  allSounds.forEach((sound) => (sound.muted = false));
  muted = false;
  img.src = "../el-pollo-loco/img/menue/volume-high-solid.svg";
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
