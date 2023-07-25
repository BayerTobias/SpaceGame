class Level {
  character;
  playeExhaust;
  enemies;
  enemiesExhaust;
  background;
  mapElements;
  levelEnd_X; //endboss x koordinate

  constructor(
    character,
    playeExhaust,
    enemies,
    enemiesExhaust,
    background,
    mapElements
  ) {
    this.character = character;
    this.playeExhaust = playeExhaust;
    this.enemies = enemies;
    this.enemiesExhaust = enemiesExhaust;
    this.background = background;
    this.mapElements = mapElements;
  }
}
