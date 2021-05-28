export const dinoRunAnimConfig = (scene) => {
  return {
    key: "dino-run-anim",
    frames: scene.anims.generateFrameNumbers("dinoRun", { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1,
  };
};

export const dinoDuckAnimConfig = (scene) => {
  return {
    key: "dino-duck-anim",
    frames: scene.anims.generateFrameNumbers("dinoDuck", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  };
};

export const dinoJumpAnimConfig = (scene) => {
  return {
    key: "dino-jump-anim",
    frames: scene.anims.generateFrameNumbers("dinoRun", { start: 1, end: 1}),
  }
}

export const dinoHurtAnimConfig = (scene) => {
  return {
    key: "dino-hurt-anim",
    frames: scene.anims.generateFrameNumbers("dinoHurt", {start: 0, end: 0}),
  }
}

export const dinoFunAnimConfig = (scene) => {
  return {
    key: "dino-fun-anim",
    frames: scene.anims.generateFrameNumbers("dinoFun", {start: 0, end: 0}),
  }
}

export const birdFlyAnimConfig = (scene) => {
  return {
    key: "enemy-dino-fly",
    frames: scene.anims.generateFrameNumbers("enemyBird", { start: 0, end: 1 }),
    frameRate: 6,
    repeat: -1,
  };
};

