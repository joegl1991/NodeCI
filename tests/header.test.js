const { text } = require('body-parser');
const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

afterEach(async() => {
    await browser.close();
});

test('The header has the correct text', async () => {

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/)
});