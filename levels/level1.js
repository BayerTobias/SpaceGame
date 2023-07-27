const level1 = new Level(
  new Character(),
  new playerExhaust(),
  [new EnemyShip(), new EnemyShip(), new EnemyShip(), new EndBoss()],
  [new enemyExhaust(0), new enemyExhaust(1), new enemyExhaust(2)],
  new Background(),
  [new MapElement(500, 420, 60, 60)],
  [new HUD(), new ShieldBar(), new HpBar()]
);
