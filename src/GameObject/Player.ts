import Phaser from "phaser";
import Dino from "./Dino";

export default class Player extends Dino {
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(s, x: number, y: number, t: string, dinoType) {
    super(s, x, y, t, dinoType);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.cursorKeys.up.on("down", () => {
      this.jump();
    });
    this.cursorKeys.space.on("down", () => {
      this.jump();
    });
    this.cursorKeys.down.on("down", () => {
      this.duck();
    });
    this.cursorKeys.down.on("up", () => {
      this.runAgain();
    });
  }

  run() {
    this.lives = this.maxLives;
    this.body.velocity.x = this.speed;
  }

  die() {
    this.scene.events.emit("dinoDie", this);
  }
}
