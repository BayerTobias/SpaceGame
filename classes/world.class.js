class World {
  character = new Character();
  playeExhaust = new Exhaust();
  enemies = [new EnemyShip(), new EnemyShip(), new EnemyShip()];
  background = [new Background()];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.background);
    this.addToMap(this.character);
    this.addToMap(this.playeExhaust);
    this.addObjectsToMap(this.enemies);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.character.world = this;
    this.playeExhaust.world = this;
  }

  addToMap(object) {
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height
    );
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }
}
