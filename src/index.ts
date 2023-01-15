import { initPoetry } from "./poetry";

console.log('Running "poetry install"...');
initPoetry();
console.log('Completed execution of "poetry install"');

export { scoreCollection } from "./scores";
export type { Trait, TokenMetadata, TokenScore } from "./types";
