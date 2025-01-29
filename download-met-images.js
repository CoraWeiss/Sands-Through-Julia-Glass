import { createWriteStream, mkdirSync, existsSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import https from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = createWriteStream(filename);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  // Create output directory
  const outputDir = 'met-images';
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  // Read the JSON file with image URLs
  const imageData = JSON.parse(readFileSync('met-images.json', 'utf8'));

  for (const item of imageData) {
    if (item.imageUrl) {
      const filename = join(outputDir, `${item.title.replace(/[^a-z0-9]/gi, '_')}.jpg`);
      try {
        console.log(`Downloading: ${item.title}`);
        await downloadImage(item.imageUrl, filename);
        console.log(`Successfully downloaded: ${item.title}`);
      } catch (error) {
        console.error(`Error downloading ${item.title}:`, error);
      }
    }
  }
}

downloadAllImages();
