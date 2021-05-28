import Phaser from 'phaser';
import GameOver from './scenes/GameOver';
import Begin from './scenes/Begin';
import Game1 from './scenes/Game1';
import Preloader from './scenes/Preloader';


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 2000 },
			debug: true
		},
	},
	transparent: true,
	scene: [Preloader, Begin, Game1, GameOver]
}

export default new Phaser.Game(config)
