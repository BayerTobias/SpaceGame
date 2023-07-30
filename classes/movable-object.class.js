class MovableObject extends DrawableObject {
  offsetX = 0;
  offsetY = 0;

  currentImage = 0;
  speed = 0.5 + Math.random() * 0.5;
  fps = 60;
  otherDirection = false;

  HP = 100;
  shield = 0;
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
      this.world.playerShots.push(new Projectile(this));
      this.lastShot = new Date().getTime();
    }
  }

  shotCooldown() {
    const timePassed = new Date().getTime() - this.lastShot;

    return timePassed > this.cooldown;
  }

  movementKeyIsPressed() {
    if (
      (this.world && this.world.keyboard.right) ||
      keyboard.up ||
      keyboard.down ||
      keyboard.left
    ) {
      return true;
    }
  }

  shootKeyIsPressed() {
    if (keyboard.space) {
      return true;
    }
  }

  animateImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  animateImagesOnce(images) {
    let i = this.currentImage % images.length;
    if (this.currentImage < images.length) {
      let path = images[i];
      this.img = this.imgCache[path];
      this.currentImage++;
    }
  }

  // Bessere Formel zur Kollisionsberechnung (Genauer)
  isColliding(object) {
    return (
      this.x + this.width + this.offsetX >= object.x + object.offsetX &&
      this.x + this.offsetX <= object.x + object.width - object.offsetX &&
      this.y + this.height - this.offsetY >= object.y + object.offsetY &&
      this.y + this.offsetY <= object.y + object.height - object.offsetY
    );
  }

  isDead() {
    return this.HP === 0;
  }

  isHit() {
    if (!this.isHurt() || !(this instanceof Character)) {
      this.HP -= 10;
      if (this.HP < 0) {
        this.HP = 0;
      } else {
        this, (this.lastHit = new Date().getTime());
      }
    }
  }

  kill() {
    this.HP = 0;
  }

  isHurt() {
    const timePassed = new Date().getTime() - this.lastHit;

    return timePassed < 800;
  }
}
