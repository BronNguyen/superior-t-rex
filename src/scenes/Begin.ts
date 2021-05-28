import SceneKeys from "../const/SceneKeys";
import { mintDino, cyanDino, blackDino, orangeDino } from "../const/DinoType";
import Phaser, { GameObjects } from "phaser";
import Dino from "../GameObject/Dino";

export default class Begin extends Phaser.Scene {
  dinoGroup!: GameObjects.Group;
  text!: GameObjects.Text;
  graphics;
  constructor() {
    super(SceneKeys.Begin);
  }

  create() {
    this.dinoInitiation();
    this.textInitiation();
    this.highLightPlayer();
  }

  dinoInitiation() {
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

    this.dinoGroup = this.add.group();
    this.dinoGroup.add(cyan);
    this.dinoGroup.add(mint);
    this.dinoGroup.add(orange);
    this.dinoGroup.add(black);
  }

  textInitiation() {
    // add text
    this.text = this.make.text({
      add: false,
      x: 0,
      y: 0,
      text: "Select your character",
      style: {
        fontSize: "64px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "center",
        backgroundColor: "#ff00ff",
      },
    });
    this.add.existing(this.text);
  }

  highLightPlayer() {
    this.graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false,
      fillStyle: { color: 0xff00ff, alpha: 1 },
    });

    this.graphics.fillRect(0, 0, 100, 100).setDepth(0);

    this.graphics.generateTexture("block", 100, 100);
    const highlighted = this.add.image(100, 100, "block").setAlpha(0);

    const hitArea = new Phaser.Geom.Rectangle(0, 0, 100, 100);
    const hitAreaCallback = Phaser.Geom.Rectangle.Contains;
    this.dinoGroup.setOrigin(0.5, 0.5);
    this.dinoGroup.setHitArea(hitArea, hitAreaCallback);

    this.input.on("gameobjectover", (pointer, gameObject) => {
      highlighted.setAlpha(1);
      highlighted.setPosition(gameObject.x, gameObject.y);
    });

    this.dinoGroup.getChildren().forEach((dino, index) => {
      dino.on("pointerdown", () => {
        highlighted.setVisible(false);
        this.physics.add.existing(dino);
        this.physics.world.gravity = new Phaser.Math.Vector2(0, 0);
        dino.body.velocity.y = -40;
        this.dinoGroup.getChildren().splice(index, 1);
        this.text.setScale(0.5);
        this.text.setText("You have choosen: " + dino.name + " dino");
        this.tweens.add({
          targets: this.dinoGroup.getChildren(),
          alpha: 0,
          duration: 1000,
          ease: "Power2",
        });
        setTimeout(() => {
          dino.body.velocity.y = 0;
        }, 2000);
        setTimeout(() => {
          this.scene.start(SceneKeys.Game1, {
            name: dino.name,
            length: 4000,
            sceneName: "Stage 1",
          });
        }, 3000);
      });
    });
  }
}
