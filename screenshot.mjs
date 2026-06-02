import { writeFile, mkdir } from 'fs/promises';
import { existsSync }       from 'fs';
import { join }             from 'path';
import { fileURLToPath }    from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load puppeteer via file URL (required on Windows ESM)
const puppeteerPath = 'file:///C:/Users/user/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
const { default: puppeteer } = await import(puppeteerPath);

const screenshotDir = join(__dirname, 'temporary screenshots');
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

if (!existsSync(screenshotDir)) {
  await mkdir(screenshotDir, { recursive: true });
}

// Auto-increment filename, never overwrite
let n = 1;
let filename;
do {
  filename = label
    ? join(screenshotDir, `screenshot-${n}-${label}.png`)
    : join(screenshotDir, `screenshot-${n}.png`);
  n++;
} while (existsSync(filename));

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Users/user/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1200));

await page.screenshot({ path: filename, fullPage: true });
await browser.close();

console.log(`Saved: ${filename}`);
