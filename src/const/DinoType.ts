const cyanColor = "0x0000FF";
const orangeColor = "0xFFA500";
const mintColor = "0x98ff98";
const blackColor = "0x000000";

export default interface DinoType {
  color: string;
  speed: number;
  maxlives: number;
  name: string;
}

const cyanDino: DinoType = {
  name: "cyan",
  color: cyanColor,
  speed: 400,
  maxlives: 3,
};

const orangeDino: DinoType = {
  name: "orange",
  color: orangeColor,
  speed: 400,
  maxlives: 3,
};

const mintDino: DinoType = {
  name: "mint",
  color: mintColor,
  speed: 400,
  maxlives: 3,
};

const blackDino: DinoType = {
  name: "black",
  color: blackColor,
  speed: 400,
  maxlives: 3,
};

export const dinoInstances = [cyanDino, blackDino, mintDino, orangeDino];
