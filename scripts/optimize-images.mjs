import { copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imgRoot = path.join(root, "public", "assets", "img");
const backupRoot = path.join(imgRoot, "_originals");

/** @param {string} relativePath */
function getPreset(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized.startsWith("portfolio/")) {
    return { maxWidth: 1200, jpegQuality: 82, webpQuality: 80 };
  }

  return { maxWidth: 2000, jpegQuality: 84, webpQuality: 82 };
}

/** @param {string} dir */
async function collectImages(dir) {
  /** @type {string[]} */
  const files = [];

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "_originals") continue;
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    if (/\.(jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** @param {string} filePath */
async function optimizeImage(filePath) {
  const relativePath = path.relative(imgRoot, filePath);
  const preset = getPreset(relativePath);
  const beforeBytes = (await stat(filePath)).size;
  const inputBuffer = await readFile(filePath);

  const backupPath = path.join(backupRoot, relativePath);
  await mkdir(path.dirname(backupPath), { recursive: true });
  await copyFile(filePath, backupPath);

  const metadata = await sharp(inputBuffer).metadata();
  const resize =
    metadata.width && metadata.width > preset.maxWidth
      ? { width: preset.maxWidth, withoutEnlargement: true }
      : undefined;

  const jpegBuffer = await sharp(inputBuffer)
    .rotate()
    .resize(resize)
    .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
    .toBuffer();

  const tempJpegPath = `${filePath}.opt`;
  await writeFile(tempJpegPath, jpegBuffer);
  await rm(filePath, { force: true });
  await rename(tempJpegPath, filePath);

  const webpPath = filePath.replace(/\.(jpe?g)$/i, ".webp");
  const webpBuffer = await sharp(jpegBuffer).webp({ quality: preset.webpQuality }).toBuffer();
  await writeFile(webpPath, webpBuffer);

  const afterJpegBytes = jpegBuffer.length;
  const afterWebpBytes = webpBuffer.length;

  return {
    relativePath,
    beforeBytes,
    afterJpegBytes,
    afterWebpBytes,
    width: metadata.width,
    height: metadata.height,
    preset,
  };
}

const files = await collectImages(imgRoot);
/** @type {Awaited<ReturnType<typeof optimizeImage>>[]} */
const results = [];

for (const file of files) {
  results.push(await optimizeImage(file));
}

const totalBefore = results.reduce((sum, item) => sum + item.beforeBytes, 0);
const totalJpeg = results.reduce((sum, item) => sum + item.afterJpegBytes, 0);
const totalWebp = results.reduce((sum, item) => sum + item.afterWebpBytes, 0);

console.log("\nImage optimization complete\n");
console.log("File | Before | JPEG | WebP | Max width");
console.log("-".repeat(72));

for (const item of results.sort((a, b) => b.beforeBytes - a.beforeBytes)) {
  console.log(
    [
      item.relativePath.padEnd(34),
      formatMb(item.beforeBytes).padStart(8),
      formatMb(item.afterJpegBytes).padStart(8),
      formatMb(item.afterWebpBytes).padStart(8),
      String(item.preset.maxWidth).padStart(9),
    ].join(" | "),
  );
}

console.log("-".repeat(72));
console.log(
  `Total: ${formatMb(totalBefore)} -> ${formatMb(totalJpeg)} JPEG / ${formatMb(totalWebp)} WebP`,
);
console.log(`Originals backed up to public/assets/img/_originals/`);
