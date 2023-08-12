class StatusBar extends DrawableObject {
  x = 105;
  height = 7;
  width = 97;
  percentage = 100;
  images;

  constructor() {
    super();
  }

  /**
   * Sets the percentage value and updates the corresponding image.
   *
   * @param {number} percentage - The new percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  /**
   * Resolves the image index based on the current percentage.
   *
   * @returns {number} The resolved image index.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    else if (this.percentage > 80) return 4;
    else if (this.percentage > 60) return 3;
    else if (this.percentage > 40) return 2;
    else if (this.percentage > 20) return 1;
    else return 0;
  }
}
