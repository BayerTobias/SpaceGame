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
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.level.background);
    this.addObjectsToMap(this.level.mapElements);
    this.addObjectsToMap(this.level.powerUps);
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
    // object.drawImgBorder(this.ctx); //delete b4 game finished
    // object.drawHitBox(this.ctx); //delete b4 game finished

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

  startSidescroll() {
    if (this.camera_x < this.level.levelEnd_X) {
      this.camera_x += 1;
    }
  }

  checkCollisions() {
    let character = this.level.character;

    this.checkCharacterIsDead(character);
    this.checkCharacterIsCollidingWithEnemy(character);
    this.checkCharacterIsCollidingWithMap(character);
    this.checkPlayerProjectileCollisions();
    this.checkEnemyProjectileCollisions(character);
    this.checkPowerUpCollision(character);
  }

  checkCharacterIsDead(character) {
    if (character.isDead()) {
      setTimeout(() => {
        this.stopGame();
      }, 200);
    }
  }

  checkCharacterIsCollidingWithEnemy(character) {
    this.level.enemies.forEach((enemy) => {
      if (character.isColliding(enemy)) {
        character.isHit();
      }
    });
  }

  checkCharacterIsCollidingWithMap(character) {
    this.level.mapElements.forEach((element) => {
      if (character.isColliding(element)) {
        character.kill();
      }
    });
  }

  checkEnemyProjectileCollisions(character) {
    this.enemyShots.forEach((enemyShot, index) => {
      if (enemyShot.projectileOutOfMap()) {
        this.deleteEnemyShot(index);
      }
      if (enemyShot.isColliding(character)) {
        character.isHit();
        enemyShot.hasCollided = true;
      }
      if (enemyShot.animationFinished) {
        this.deleteEnemyShot(index);
      }
    });
  }

  checkPowerUpCollision(character) {
    this.level.powerUps.forEach((powerUp, index) => {
      if (powerUp.isColliding(character)) {
        character.isHealed(powerUp.type);
        this.deletePowerUp(index);
      }
    });
  }

  checkPlayerProjectileCollisions() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.playerShots.forEach((shot, shotIndex) => {
        if (shot.projectileOutOfMap()) () => this.deleteShot(shotIndex);

        if (this.enemyIsHit(shot, enemy)) {
          enemy.isHit();
          this.checkIfEnemyIsDead(enemy, enemyIndex);
          shot.speed = 0;
          shot.hasCollided = true;
        }
        this.checkAnimationIsFinished(shot, shotIndex);
      });
    });
  }

  checkIfEnemyIsDead(enemy, enemyIndex) {
    if (enemy.isDead()) {
      setTimeout(() => {
        this.deleteEnemy(enemyIndex);
      }, 200);
    }
  }

  checkAnimationIsFinished(shot, shotIndex) {
    if (shot.animationFinished) {
      this.deleteShot(shotIndex);
    }
  }

  enemyIsHit(shot, enemy) {
    return shot.isColliding(enemy) && !enemy.isDead() && !enemy.isInvincible();
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

  deletePowerUp(index) {
    this.level.powerUps.splice(index, 1);
  }

  setGlobalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.globalIntervals.push(id);
  }

  startGame() {
    initLevel();
    this.level = level1;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    document.getElementById("overlay").classList.add("d-none");

    this.setGlobalInterval(() => this.startSidescroll(), 1000 / 60);
    this.setGlobalInterval(() => this.checkCollisions(), 1000 / 60);
    soundTrack.play();
  }

  stopGame() {
    this.globalIntervals.forEach(clearInterval);
    this.level.enemies.forEach((enemy) => {
      enemy.stopLocalIntervals();
      if (enemy.exhaust) {
        enemy.exhaust.stopLocalIntervals();
      }
    });
    this.enemyShots.forEach((shot) => shot.stopLocalIntervals());
    this.playerShots.forEach((shot) => shot.stopLocalIntervals());
    soundTrack.pause();
  }
}
