class Level {
  character;
  playeExhaust;
  enemies;
  background;
  mapElements;
  powerUps;
  levelEnd_X = 1060;
  gameInterface;
  traps;

  constructor(
    character,
    playeExhaust,
    enemies,
    background,
    mapElements,
    powerUps,
    gameInterface,
    traps
  ) {
    this.character = character;
    this.playeExhaust = playeExhaust;
    this.enemies = enemies;
    this.background = background;
    this.mapElements = mapElements;
    this.powerUps = powerUps;
    this.gameInterface = gameInterface;
    this.traps = traps;
  }
}
