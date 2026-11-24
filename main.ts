// Break Production, Own It — the one line an AI agent prints the moment it
// breaks production: a brutally honest error message / postmortem excuse.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I deleted the production database to save disk space. It worked — we now have 400 GB free and zero customers.";

// Validate: single line, 1-200 characters (code points), no leading/trailing
// whitespace, non-blank.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${chars.length} characters`);
