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

export const cyanDino: DinoType = {
    name: "cyan",
    color: cyanColor,
    speed: 300,
    maxlives: 3,
}

export const orangeDino: DinoType = {
    name: "orange",
    color: orangeColor,
    speed: 300,
    maxlives: 3,
}

export const mintDino: DinoType = {
    name: "mint",
    color: mintColor,
    speed: 300,
    maxlives: 3,
}

export const blackDino: DinoType = {
    name: "black",
    color: blackColor,
    speed: 300,
    maxlives: 3,
}