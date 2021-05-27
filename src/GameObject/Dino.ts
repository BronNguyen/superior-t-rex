import DinoType from "../const/DinoType";
import { Physics, Scene } from "phaser";
import { DinoStatus } from "../const/DinoStatus";
import {
  dinoDuckAnimConfig,
  dinoJumpAnimConfig,
  dinoRunAnimConfig,
} from "../Animation/Animation";
import Enemy from "./Enemy";

export default class Dino extends Physics.Arcade.Sprite {
  private color;
  private speed: number;
  private lives!: number;
  private maxLives: number;
  private isPlayer!: boolean;
  private dinoStatus = DinoStatus.Ready;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(s: Scene, x: number, y: number, t: string, dinoType: DinoType) {
    super(s, x, y, t);
    this.color = dinoType.color;
    this.clearTint();
    this.setTintFill(this.color);
    this.name = dinoType.name;
    this.speed = dinoType.speed;
    this.maxLives = dinoType.maxlives;
    this.depth = 2;
    this.setOrigin(0, 1);
    this.scene.add.existing(this);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.cursorKeys.up.on("down", () => {
      if (this.isPlayer) this.jump();
    });
    this.cursorKeys.space.on("down", () => {
      if (this.isPlayer) this.jump();
    });
    this.initAnimation();
  }

  setPlayer() {
    this.isPlayer = true;
    return this;
  }

  setRunStatetus() {
    this.dinoStatus = DinoStatus.Run;
  }

  run() {
    this.lives = this.maxLives;
    this.dinoStatus = DinoStatus.Run;
    if (!this.isPlayer) {
      this.botsRun();
    } else {
      this.body.velocity.x = this.speed;
    }
  }

  jump() {
    if (
      this.dinoStatus == DinoStatus.Run ||
      this.dinoStatus == DinoStatus.Hurt ||
      this.dinoStatus == DinoStatus.Duck
    ) {
      this.body.velocity.y = -1100;
      this.dinoStatus = DinoStatus.Jump;
    }
  }

  botsRun() {
    const tween = this.scene.tweens.add({
      targets: this.body.velocity,
      props: {
        x: {
          duration: 4000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
          value: {
            getEnd: (target, key, value) => {
              return this.speed + 100 * Math.random();
            },
            getStart: (target, key, value) => {
              return this.speed - 100 * Math.random();
            },
          },
        },
      },
    });
  }

  botsAuto(scene) {
    if (scene.enemies.getChildren().length <= 0) return false;
    const enemyArray =  <Enemy[]>scene.enemies.getChildren();
    enemyArray.filter(e=>{
      if(e.x> this.x) return true;
      return false;
    })
    .forEach((e)=>{
      if(e.x < this.x+160) {
        !e.canFly?this.jump():true;
      }
    })
  }

  playAnimation() {
    if (this.dinoStatus == DinoStatus.Run) this.play("dino-run-anim", true);
    if (this.dinoStatus == DinoStatus.Jump) this.play("dino-jump-anim", true);
    if (this.dinoStatus == DinoStatus.Hurt) this.play("dino-hurt-anim", true);
  }

  initAnimation() {
    this.scene.anims.create(dinoRunAnimConfig(this));
    this.scene.anims.create(dinoJumpAnimConfig(this));
    this.scene.anims.create(dinoDuckAnimConfig(this));
  }
}
