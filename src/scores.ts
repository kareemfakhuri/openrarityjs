import { spawnSync } from "child_process";
import {
  BASE_PATH,
  METADATA_PATH,
  SCORES_PATH,
  SCRIPT_PATH,
} from "./constants";
import { clearDumps, dumpMetadata, readScores } from "./dump";
import { TokenMetadata, TokenScore } from "./types";

export function scoreCollection(
  metadata: TokenMetadata[]
): TokenScore[] | null {
  try {
    dumpMetadata(metadata);
  } catch (error: any) {
    console.log("Could not dump metadata. Original error:\n%j", error);
    return null;
  }

  // Run script sync to ensure execution
  spawnSync(
    `poetry`,
    ["run", "python", SCRIPT_PATH, METADATA_PATH, SCORES_PATH],
    { cwd: BASE_PATH, stdio: ["inherit", "inherit", "inherit"] }
  );

  let scores: TokenScore[];
  try {
    scores = readScores();
  } catch (error: any) {
    console.log("Could not read generated scores. Original error:\n%j", error);
    return null;
  }

  try {
    clearDumps();
  } catch (error: any) {
    console.log("Could not clear dumps. Original error:\n%j", error);
    return null;
  }

  return scores;
}
