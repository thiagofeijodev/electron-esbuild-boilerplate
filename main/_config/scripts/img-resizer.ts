import sharp from 'sharp';
import path from 'path';
import pngToIco from 'png-to-ico';
import fs from 'fs/promises';

const SIZES = [
16, 24, 32, 48, 64, 96, 128, 256, 512, 1024
];
const OUTPUT_PATH = path. join(process.cwd(), './_config/assets/icons');
const INPUT_PATH = path.join(process.cwd(), './_config/assets/icon.png');

const resizeFile = async (img: Buffer) => {
  const imageSharp = sharp(img);

  SIZES.forEach((size) => {
    const outputFilePath = path.join(OUTPUT_PATH, `${size}x${size}.png`);
    imageSharp
      .resize(size, size)
      .toFile(outputFilePath)
      .then(() => {
        console.log('Image resized successfully! size: ', size);
        if (size === 256) {
          const inputFilepath = path.join(OUTPUT_PATH, '256x256.png');
          const outputFilePath = path.join(OUTPUT_PATH, '..', 'icon.ico');
          pngToIco(inputFilepath)
            .then(buf => fs.writeFile(outputFilePath, buf))
            .then(() => console.log('Image resized successfully ICO'))
            .catch(err => console.error('Error resizing image:', err));
        }
      })
      .catch(err => console.error('Error resizing image:', err));
  });
};

const createBuildFolder = async () => {
  async function folderExists(folderPath: string) {
    try {
      return await fs.access(folderPath, fs.constants.F_OK);
    } catch {
      return false;
    }
  }

  if (await folderExists(OUTPUT_PATH)) {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  }
  await fs.mkdir(OUTPUT_PATH, { recursive: true });
}

const img = await fs.readFile(INPUT_PATH);

await createBuildFolder();
await resizeFile(img);
console.log('All images resized successfully!');
