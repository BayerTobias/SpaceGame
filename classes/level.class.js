class Level {
  character;
  playeExhaust;
  enemies;
  background;
  mapElements;
  levelEnd_X; //endboss x koordinate
  gameInterface;

  constructor(
    character,
    playeExhaust,
    enemies,
    background,
    mapElements,
    gameInterface
  ) {
    this.character = character;
    this.playeExhaust = playeExhaust;
    this.enemies = enemies;
    this.background = background;
    this.mapElements = mapElements;
    this.gameInterface = gameInterface;
  }
}
