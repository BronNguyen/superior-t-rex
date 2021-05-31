import Phaser from "phaser";
import Dino from "./Dino";
import Enemy from "./Enemy";

export default class DinoBots extends Dino {
    scene;
  constructor(s, x: number, y: number, t: string, dinoType) {
    super(s, x, y, t, dinoType);
    this.scene = s;
  }
  run() {
    this.lives = this.maxLives;
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
    this.botsAuto(this.scene);
  }

  botsAuto(scene) {
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
}
