let canvas;
let ctx;
let character = new Image();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  character.src = "img/player-ship/Ship3.png";
  ctx.drawImage(character, 450, 500, 128, 128);
}
