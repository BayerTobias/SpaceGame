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

  handleCharacterMovement() {
    if (keyboard.right) {
      this.moveRight();
    }
    if (keyboard.left) {
      this.moveLeft();
    }
    if (keyboard.up) {
      this.moveUp();
    }
    if (keyboard.down) {
      this.moveDown();
    }
    if (keyboard.space) {
      this.shoot();
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  shoot() {
    if (this.shotCooldown()) {
      this.world.playerShots.push(new PlayerProjectile(this));
      shootingSound.play();
      this.lastShot = new Date().getTime();
    }
  }

  enemyShoot() {
    this.world.enemyShots.push(new EnemyProjectile(this));
    this.playEnemyShootingSound();
  }

  endBossShoot(x, y) {
    this.world.enemyShots.push(new EndBossProjectile(x, y));
    this.playEnemyShootingSound();
  }

  shotCooldown() {
    const timePassed = new Date().getTime() - this.lastShot;

    return timePassed > this.cooldown;
  }

  movementKeyIsPressed() {
    if (this.world && !this.world.level.character.isDead())
      if (
        this.world.keyboard.right ||
        keyboard.up ||
        keyboard.down ||
        keyboard.left
      ) {
        return true;
      }
  }

  shootKeyIsPressed() {
    if (this.world && !this.world.level.character.isDead()) {
      if (keyboard.space) {
        return true;
      }
    }
  }

  animateImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  animateImagesOnce(images) {
    let i = this.deathAnmimationCurrentImage % images.length;
    if (this.deathAnmimationCurrentImage < images.length) {
      let path = images[i];
      this.img = this.imgCache[path];
      this.deathAnmimationCurrentImage++;
    }
  }

  isColliding(object) {
    return (
      this.x + this.width - this.offsetX >= object.x + object.offsetX &&
      this.x + this.offsetX <= object.x + object.width - object.offsetX &&
      this.y + this.height - this.offsetY >= object.y + object.offsetY &&
      this.y + this.offsetY <= object.y + object.height - object.offsetY
    );
  }

  isDead() {
    return this.HP === 0;
  }

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

  isInvincible() {
    return this.invincible;
  }

  kill() {
    this.HP = 0;
    this.shield = 0;
  }

  isHurt() {
    const timePassed = new Date().getTime() - this.lastHit;

    return timePassed < this.immuneTime;
  }

  isHealed(powerUpType) {
    if (this.HP < 100 && powerUpType === "HP") {
      this.HP += 10;
      console.log(powerUpType);
    }
    if (this.shield < 100 && powerUpType === "shield") {
      this.shield += 50;
    }
  }

  projectileOutOfMap() {
    if (this instanceof PlayerProjectile) {
      return this.x > this.shotFromX + 720;
    }
    if (this instanceof EnemyProjectile) {
      return this.x < this.shotFromX - 720;
    }
    if (this instanceof Rocket) {
      return this.y + this.height < 0;
    }
  }

  isVisableOnCanvas() {
    return (
      this.x + this.offsetX > this.world.camera_x &&
      this.x + this.width - this.offsetX < this.world.camera_x + 720
    );
  }

  playEnemyShootingSound() {
    let clonedSound = enemyShootingSound.cloneNode();
    clonedSound.volume = enemyShootingSound.volume;
    clonedSound.play();
  }

  playExplosionSound() {
    if (!this.deathSoundPlayed) {
      let clonedSound = explosionSound.cloneNode();
      clonedSound.volume = explosionSound.volume;
      clonedSound.play();
      this.deathSoundPlayed = true;
      console.log("played", clonedSound);
    }
  }
}
