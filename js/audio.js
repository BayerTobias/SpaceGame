let allSounds = [];
let muted = false;

let shootingSound = new Audio("./audio/laser-shot.mp3");
shootingSound.volume = 0.1;
allSounds.push(shootingSound);

let enemyShootingSound = new Audio("./audio/enemy-laser.mp3");
enemyShootingSound.volume = 0.3;
allSounds.push(enemyShootingSound);

let flyingSound = new Audio("./audio/rocket-trust.mp3");
flyingSound.volume = 0.7;
allSounds.push(flyingSound);

let explosionSound = new Audio("./audio/explosion.mp3");
explosionSound.volume = 0.3;
allSounds.push(explosionSound);

let soundTrack = new Audio("./audio/soundrack1.mp3");
soundTrack.loop = true;
soundTrack.volume = 0.1;
allSounds.push(soundTrack);

let endBossIntroductionSound = new Audio("./audio/endboss-sound.mp3");
endBossIntroductionSound.volume = 0.8;
allSounds.push(endBossIntroductionSound);

let endBossLaserExplosionSound = new Audio("./audio/endboss-laser-explosion.mp3");
endBossLaserExplosionSound.volume = 0.5;
allSounds.push(endBossLaserExplosionSound);

let endBossDeathSound = new Audio("./audio/endboss-death-sound.mp3");
endBossDeathSound.volume = 0.3;
allSounds.push(endBossDeathSound);
