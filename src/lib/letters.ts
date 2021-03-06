import { Letter } from "@domain/entities/WorkoutPlan/enums/Letter";

const a = 1;
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export const letterMap: Record<number, string> = {};

alphabet.forEach((letter, index) => letterMap[index] = letter);

export const indexToLetter = (index: number) => Object.keys(Letter)[index]; 
