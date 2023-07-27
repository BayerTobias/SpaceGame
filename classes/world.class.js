class World {
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    // this.startSidescroll();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.level.background);
    this.addObjectsToMap(this.level.mapElements);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.enemiesExhaust);
    this.addToMap(this.level.character);
    this.addToMap(this.level.playeExhaust);
    this.addObjectsToMap(this.level.gameInterface);
    this.ctx.translate(+this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.level.character.world = this;
    this.level.playeExhaust.world = this;
    this.level.background.world = this;
    this.level.enemiesExhaust.forEach((element) => {
      element.world = this;
    });
    this.level.gameInterface.forEach((element) => {
      element.world = this;
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);

    object.drawImgBorder(this.ctx); //delete b4 game finished
    object.drawHitBox(this.ctx); //delete b4 game finished

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  //this.level.levelEnd_X
  startSidescroll() {
    setInterval(() => {
      if (this.camera_x < 1060) {
        this.camera_x += 1;
      }
    }, 1000 / 60);
  }

  checkCollisions() {
    let character = this.level.character;
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (character.isColliding(enemy)) {
          character.isHit();

          console.log("DEAD", character.HP);
          character.isDead();
        }
      });
      this.level.mapElements.forEach((element) => {
        if (character.isColliding(element)) {
          character.kill();
          console.log("DEAD", character.HP);
        }
      });
    }, 100);
  }
}
