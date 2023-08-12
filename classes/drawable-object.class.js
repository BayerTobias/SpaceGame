class DrawableObject {
  x = 100;
  y = 200;
  height = 100;
  width = 100;
  img;
  imgCache = {};
  world;

  localIntervals = [];

  constructor() {}

  /**
   *
   * loads an img
   *
   * @param {string} path of the img
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * loads more then one image and stores it in the imgCache JSON
   *
   * @param {array} array of all img paths
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**
   * draws an image on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * checks if the object is an instance of EnemyShip class.
   *
   * @returns {boolean} returns true if the object is an instance of EnemyShip, otherwise false.
   */
  checkIfEnemyShip() {
    return this instanceof EnemyShip;
  }

  /**
   * sets a local interval that repeatedly calls the specified callback function with a fixed time delay.
   *
   * @param {function} callback - The function to be executed at each interval.
   * @param {number} time - The time interval in milliseconds between each execution of the callback function.
   */
  setLocalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.localIntervals.push(id);
  }

  /**
   * stops all local intervals
   */
  stopLocalIntervals() {
    this.localIntervals.forEach(clearInterval);
  }

  /**
   * sets a global interval that repeatedly calls the specified callback function with a fixed time delay.
   *
   * @param {function} callback - The function to be executed at each interval.
   * @param {number} time - The time interval in milliseconds between each execution of the callback function.
   */
  setGlobalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.world.globalIntervals.push(id);
  }
}
