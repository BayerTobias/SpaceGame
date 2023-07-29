let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
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

function handleKeyPress(pressedKey, keyCode, keybordKey, status) {
  if (pressedKey === keyCode) {
    keyboard[keybordKey] = status;
  }
}
