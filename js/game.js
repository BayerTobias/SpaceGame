let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.right = true;
  }
  console.log(event);
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.right = false;
  }
  console.log(event);
});
