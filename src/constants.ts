import * as path from "path";

const SCRIPT_NAME = "score_collection.py";
const DUMP_NAME = "metadata.json";
const SCORES_NAME = "scores.json";

export const SCRIPT_PATH = path.join(
  path.normalize(path.join(__dirname, "..")),
  "scripts",
  SCRIPT_NAME
);

export const DUMP_FOLDER = path.join(process.cwd(), "dumps");
export const METADATA_PATH = path.join(DUMP_FOLDER, DUMP_NAME);
export const SCORES_PATH = path.join(DUMP_FOLDER, SCORES_NAME);
