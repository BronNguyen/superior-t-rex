import SceneKeys from "../const/SceneKeys";
import { mintDino, cyanDino, blackDino, orangeDino } from "../const/DinoType";
import Phaser from "phaser";
import Dino from "../GameObject/Dino";

export default class Begin extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Begin);
  }

  create() {
    //add dinos
    const cyan = new Dino(
      this,
      100,
      <number>this.game.config.height / 2,
      "dinoIdle",
      cyanDino
    );
    const mint = new Dino(
      this,
      200,
      <number>this.game.config.height / 2,
      "dinoIdle",
      mintDino
    );
    const orange = new Dino(
      this,
      300,
      <number>this.game.config.height / 2,
      "dinoIdle",
      orangeDino
    );
    const black = new Dino(
      this,
      400,
      <number>this.game.config.height / 2,
      "dinoIdle",
      blackDino
    );

    const dinoGroup = this.add.group();
    dinoGroup.add(cyan);
    dinoGroup.add(mint);
    dinoGroup.add(orange);
    dinoGroup.add(black);
    // add text

    const text = this.make.text({
      add: false,
      x: 0,
      y: 0,
      text: "Choose your character",
      style: {
        fontSize: "64px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "center",
        backgroundColor: "#ff00ff",
      },
    });
    this.add.existing(text);
    const graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false,
      fillStyle: { color: 0xff00ff, alpha: 1 },
    });

    graphics.fillRect(0, 0, 100, 100).setDepth(0);

    graphics.generateTexture("block", 100, 100);
    const highlighted = this.add.image(100, 100, "block").setAlpha(0);

    const hitArea = new Phaser.Geom.Rectangle(0, 0, 100, 100);
    const hitAreaCallback = Phaser.Geom.Rectangle.Contains;
    dinoGroup.setHitArea(hitArea, hitAreaCallback);

    this.input.on("gameobjectover", (pointer, gameObject) => {
        highlighted.setAlpha(1);
      highlighted.setPosition(gameObject.x, gameObject.y);
    });

    dinoGroup.getChildren().forEach((dino,index) => {
      dino.on("pointerdown", () => {
          highlighted.setAlpha(0);
        this.physics.add.existing(dino);
        this.physics.world.gravity = new Phaser.Math.Vector2(0,0);
        dino.body.velocity.y = -40;
        dinoGroup.getChildren().splice(index,1);
        // dinoGroup.setAlpha(0);
        this.tweens.add({
            targets: dinoGroup.getChildren(),
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
          });
        // this.cameras.main.startFollow(dino);
        setTimeout(() => {
            dino.body.velocity.y = 0;
        }, 2000);
      });
    });

    // this.scene.start(SceneKeys.Game1);
  }
}
