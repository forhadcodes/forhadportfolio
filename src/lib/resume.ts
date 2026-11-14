import fs from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

/**
 * True when /public/resume.pdf exists, so the "Download Resume" buttons
 * never point at a missing file. Add your PDF and they appear automatically.
 */
export function hasResume() {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", profile.resumePath.replace(/^\//, "")),
    );
  } catch {
    return false;
  }
}
