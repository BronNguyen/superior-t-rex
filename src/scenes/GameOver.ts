import Phaser from "phaser";
import SceneKeys from "../const/SceneKeys";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }
  create() {
    this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'gameOver');
    this.add.text(this.game.canvas.width/2,this.game.canvas.height/1.5,'<Click To Restart The Game>',{color: "#535353", font: '900 20px CustomFont', resolution: 5}).setOrigin(0.5,0);
    this.handleClick();
  }

  handleClick() {
    this.input.on('pointerdown', ()=> {
      this.scene.start(SceneKeys.Begin);
    })
  }
}
