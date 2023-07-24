class World {
  character = new Character();
  playeExhaust = new playerExhaust();
  enemies = [new EnemyShip(), new EnemyShip(), new EnemyShip()];
  enemiesExhaust = [
    new enemyExhaust(0),
    new enemyExhaust(1),
    new enemyExhaust(2),
  ];
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
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.enemiesExhaust);
    this.addToMap(this.character);
    this.addToMap(this.playeExhaust);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.character.world = this;
    this.playeExhaust.world = this;
    this.enemiesExhaust.forEach((element) => {
      element.world = this;
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.ctx.save();
      this.ctx.translate(object.width, 0);
      this.ctx.scale(-1, 1);
      object.x = object.x * -1;
    }
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height
    );
    if (object.otherDirection) {
      object.x = object.x * -1;
      this.ctx.restore();
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }
}
