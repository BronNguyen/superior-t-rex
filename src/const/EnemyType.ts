export default interface EnemyType {
  name: string;
  imgTexture: string;
  fly: boolean;
  dmg: number;
  lives: number;
}

const smallCactus1 = {
  name: 'small-cactus-1',
  imgTexture: 'enemy4',
  fly: false,
  dmg: 1,
  lives: 1,
}

const smallCactus2 = {
  name: 'small-cactus-2',
  imgTexture: 'enemy5',
  fly: false,
  dmg: 1,
  lives: 1,
}

const smallCactus3 = {
  name: 'small-cactus-3',
  imgTexture: 'enemy6',
  fly: false,
  dmg: 1,
  lives: 1,
}

const bigCactus1 = {
  name: 'small-cactus-1',
  imgTexture: 'enemy1',
  fly: false,
  dmg: 1,
  lives: 1,
}

const bigCactus2 = {
  name: 'small-cactus-2',
  imgTexture: 'enemy2',
  fly: false,
  dmg: 1,
  lives: 1,
}

const bigCactus3 = {
  name: 'small-cactus-3',
  imgTexture: 'enemy3',
  fly: false,
  dmg: 1,
  lives: 1,
}

const enemyBird = {
  name: 'enemy-bird',
  imgTexture: 'enemyBird',
  fly: true,
  dmg: 1,
  lives: 1,
}

export const enemyTypes = [enemyBird,bigCactus1,bigCactus2,bigCactus3,smallCactus1,smallCactus2,smallCactus3];