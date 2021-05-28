import Dino from "../GameObject/Dino";
import Phaser, { GameObjects, Physics } from "phaser";
import SceneKeys from "../const/SceneKeys";
import { cyanDino, mintDino, blackDino, orangeDino } from "../const/DinoType";
import { GameStatus } from "../const/GameStatus";
import Enemy from "../GameObject/Enemy";
import { enemyTypes } from "../const/EnemyType";

export default class Game1 extends Phaser.Scene {
  private player!: Dino;
  private playerColor!: string;
  enemies!: Phaser.GameObjects.Group;
  private heartGroup!: Phaser.GameObjects.Group;
  private trackLength = 0;
  private finishLine!: Phaser.GameObjects.Image;
  gameStatus = GameStatus.Ready;
  private dinoGroup!: Phaser.GameObjects.Group;
  private dinosRank: string[] = [];
  private sceneName!: string;
  private stageText!: GameObjects.Text;
  private playerRankText!: GameObjects.Text;
  constructor() {
    super(SceneKeys.Game1);
  }

  init(data) {
    this.dinosRank = [];
    this.playerColor = data.name;
    this.trackLength = data.length;
    this.sceneName = data.sceneName;
    this.enemies = this.physics.add.group();
  }

  create() {
    const width = this.game.config.width;
    const height = this.game.config.height;
    this.stageSetup(width, height);
    this.dinosInitiation();
    this.setDinoProperties(width, height);
    this.enemyInitiation();
    this.initColliders();
    this.showLives(width, height);
    this.eventHandler();
    this.textInitiation();
  }

  stageSetup(width, height) {
    //set world Bounds
    this.physics.world.setBounds(0, 0, this.trackLength, height);
    //setup finishLine
    this.finishLine = this.physics.add
      .image(this.trackLength, height, "finishLine")
      .setOrigin(0, 1)
      .setScale(0.5, 1);
    (<Physics.Arcade.Body>this.finishLine.body)
      .setSize(this.finishLine.width, this.finishLine.height)
      .setOffset(120, 0)
      .setCollideWorldBounds(true)
      .setImmovable(true);
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

  initColliders() {
    const hurtCollision = this.physics.add.overlap(
      this.dinoGroup,
      this.enemies,
      (_dino, _enemy) => {
        (<Dino>_dino.body.gameObject).beHurt();
        this.lifeUpdate();
      }
    );
    this.physics.add.collider(
      this.finishLine,
      this.dinoGroup,
      (_line, _dino) => {
        const dinoInstance = <Dino>_dino.body.gameObject;
        if (this.dinosRank.includes(dinoInstance.name)) return;
        this.dinosRank.push(dinoInstance.name);
        dinoInstance.celebrate();
        if (this.player == dinoInstance) {
          if (this.dinosRank.length < 3) {
            this.confetti();
            this.cameras.main.flash();
          }
          this.time.delayedCall(2000, () => {
            this.NextScene();
          });
        }
      }
    );
  }

  confetti() {
    const confettiParticle = this.add.particles("paper");
    const emitter = confettiParticle
      .createEmitter({
        x: this.player.x + this.player.width / 2,
        y: this.player.height,
        speed: 500,
        lifespan: 500,
        tint: [0xffff00, 0xff0000, 0x00ff00, 0x0000ff],
        frequency: 40,
        gravityY: 500,
        scale: { min: 0.1, max: 1 },
        angle: { min: -65, max: -115 },
      })
      .startFollow(this.player, this.player.width / 2)
      .explode(15, this.game.canvas.width / 2, this.game.canvas.height / 2);
  }

  textInitiation() {
    // add text
    this.stageText = this.make.text({
      add: false,
      x: 0,
      y: 0,
      text: this.sceneName,
      style: {
        fontSize: "64px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "center",
        backgroundColor: "#ff00ff",
      },
    });
    this.add.existing(this.stageText).setScrollFactor(0);

    // this.playerRankText = this.make.text({
    //   add: false,
    //   x: 0,
    //   y: 0,
    //   text: "Your Rank: " + (this.dinosRank.indexOf(this.player.name)+1),
    //   style: {
    //     fontSize: "64px",
    //     fontFamily: "Arial",
    //     color: "#ffffff",
    //     align: "center",
    //     backgroundColor: "#ff00ff",
    //   },
    // });
    // this.add.existing(this.playerRankText).setScrollFactor(0);
  }

  showLives(width, height) {
    this.heartGroup = this.add.group();
    Array.from(Array(this.player.getLives()).keys()).forEach((index) => {
      this.heartGroup.add(
        this.add
          .sprite(width - (index + 1) * 50, 50, "heart")
          .setScale(0.08)
          .setScrollFactor(0)
      );
    });
  }

  lifeUpdate() {
    this.heartGroup.getChildren().forEach((heart, index) => {
      if (this.player.getLives() <= 2) {
        if (index == 2) (<GameObjects.Sprite>heart).setTintFill(0x000000);
      }
      if (this.player.getLives() <= 1) {
        if (index == 1) (<GameObjects.Sprite>heart).setTintFill(0x000000);
      }
      if (this.player.getLives() <= 0) {
        if (index == 0) (<GameObjects.Sprite>heart).setTintFill(0x000000);
        this.scene.pause();
        setTimeout(() => {
          this.scene.resume();
          this.scene.start(SceneKeys.GameOver);
        }, 2000);
      }
    });
  }

  eventHandler() {
    this.events.on("dinoDie", (dino) => {
      this.dinoGroup.killAndHide(dino);
    });
  }

  NextScene() {
    this.scene.start(SceneKeys.Game1, {
      name: this.player.name,
      length: this.trackLength + 2000,
      sceneName: "Stage " + (this.trackLength) / 2000,
    });
  }

  update(dt, t) {
    (<Dino[]>this.dinoGroup.getChildren()).forEach((dino) => {
      dino.setStatus();
      dino.playAnimation();
      dino.botsAuto(this);
    });
  }
}
