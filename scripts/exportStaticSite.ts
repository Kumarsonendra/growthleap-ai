import fs from 'fs';
import path from 'path';
import { generateStaticWebsiteZip } from '../src/utils/staticZipGenerator';
import { DEFAULT_SETTINGS } from '../src/data/siteData';

async function exportStatic() {
  const outputDir = path.resolve('static-html');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // We invoke the zip generator which returns a JSZip object or Blob
  const blob = await generateStaticWebsiteZip(DEFAULT_SETTINGS);
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Unzip using JSZip into static-html
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(buffer);

  for (const [filename, file] of Object.entries(zip.files)) {
    if (!file.dir) {
      const content = await file.async('nodebuffer');
      const destPath = path.resolve(outputDir, filename);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, content);
      console.log(`[Exported] ${filename}`);
    }
  }

  console.log(`[GrowthLeap AI] All updated static HTML and CSS files generated in: ${outputDir}`);
}

exportStatic().catch((err) => {
  console.error('Export failed:', err);
});
