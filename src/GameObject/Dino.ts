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
  private color;
  private speed: number;
  private lives!: number;
  private maxLives: number;
  private isPlayer!: boolean;
  private isUnvulnerable = false;
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
    this.cursorKeys.down.on("down",() => {
      if (this.isPlayer) this.duck();
    })
    this.cursorKeys.down.on("up",() => {
      if(this.isPlayer) this.runAgain();
    })
    this.initAnimation();
  }

  setPlayer() {
    this.isPlayer = true;
    return this;
  }

  run() {
    this.lives = this.maxLives;
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
    this.body.setSize(88,94);
    this.dinoStatus = DinoStatus.Run;
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
    if (this.isPlayer) return;
    if (scene.enemies.getChildren().length <= 0) return false;
    const enemyArray = <Enemy[]>scene.enemies.getChildren();
    enemyArray
      .filter((e) => {
        if (e.x > this.x) return true;
        return false;
      })
      .forEach((e) => {
        if (e.x < this.x + 160) {
          !e.canFly ? this.jump() : true;
        }
      });
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
    if (!this.isPlayer) this.scene.events.emit("dinoDie", this);
    else {
      this.body.stop();
      this.play("dino-hurt-anim");
      this.anims.stop();
    }
  }

  getLives() {
    return this.lives;
  }

  celebrate() {
    this.dinoStatus = DinoStatus.Win;
    this.body.stop();
  }

  handlePowerUp(string) {
    if(string == 'shoe') this.becomeFaster();
    if(string == 'shield') this.becomeInvincible();
  }

  becomeInvincible() {
    this.isUnvulnerable = true;
    this.scene.time.delayedCall(4000,() => {
      this.isUnvulnerable = false;
    })
  }

  becomeFaster() {
    this.body.velocity.x += 300;
    this.scene.time.delayedCall(4000,() => {
      this.body.velocity.x -= 300;
    })
  }
}
