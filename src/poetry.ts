import { spawnSync } from "child_process";
import { BASE_PATH } from "./constants";

export function initPoetry(): void {
  spawnSync(`poetry`, ["install"], { cwd: BASE_PATH });
}
