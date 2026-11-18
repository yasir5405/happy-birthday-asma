import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { content } from "./content";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Reads every image in /public/photos at build time, in filename order. */
export function getPhotos(): Photo[] {
  const dir = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .flatMap((file) => {
      try {
        const size = imageSize(fs.readFileSync(path.join(dir, file)));
        let { width = 0, height = 0 } = size;
        // Phone photos often store rotation in EXIF — swap for portrait shots.
        if (size.orientation && size.orientation >= 5) [width, height] = [height, width];
        if (!width || !height) return [];
        const caption = content.photoCaptions[file];
        return [{ src: `/photos/${encodeURIComponent(file)}`, width, height, caption, alt: caption ?? "A memory of us" }];
      } catch {
        return [];
      }
    });
}
