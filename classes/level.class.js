class Level {
  character;
  playeExhaust;
  enemies;
  enemiesExhaust;
  background;
  mapElements;
  levelEnd_X; //endboss x koordinate
  gameInterface;

  constructor(
    character,
    playeExhaust,
    enemies,
    enemiesExhaust,
    background,
    mapElements,
    gameInterface
  ) {
    this.character = character;
    this.playeExhaust = playeExhaust;
    this.enemies = enemies;
    this.enemiesExhaust = enemiesExhaust;
    this.background = background;
    this.mapElements = mapElements;
    this.gameInterface = gameInterface;
  }
}
