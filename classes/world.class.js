class World {
  level = level1;

  traps = [new RocketSilo()];

  playerShots = [];
  enemyShots = [];

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  globalIntervals = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();

    // this.setGlobalInterval(() => this.startSidescroll(), 1000 / 60);
    this.setGlobalInterval(() => this.checkCollisions(), 1000 / 60);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.level.background);
    this.addObjectsToMap(this.level.mapElements);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.traps);
    this.addToMap(this.level.character);
    this.addToMap(this.level.playeExhaust);
    this.addObjectsToMap(this.playerShots);
    this.addObjectsToMap(this.enemyShots);
    this.ctx.translate(+this.camera_x, 0);
    this.addObjectsToMap(this.level.gameInterface);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.level.character.world = this;
    this.level.playeExhaust.world = this;
    this.level.background.world = this;
    this.level.gameInterface.forEach((element) => {
      element.world = this;
    });
    this.level.enemies.forEach((element) => {
      element.world = this;
    });
    this.traps.forEach((element) => {
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
      if (object.checkIfEnemyShip()) {
        this.addToMap(object.exhaust);
      }
    });
  }

  //this.level.levelEnd_X
  startSidescroll() {
    if (this.camera_x < 1060) {
      this.camera_x += 1;
    }
  }

  checkCollisions() {
    let character = this.level.character;

    this.level.enemies.forEach((enemy) => {
      if (character.isColliding(enemy)) {
        character.isHit();
      }
    });
    this.level.mapElements.forEach((element) => {
      if (character.isColliding(element)) {
        character.kill();
      }
    });

    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.playerShots.forEach((shot, shotIndex) => {
        if (shot.projectileOutOfMap()) {
          this.deleteShot(shotIndex);
        }

        if (shot.isColliding(enemy) && !enemy.isDead()) {
          enemy.isHit();
          if (enemy.isDead()) {
            setTimeout(() => {
              this.deleteEnemy(enemyIndex);
            }, 200);
          }
          shot.speed = 0;
          shot.hasCollided = true;
          // if(shot.hasCollided){
          //   this.deleteShot(shotIndex)
          // }

          this.deleteShot(shotIndex);
        }
      });
    });

    this.enemyShots.forEach((enemyShot, index) => {
      if (enemyShot.projectileOutOfMap()) {
        this.deleteEnemyShot(index);
      }
      if (enemyShot.isColliding(character)) {
        character.isHit();
        this.deleteEnemyShot(index);
      }
      if (enemyShot.hasCollided) {
        // enemyShot.stopLocalIntervals();
        this.deleteEnemyShot(index);
      }
    });
  }

  deleteShot(index) {
    this.playerShots.splice(index, 1);
  }

  deleteEnemyShot(index) {
    this.enemyShots.splice(index, 1);
  }

  deleteEnemy(index) {
    this.level.enemies.splice(index, 1);
  }

  setGlobalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.globalIntervals.push(id);
  }

  stopGame() {
    this.globalIntervals.forEach(clearInterval);
  }
}
