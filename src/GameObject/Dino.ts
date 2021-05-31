import DinoType from "../const/DinoType";
import { Physics, Scene } from "phaser";
import { DinoStatus } from "../const/DinoStatus";
import {
  dinoDuckAnimConfig,
  dinoFunAnimConfig,
  dinoHurtAnimConfig,
  dinoJumpAnimConfig,
  dinoRunAnimConfig,
} from "../Animation/Animation";
import Enemy from "./Enemy";

export default class Dino extends Physics.Arcade.Sprite {
  protected color;
  protected speed: number;
  protected lives!: number;
  protected maxLives: number;
  protected isUnvulnerable = false;
  protected dinoStatus = DinoStatus.Ready;

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
    this.initAnimation();
  }

  run() {
    this.lives = this.maxLives;
    this.body.velocity.x = this.speed;
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

  duck() {
    if (this.body.blocked.down) {
      this.body.setSize(118, 62);
      this.body.offset.y = 32;
      this.dinoStatus = DinoStatus.Duck;
    } else {
      this.body.velocity.y += 600;
    }
  }

  runAgain() {
    this.body.offset.y = 0;
    this.body.setSize(88, 94);
    this.dinoStatus = DinoStatus.Run;
  }

  setStatus() {
    if (this.dinoStatus !== DinoStatus.Win) {
      if (this.body.blocked.down && this.isUnvulnerable == false) {
        this.dinoStatus = DinoStatus.Run;
      }
    }
  }

  playAnimation() {
    if (this.dinoStatus == DinoStatus.Run) this.play("dino-run-anim", true);
    if (this.dinoStatus == DinoStatus.Duck) this.play("dino-duck-anim", true);
    if (this.dinoStatus == DinoStatus.Jump) this.play("dino-jump-anim", true);
    if (this.dinoStatus == DinoStatus.Hurt) this.play("dino-hurt-anim", true);
    if (this.dinoStatus == DinoStatus.Win) this.play("dino-fun-anim", true);
  }

  initAnimation() {
    this.scene.anims.create(dinoRunAnimConfig(this));
    this.scene.anims.create(dinoJumpAnimConfig(this));
    this.scene.anims.create(dinoHurtAnimConfig(this));
    this.scene.anims.create(dinoFunAnimConfig(this));
    this.scene.anims.create(dinoDuckAnimConfig(this));
  }

  beHurt() {
    if (this.isUnvulnerable) return;
    this.lives -= 1;
    if (this.lives <= 0) this.die();
    this.dinoStatus = DinoStatus.Hurt;
    this.isUnvulnerable = true;
    if (this.isUnvulnerable) {
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        repeat: 10,
        alpha: 0,
        yoyo: true,
      });
    }

    setTimeout(() => {
      this.isUnvulnerable = false;
      this.setStatus();
    }, 2000);
  }

  die() {
    this.body.stop();
    this.play("dino-hurt-anim");
    this.anims.stop();
  }

  getLives() {
    return this.lives;
  }

  celebrate() {
    this.dinoStatus = DinoStatus.Win;
    this.body.stop();
  }

  handlePowerUp(string) {
    if (string == "shoe") this.becomeFaster();
    if (string == "shield") this.becomeInvincible();
  }

  becomeInvincible() {
    this.isUnvulnerable = true;
    this.scene.time.delayedCall(4000, () => {
      this.isUnvulnerable = false;
    });
  }

  becomeFaster() {
    this.body.velocity.x += 300;
    this.scene.time.delayedCall(4000, () => {
      this.body.velocity.x -= 300;
    });
  }
}
