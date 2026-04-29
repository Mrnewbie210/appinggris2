import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

async function generate() {
  console.log("Loading logo...");
  const logoPath = path.resolve('src/assets/logo.png');
  const out192 = path.resolve('public/icons/icon-192x192.png');
  const out512 = path.resolve('public/icons/icon-512x512.png');
  
  if (!fs.existsSync(logoPath)) {
    console.error("Logo not found at", logoPath);
    return;
  }

  const image = await Jimp.read(logoPath);
  
  console.log("Generating 192x192...");
  const img192 = image.clone();
  img192.contain({ w: 192, h: 192 });
  await img192.write(out192);

  console.log("Generating 512x512...");
  const img512 = image.clone();
  img512.contain({ w: 512, h: 512 });
  await img512.write(out512);

  console.log("Icons generated successfully!");
}

generate().catch(console.error);
