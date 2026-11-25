// Write one pigeon pitch line to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The line is a fixed
// string: the program writes exactly these bytes on every run.
//
// The line (170 chars, 170 bytes) won an 8-candidate head-to-head against
// the judge brief: the pigeon comes out of stealth mode after three
// thousand years — and the punch is that it ate the investor's sandwich,
// the most iconic city-pigeon act. Full comparison:
// u-donrulezz-pigeon-pitch-one-line-af06c6cf-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "We've been in stealth mode for three thousand years: every city on Earth runs on our platform and nobody noticed. Today we come out of stealth. Also, I ate your sandwich.";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
// Count code points, not UTF-16 units, so the mirror matches the gate's
// character count exactly even for characters outside the BMP.
// Note: no trailing newline — writeFileSync writes exactly LINE, so the
// gated file is 170 chars / 170 bytes, matching the char count the gate
// measures.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${charCount} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf-8" });
