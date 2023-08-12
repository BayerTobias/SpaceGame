class World {
  level = level1;

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

  /**
   * Draws the game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.level.background);
    this.addObjectsToMap(this.level.mapElements);
    this.addObjectsToMap(this.level.powerUps);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.traps);
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

  /**
   * Sets the world reference for various game elements.
   */
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
    this.level.traps.forEach((element) => {
      element.world = this;
    });
  }

  /**
   * Adds an object to the canvas map, considering the possibility of flipping the image.
   *
   * @param {Object} object - The object to be added to the canvas map.
   */
  addToMap(object) {
    if (object.otherDirection) this.flipImage(object);
    object.draw(this.ctx);
    if (object.otherDirection) this.flipImageBack(object);
  }

  /**
   * Flips the image of an object horizontally.
   *
   * @param {Object} object - The object whose image needs to be flipped.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Restores the original orientation of the object's image after flipping.
   *
   * @param {Object} object - The object whose image orientation needs to be restored.
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  /**
   * Adds a list of objects to the canvas map, considering potential exhaust objects.
   *
   * @param {Array} objects - The list of objects to be added to the canvas map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
      if (object.checkIfEnemyShip()) {
        this.addToMap(object.exhaust);
      }
    });
  }

  /**
   * Initiates the sidescrolling effect by updating the camera position.
   */
  startSidescroll() {
    if (this.camera_x < this.level.levelEnd_X) {
      this.camera_x += 1;
    }
  }

  /**
   * Checks for various collisions involving the game elements.
   */
  checkCollisions() {
    let character = this.level.character;

    this.checkCharacterIsDead(character);
    this.checkCharacterIsCollidingWithEnemy(character);
    this.checkCharacterIsCollidingWithMap(character);
    this.checkPlayerProjectileCollisions();
    this.checkEnemyProjectileCollisions(character);
    this.checkPowerUpCollision(character);
  }

  /**
   * Checks if the character is dead and takes appropriate action.
   *
   * @param {Object} character - The character object to check.
   */
  checkCharacterIsDead(character) {
    if (character.isDead()) {
      setTimeout(() => {
        this.stopGame();
        showEndscreen(getDefeatHTML);
      }, 200);
    }
  }

  /**
   * Checks if the character is colliding with any enemy and handles the collision.
   *
   * @param {Object} character - The character object to check for collisions.
   */
  checkCharacterIsCollidingWithEnemy(character) {
    this.level.enemies.forEach((enemy) => {
      if (character.isColliding(enemy)) {
        character.isHit();
      }
    });
  }

  /**
   * Checks if the character is colliding with any map element and handles the collision.
   *
   * @param {Object} character - The character object to check for collisions.
   */
  checkCharacterIsCollidingWithMap(character) {
    this.level.mapElements.forEach((element) => {
      if (character.isColliding(element)) {
        character.kill();
      }
    });
  }

  /**
   * Checks for collisions involving enemy projectiles and the character.
   *
   * @param {Object} character - The character object to check for collisions.
   */
  checkEnemyProjectileCollisions(character) {
    this.enemyShots.forEach((enemyShot, index) => {
      if (enemyShot.projectileOutOfMap()) this.deleteEnemyShot(index);
      if (enemyShot.isColliding(character)) this.handleEnemyProjectileHit(character, enemyShot);
      if (enemyShot.animationFinished) this.deleteEnemyShot(index);
    });
  }

  /**
   * Handles a collision between an enemy projectile and the character.
   *
   * @param {Object} character - The character object that was hit.
   * @param {Object} enemyShot - The enemy projectile that hit the character.
   */
  handleEnemyProjectileHit(character, enemyShot) {
    character.isHit();
    enemyShot.hasCollided = true;
  }

  /**
   * Checks for collisions involving power-ups and the character.
   *
   * @param {Object} character - The character object to check for collisions.
   */
  checkPowerUpCollision(character) {
    this.level.powerUps.forEach((powerUp, index) => {
      if (powerUp.isColliding(character)) {
        character.isHealed(powerUp.type);
        this.deletePowerUp(index);
      }
    });
  }

  /**
   * Checks for collisions involving player projectiles and enemies.
   */
  checkPlayerProjectileCollisions() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.playerShots.forEach((shot, shotIndex) => {
        if (shot.projectileOutOfMap()) this.deleteShot(shotIndex);
        if (this.enemyIsHit(shot, enemy)) this.shotHasHit(shot, enemy, enemyIndex);
        this.checkAnimationIsFinished(shot, shotIndex);
      });
    });
  }

  /**
   * Checks if an enemy is dead and takes appropriate action.
   *
   * @param {Object} enemy - The enemy object to check.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  checkIfEnemyIsDead(enemy, enemyIndex) {
    if (enemy.isDead()) {
      setTimeout(() => {
        this.deleteEnemy(enemyIndex);
      }, 200);
    }
  }

  /**
   * Handles the effects of a player shot hitting an enemy.
   *
   * @param {Object} shot - The player shot that hit the enemy.
   * @param {Object} enemy - The enemy that was hit.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  shotHasHit(shot, enemy, enemyIndex) {
    if (!shot.hasCollided) {
      enemy.isHit();
      this.checkIfEnemyIsDead(enemy, enemyIndex);
      shot.speed = 0;
      shot.hasCollided = true;
    }
  }

  /**
   * Checks if a shot's animation is finished and takes appropriate action.
   *
   * @param {Object} shot - The shot object to check.
   * @param {number} shotIndex - The index of the shot in the playerShots array.
   */
  checkAnimationIsFinished(shot, shotIndex) {
    if (shot.animationFinished) {
      this.deleteShot(shotIndex);
    }
  }

  /**
   * Checks if an enemy is hit by a shot and meets the necessary conditions.
   *
   * @param {Object} shot - The shot object to check.
   * @param {Object} enemy - The enemy object to check against.
   * @returns {boolean} - True if the enemy is hit and meets conditions, otherwise false.
   */
  enemyIsHit(shot, enemy) {
    return shot.isColliding(enemy) && !enemy.isDead() && !enemy.isInvincible();
  }

  /**
   * Deletes a player shot from the playerShots array.
   *
   * @param {number} index - The index of the player shot to delete.
   */
  deleteShot(index) {
    this.playerShots.splice(index, 1);
  }

  /**
   * Deletes an enemy shot from the enemyShots array.
   *
   * @param {number} index - The index of the enemy shot to delete.
   */
  deleteEnemyShot(index) {
    this.enemyShots.splice(index, 1);
  }

  /**
   * Deletes an enemy from the enemies array in the current level.
   *
   * @param {number} index - The index of the enemy to delete.
   */
  deleteEnemy(index) {
    this.level.enemies.splice(index, 1);
  }

  /**
   * Deletes a power-up from the powerUps array in the current level.
   *
   * @param {number} index - The index of the power-up to delete.
   */
  deletePowerUp(index) {
    this.level.powerUps.splice(index, 1);
  }

  /**
   * Sets a global interval for executing a callback function at a specified time interval.
   *
   * @param {function} callback - The callback function to be executed.
   * @param {number} time - The time interval in milliseconds.
   */
  setGlobalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.globalIntervals.push(id);
  }

  /**
   * Starts the game by initializing various game elements and setting up intervals.
   */
  startGame() {
    this.camera_x = 0;
    this.resetWord();
    initLevel();
    this.level = level1;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.hideOverlays();

    this.setGlobalInterval(() => this.startSidescroll(), 1000 / 60);
    this.setGlobalInterval(() => this.checkCollisions(), 1000 / 60);
    soundTrack.play();
  }

  /**
   * Hides specific game overlays.
   */
  hideOverlays() {
    document.getElementById("overlay").classList.add("d-none");
    document.getElementById("game-over-overlay").classList.add("d-none");
  }

  /**
   * Resets the world state by clearing enemyShots and playerShots arrays.
   */
  resetWord() {
    this.enemyShots = [];
    this.playerShots = [];
  }

  /**
   * Stops the game by clearing intervals and pausing sounds.
   */
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
    flyingSound.pause();
  }
}
