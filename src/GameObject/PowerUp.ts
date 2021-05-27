import Phaser, { Scene } from 'phaser';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(s:Scene, x:number, y:number, t:string) {
        super(s, x, y, t);
    }
}