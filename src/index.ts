import Phaser from 'phaser';
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
			gravity: { y: 200 },
			debug: true
		},
	},
	transparent: true,
	scene: [Preloader, Begin, Game1]
}

export default new Phaser.Game(config)
