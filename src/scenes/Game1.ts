import Dino from "../GameObject/Dino";
import Phaser, { Physics } from "phaser";
import SceneKeys from "../const/SceneKeys";
import { cyanDino, mintDino, blackDino, orangeDino } from "../const/DinoType";
import { GameStatus } from "../const/GameStatus";
import Enemy from "../GameObject/Enemy";
import { enemyTypes } from "../const/EnemyType";

export default class Game1 extends Phaser.Scene {
  private player!: Dino;
  private playerColor!: string;
  enemies!: Phaser.GameObjects.Group;
  private trackLength = 20000;
  gameStatus = GameStatus.Ready;
  private dinoGroup;
  constructor() {
    super(SceneKeys.Game1);
  }

  init(data) {
    this.playerColor = data.name;
    this.enemies = this.physics.add.group();
  }

  create() {
    const width = this.game.config.width;
    const height = this.game.config.height;
    this.dinosInitiation();
    this.setDinoProperties(width,height);
    //set world Bounds
    this.physics.world.setBounds(
      0,
      0,
      this.trackLength,
      <number>this.game.canvas.height
    );
    this.enemyInitiation();
  }

  setDinoProperties(width, height) {
    (<Dino[]>this.dinoGroup.getChildren()).forEach((dino) => {
      if (dino.name === this.playerColor) {
        this.player = dino;
        dino.setDepth(3).setPlayer();
        this.cameras.main.startFollow(
          dino,
          false,
          1,
          1,
          -(<number>width) / 2 + dino.width / 2,
          <number>height / 2
        );
        this.cameras.main.setBounds(
          0,
          0,
          Number.MAX_SAFE_INTEGER,
          <number>height
        );
      }
      const body = <Physics.Arcade.Body>dino.body;
      body.setCollideWorldBounds(true);
      dino.run();
    });
  }

  update(dt,t) {
    (<Dino[]>this.dinoGroup.getChildren()).forEach((dino) => {
      if (dino.body.blocked.down) {
        dino.setRunStatetus();
      }
      dino.playAnimation();
      dino.botsAuto(this);
    });
    // if(this.player.body.blocked.right){
    // }
  }

  dinosInitiation() {
    const spawnPoint = new Phaser.Math.Vector2(
      100,
      <number>this.game.config.height
    );
    this.dinoGroup = this.physics.add.group();
    const cyan = new Dino(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "dinoIdle",
      cyanDino
    );
    const mint = new Dino(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "dinoIdle",
      mintDino
    );
    const orange = new Dino(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "dinoIdle",
      orangeDino
    );
    const black = new Dino(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "dinoIdle",
      blackDino
    );

    this.dinoGroup.add(cyan);
    this.dinoGroup.add(mint);
    this.dinoGroup.add(orange);
    this.dinoGroup.add(black);
  }

  enemyInitiation() {
    const enemiesNumber = this.trackLength / 1000;
    Array.from(Array(enemiesNumber).keys()).forEach((index) => {
      const enemy = new Enemy(
        this,
        Phaser.Math.Between((index - 1) * 1000, index * 1000),
        <number>this.game.config.height,
        enemyTypes[Phaser.Math.Between(0, 6)]
      );
      this.enemies.add(enemy);
      enemy.setCollideWorldBounds(true);
      return enemy;
    });
  }
}
