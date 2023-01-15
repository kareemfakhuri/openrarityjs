import * as fs from "fs";
import { DUMP_FOLDER, METADATA_PATH, SCORES_PATH } from "./constants";
import { TokenMetadata, TokenScore } from "./types";

export function dumpMetadata(metadata: TokenMetadata[]): void {
  if (!fs.existsSync(DUMP_FOLDER)) {
    fs.mkdirSync(DUMP_FOLDER);
  }

  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}

export function readScores(): TokenScore[] {
  return JSON.parse(fs.readFileSync(SCORES_PATH).toString());
}

export function clearDumps(): void {
  fs.rmSync(DUMP_FOLDER, {
    recursive: true,
  });
}
