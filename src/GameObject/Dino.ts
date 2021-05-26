import DinoType from '../const/DinoType';
import Phaser, { GameObjects, Physics, Scene } from 'phaser';

export default class Dino extends Physics.Arcade.Sprite {

    private color;
    speed!: number;
    lives: number;
    name: string;

    constructor(s:Scene, x:number, y:number, t:string, dinoType: DinoType) {
        super(s,x,y,t);
        this.color = dinoType.color;
        this.clearTint();
        this.setTintFill(this.color);
        this.name = dinoType.name;
        this.speed = dinoType.speed;
        this.lives = dinoType.maxlives;
        this.depth = 10;

        this.scene.add.existing(this);
    }
}