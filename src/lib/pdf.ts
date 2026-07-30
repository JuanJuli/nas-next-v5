import puppeteer from 'puppeteer-core';
import type {Browser} from 'puppeteer-core';

let browser: Browser | null = null;

async function getBrowser() {
  if (!browser) {
    // Find Chrome executable path for different OS
    const getExecutablePath = () => {
      if (process.platform === 'win32') {
        return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      } else if (process.platform === 'darwin') {
        return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      } else {
        return '/usr/bin/google-chrome';
      }
    };

    browser = await puppeteer.launch({
      headless: true,
      executablePath: getExecutablePath(),
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
  }
  return browser;
}

export async function generatePDF(html: string) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
  });

  await page.close();

  return pdf;
}