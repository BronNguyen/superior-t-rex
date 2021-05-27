import EnemyType from "../const/EnemyType";
import Phaser, { Scene } from "phaser";
import { birdFlyAnimConfig } from "../Animation/Animation";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  canFly: boolean;
  constructor(s: Scene, x: number, y: number, type: EnemyType) {
    super(s, x, y, type.imgTexture);
    this.scene.add.existing(this);
    if (type.fly) {
      this.canFly = true;
      this.fly();
      this.scene.anims.create(birdFlyAnimConfig(this));
      this.play("enemy-dino-fly");
    } else {
      this.canFly = false;
    }
    this.setOrigin(0, 1);
  }

  fly() {
    this.scene.tweens.add({
      targets: this,
      props: {
        y: {
          repeat: -1,
          yoyo: true,
          duration: 2000,
          ease: "Sine.easeInOut",
          value: {
            getEnd: (target, key, value) => {
              return Phaser.Math.Between(
                <number>this.scene.game.config.height - 60 - this.height,
                this.height
              );
            },
            getStart: (target, key, value) => {
              return this.height;
            },
          },
        },
      },
    });
  }
}
