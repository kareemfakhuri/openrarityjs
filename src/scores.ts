import { spawn } from "child_process";
import {
  BASE_PATH,
  METADATA_PATH,
  SCORES_PATH,
  SCRIPT_PATH,
} from "./constants";
import { clearDumps, dumpMetadata, readScores } from "./dump";
import { TokenMetadata, TokenScore } from "./types";
import { wait } from "./utils/async-utils";

export async function scoreCollection(
  metadata: TokenMetadata[]
): Promise<TokenScore[] | null> {
  try {
    dumpMetadata(metadata);
  } catch (error: any) {
    console.log("Could not dump metadata. Original error:\n%j", error);
    return null;
  }

  // Pass dump file path to script
  const subprocess = spawn(
    `poetry`,
    ["run", "python", SCRIPT_PATH, METADATA_PATH, SCORES_PATH],
    { cwd: BASE_PATH }
  );

  let done = false;
  subprocess.stdout.on("close", function () {
    done = true;
  });

  // Wait till script is fully executed
  while (!done) {
    await wait(25);
  }

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
