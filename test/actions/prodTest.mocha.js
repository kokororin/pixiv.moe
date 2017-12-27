import puppeteer from 'puppeteer';
import { expect } from 'chai';
import config from '../../src/config';

describe('prod', () => {
  it('check gallery page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pixiv.moe');
    await page.waitForSelector('.mdl-layout', { visible: true });

    const bodyContent = await page.evaluate(() => {
      return document.body.innerHTML;
    });

    for (const keyword of config.keywords) {
      expect(bodyContent.indexOf(keyword.jp) > -1).to.equal(true);
    }

    await browser.close();
  });

  it('check illust page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pixiv.moe/illust/55388816');
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    const title = await page.evaluate(() => {
      return document.title;
    });

    expect(title).to.equal('ラブライブ性転換詰');

    await browser.close();
  });
});
