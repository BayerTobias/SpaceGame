let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  handleMobileInputs();
  checkIfLandscapeMode();
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

window.addEventListener("resize", () => checkIfLandscapeMode());

/**
 * Checks if the device is in landscape mode and displays an overlay message if necessary.
 */
function checkIfLandscapeMode() {
  const overlay = document.getElementById("rotate-phone-overlay");

  if (window.innerWidth < 730 && window.innerWidth < window.innerHeight)
    overlay.classList.remove("d-none");
  else overlay.classList.add("d-none");
}

/**
 * Handles mobile input buttons and sets event listeners.
 */
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

/**
 * Sets touch event listeners for mobile input buttons.
 *
 * @param {Element} button - The button element to attach the event listeners to.
 * @param {string} direction - The direction associated with the button (e.g., "left", "right", "up", "down", "space").
 */
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

/**
 * Handles a key press event and updates the keyboard state.
 *
 * @param {string} pressedKey - The code of the pressed key.
 * @param {string} keyCode - The code of the target key.
 * @param {string} keyboardKey - The corresponding keyboard key (e.g., "left", "right", "up", "down", "space").
 * @param {boolean} status - The status of the key (true for pressed, false for released).
 */
function handleKeyPress(pressedKey, keyCode, keyboardKey, status) {
  if (pressedKey === keyCode) {
    keyboard[keyboardKey] = status;
  }
}

/**
 * Handles mobile input and updates the keyboard state.
 *
 * @param {string} keyboardKey - The corresponding keyboard key (e.g., "left", "right", "up", "down", "space").
 * @param {boolean} status - The status of the key (true for pressed, false for released).
 */
function handleMobileInput(keyboardKey, status) {
  keyboard[keyboardKey] = status;
}

/**
 * Toggles the sound track between muted and unmuted states.
 */
function toggleSoundTrack() {
  if (soundTrack.muted) {
    ummuteSoundTrack();
  } else {
    muteSoundTrack();
  }
}

/**
 * Mutes the sound track and updates the mute button icon.
 */
function muteSoundTrack() {
  const img = document.getElementById("mute-background-sound-button").querySelector("img");

  soundTrack.muted = true;
  img.src = "../el-pollo-loco/img/menue/icons-bg-music-off.png";
}

/**
 * Unmutes the sound track and updates the mute button icon.
 */
function ummuteSoundTrack() {
  const img = document.getElementById("mute-background-sound-button").querySelector("img");

  soundTrack.muted = false;
  img.src = "../el-pollo-loco/img/menue/icons-bg-music-on.png";
}

/**
 * Toggles all sounds between muted and unmuted states.
 */
function toggleAllSounds() {
  const img = document.getElementById("mute-all-sounds-button").querySelector("img");

  if (!muted) {
    muteAllSounds(img);
  } else {
    unmuteAllSounds(img);
  }
}

/**
 * Mutes all sounds and updates the mute all sounds button icon.
 *
 * @param {HTMLImageElement} img - The <img> element of the mute all sounds button.
 */
function muteAllSounds(img) {
  allSounds.forEach((sound) => (sound.muted = true));
  muted = true;
  img.src = "../el-pollo-loco/img/menue/icons-sound-fx-off.png";
}

/**
 * Unmutes all sounds and updates the mute all sounds button icon.
 *
 * @param {HTMLImageElement} img - The <img> element of the mute all sounds button.
 */
function unmuteAllSounds(img) {
  allSounds.forEach((sound) => (sound.muted = false));
  muted = false;
  img.src = "../el-pollo-loco/img/menue/icons-sound-fx-on.png";
}

/**
 * Toggles fullscreen mode.
 */
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

/**
 * Enters fullscreen mode.
 *
 * @param {HTMLElement} container - The container element to enter fullscreen.
 * @param {HTMLCanvasElement} canvas - The canvas element to apply fullscreen class.
 * @param {HTMLImageElement} img - The <img> element of the fullscreen button.
 */
function enterFullscreen(container, canvas, img) {
  container.requestFullscreen();
  canvas.classList.add("fullscreen");
  img.src = "../el-pollo-loco/img/menue/compress-solid.svg";
}

/**
 * Exits fullscreen mode.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to remove fullscreen class.
 * @param {HTMLImageElement} img - The <img> element of the fullscreen button.
 */
function exitFullscreen(canvas, img) {
  document.exitFullscreen();
  canvas.classList.remove("fullscreen");
  img.src = "../el-pollo-loco/img/menue/expand-solid.svg";
}

/**
 * Shows the endscreen overlay with the specified content.
 *
 * @param {Function} callback - The callback function that returns the content for the endscreen.
 */
function showEndscreen(callback) {
  let endScreen = document.getElementById("game-over-overlay");
  endScreen.innerHTML = callback();
  endScreen.classList.remove("d-none");
  document.getElementById("mobile-overlay").classList.add("d-none");
}

/**
 * Toggles the visibility of the controls element.
 */
function toggleControls() {
  const controls = document.getElementById("controls");

  controls.classList.toggle("d-none");
}

/**
 * Toggles the visibility of the mobile overlay.
 */
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
