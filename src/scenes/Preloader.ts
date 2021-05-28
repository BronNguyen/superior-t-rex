import MapKeys from "../const/MapKeys";
import Phaser from "phaser";
import SceneKeys from "../const/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }
  preload() {
    this.load.image("ground", "./assets/ground.png");
    this.load.image("enemy1", "./assets/cactuses_big_1.png");
    this.load.image("enemy2", "./assets/cactuses_big_2.png");
    this.load.image("enemy3", "./assets/cactuses_big_3.png");
    this.load.image("enemy4", "./assets/cactuses_small_1.png");
    this.load.image("enemy5", "./assets/cactuses_small_2.png");
    this.load.image("enemy6", "./assets/cactuses_small_3.png");
    this.load.image("cloud", "./assets/enemy-bird.png");
    this.load.image("heart", "./assets/heart.png");
    this.load.image("finishLine", "./assets/finish.png");
    this.load.image("paper", "./assets/paper.png");
    this.load.image("shoe", "./assets/shoe.png");
    this.load.image("shield", "./assets/shield.png");
    this.load.image("dinoIdle", "./assets/dino-idle.png");

    this.load.spritesheet("dinoHurt", "./assets/dino-hurt.png", {
      frameWidth: 80,
      frameHeight: 94,
    });

    this.load.spritesheet("dinoFun", "./assets/dino-fun.png", {
      frameWidth: 80,
      frameHeight: 86,
    });

    this.load.spritesheet("dinoRun", "./assets/dino-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet("dinoDuck", "./assets/dino-down.png", {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet("enemyBird", "./assets/enemy-bird.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.image("restart", "./assets/restart.png");
    this.load.image("gameOver", "./assets/game-over.png");

    // this.load.tilemapTiledJSON(MapKeys.Stage1, "./assets/stage1.json");
  }
  create() {
    this.scene.start(SceneKeys.Begin);
  }
}
