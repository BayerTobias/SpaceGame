class MovableObject extends DrawableObject {
  offsetX = 0;
  offsetY = 0;

  currentImage = 0;
  deathAnmimationCurrentImage = 0;
  deathSoundPlayed;
  speed = 0.5 + Math.random() * 0.5;
  fps = 60;
  otherDirection = false;

  HP = 100;
  shield = 0;
  invincible = false;
  lastShot = new Date().getTime();
  cooldown = 350;

  lastHit;

  constructor() {
    super();
  }

  /**
   * Handles character movement based on keyboard input.
   */
  handleCharacterMovement() {
    if (keyboard.right) this.moveRight();
    if (keyboard.left) this.moveLeft();
    if (keyboard.up) this.moveUp();
    if (keyboard.down) this.moveDown();
    if (keyboard.space) this.shoot();
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the character up.
   */
  moveUp() {
    this.y -= this.speed;
  }

  /**
   * Moves the character down.
   */
  moveDown() {
    this.y += this.speed;
  }

  /**
   * Initiates a shooting action if the shot cooldown has passed.
   */
  shoot() {
    if (this.shotCooldown()) {
      this.world.playerShots.push(new PlayerProjectile(this));
      shootingSound.play();
      this.lastShot = new Date().getTime();
    }
  }

  /**
   * Initiates an enemy shooting action.
   */
  enemyShoot() {
    this.world.enemyShots.push(new EnemyProjectile(this));
    this.playEnemyShootingSound();
  }

  /**
   * Initiates an end boss shooting action.
   *
   * @param {number} x The x-coordinate where the shot spawns.
   * @param {number} y The y-coordinate where the shot spawns.
   */
  endBossShoot(x, y) {
    this.world.enemyShots.push(new EndBossProjectile(x, y));
    this.playEnemyShootingSound();
  }

  /**
   * Checks if the shot cooldown time has passed.
   *
   * @returns {boolean} Returns true if the cooldown time has passed, otherwise false.
   */
  shotCooldown() {
    const timePassed = new Date().getTime() - this.lastShot;

    return timePassed > this.cooldown;
  }

  /**
   * Checks if any movement key is currently pressed.
   *
   * @returns {boolean} Returns true if a movement key is pressed, otherwise false.
   */
  movementKeyIsPressed() {
    if (this.world && !this.world.level.character.isDead())
      if (this.world.keyboard.right || keyboard.up || keyboard.down || keyboard.left) {
        return true;
      }
  }

  /**
   * Checks if the shoot key is currently pressed.
   *
   * @returns {boolean} Returns true if the shoot key is pressed, otherwise false.
   */
  shootKeyIsPressed() {
    if (this.world && !this.world.level.character.isDead()) {
      if (keyboard.space) {
        return true;
      }
    }
  }

  /**
   * Animates the object using a sequence of images.
   *
   * @param {string[]} images - An array of image paths for the animation sequence.
   */
  animateImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation sequence using a set of images once.
   *
   * @param {string[]} images - An array of image paths for the animation sequence.
   */
  animateImagesOnce(images) {
    let i = this.deathAnmimationCurrentImage % images.length;
    if (this.deathAnmimationCurrentImage < images.length) {
      let path = images[i];
      this.img = this.imgCache[path];
      this.deathAnmimationCurrentImage++;
    }
  }

  /**
   * Checks if the object is colliding with another object.
   *
   * @param {Object} object - The other object to check for collision.
   * @returns {boolean} Returns true if the entity is colliding with the other object, otherwise false.
   */
  isColliding(object) {
    return (
      this.x + this.width - this.offsetX >= object.x + object.offsetX &&
      this.x + this.offsetX <= object.x + object.width - object.offsetX &&
      this.y + this.height - this.offsetY >= object.y + object.offsetY &&
      this.y + this.offsetY <= object.y + object.height - object.offsetY
    );
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} Returns true if the entity's HP is 0, otherwise false.
   */
  isDead() {
    return this.HP === 0;
  }

  /**
   * Checks if the object is hit and applies damage if not in the hurt state.
   */
  isHit() {
    if (!this.isHurt()) {
      if (this.shield > 0) {
        this.shield -= 20;
      } else this.HP -= 10;
      if (this.HP < 0) {
        this.HP = 0;
      } else {
        this, (this.lastHit = new Date().getTime());
      }
    }
  }

  /**
   * Checks if the object is invincible.
   *
   * @returns {boolean} Returns true if the object is invincible, otherwise false.
   */
  isInvincible() {
    return this.invincible;
  }

  /**
   * Kills the object by setting its HP and shield to 0.
   */
  kill() {
    this.HP = 0;
    this.shield = 0;
  }

  /**
   * Checks if the object is currently hurt (within the immune time period).
   *
   * @returns {boolean} Returns true if the object is hurt, otherwise false.
   */
  isHurt() {
    const timePassed = new Date().getTime() - this.lastHit;

    return timePassed < this.immuneTime;
  }

  /**
   * Checks if the object can be healed with a specific power-up type.
   *
   * @param {string} powerUpType - The type of power-up ("HP" or "shield").
   */
  isHealed(powerUpType) {
    if (this.HP < 100 && powerUpType === "HP") {
      this.HP += 10;
    }
    if (this.shield < 100 && powerUpType === "shield") {
      this.shield += 50;
    }
  }

  /**
   * Checks if the projectile is out of the map boundaries.
   *
   * @returns {boolean} Returns true if the projectile is out of the map boundaries, otherwise false.
   */
  projectileOutOfMap() {
    if (this instanceof PlayerProjectile) return this.x > this.shotFromX + 720;
    if (this instanceof EnemyProjectile) return this.x < this.shotFromX - 720;
    if (this instanceof Rocket) return this.y + this.height < 0;
  }

  /**
   * Checks if the object is visible within the canvas viewport.
   *
   * @returns {boolean} Returns true if the object is visible, otherwise false.
   */
  isVisableOnCanvas() {
    return (
      this.x + this.offsetX > this.world.camera_x &&
      this.x + this.width - this.offsetX < this.world.camera_x + 720
    );
  }

  /**
   * Plays the enemy shooting sound.
   */
  playEnemyShootingSound() {
    let clonedSound = enemyShootingSound.cloneNode();
    clonedSound.volume = enemyShootingSound.volume;
    clonedSound.muted = enemyShootingSound.muted;
    clonedSound.play();
  }

  /**
   * Plays the explosion sound.
   */
  playExplosionSound() {
    if (!this.deathSoundPlayed) {
      let clonedSound = explosionSound.cloneNode();
      clonedSound.volume = explosionSound.volume;
      clonedSound.muted = explosionSound.muted;
      clonedSound.play();
      this.deathSoundPlayed = true;
    }
  }
}
