const puppeteer = require("puppeteer");
const path = require('path');
const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
}

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Hello World Box', () => {
    it("Page contains element with class `.helloworld`", async () => {
        const box = await page.$('.helloworld');
        expect(box).toBeTruthy();
    });
    it("`.helloworld` box has width & height of 200px and contains the text 'hello world'", async () => {
        const boxWidth = await page.$eval('.helloworld', el => getComputedStyle(el).width);
        const boxHeight = await page.$eval('.helloworld', el => getComputedStyle(el).height);
        const boxText = await page.$eval('.helloworld', el => el.innerText);
        expect(boxWidth).toBe('200px');
        expect(boxHeight).toBe('200px');
        expect(boxText).toMatch(/hello world/i)
    });
    it("`.helloworld` box has a background color", async () => {
        const boxColor = await page.$eval('.helloworld', el => getComputedStyle(el).backgroundColor);
        expect(boxColor).toBeTruthy();
    });
    it("`.helloworld` box is centered horizontally", async () => {
        const position = await page.$eval('.helloworld', el => el.getBoundingClientRect());
        expect(position.left).toBe(position.right);
    });
    it("`.helloworld` box is positioned '7px' from top and '-5px' from left", async () => {
        const boxTop = await page.$eval('.helloworld', el => getComputedStyle(el).top);
        const boxLeftOrRight = await page.$$eval('.helloworld', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('left') + getComputedStyle(e).getPropertyValue('right')));
        expect(boxTop).toBe('7px');
        expect(boxLeftOrRight.filter(val => val.includes('-5px') || val.includes('5px')).length).toBeGreaterThan(0);
    });
});
describe('Box 1', () => {
    it("`.box1` is present on page", async () => {
        const box = await page.$('.box1');
        expect(box).toBeTruthy();
    });
    it("`.box1` has width & height of '200px'", async () => {
        const boxWidth = await page.$eval('.box1', el => getComputedStyle(el).width);
        const boxHeight = await page.$eval('.box1', el => getComputedStyle(el).height);
        expect(boxWidth).toBe('200px');
        expect(boxHeight).toBe('200px');
    });
    it("`.box1` has 'red' background color", async () => {
        const boxColor = await page.$eval('.box1', el => getComputedStyle(el).backgroundColor);
        expect(boxColor).toBe('rgb(255, 0, 0)');
    });
    it("`.box1` is positioned at the bottom left using CSS `bottom` Property", async () => {
        const boxBottom = await page.$eval('.box1', el => getComputedStyle(el).bottom);
        expect(boxBottom).toBe('0px');
    });
});
describe('Box 2', () => {
    it("`.box2` is present on page", async () => {
        const box = await page.$('.box2');
        expect(box).toBeTruthy();
    });
    it("`.box2` has width & height of '200px'", async () => {
        const boxWidth = await page.$eval('.box2', el => getComputedStyle(el).width);
        const boxHeight = await page.$eval('.box2', el => getComputedStyle(el).height);
        expect(boxWidth).toBe('200px');
        expect(boxHeight).toBe('200px');
    });
    it("`.box2` has background color 'rgb(0, 255, 85)'", async () => {
        const boxColor = await page.$eval('.box2', el => getComputedStyle(el).backgroundColor);
        expect(boxColor).toBe('rgb(0, 255, 85)');
    });
    it("`.box2` is postioned at the bottom left and is 10px higher / 10px to the left of `.box1`", async () => {
        const boxBottom = await page.$eval('.box2', el => getComputedStyle(el).bottom);
        const boxLeft = await page.$eval('.box2', el => getComputedStyle(el).left);
        expect(boxBottom).toBe('10px');
        expect(boxLeft).toBe('10px');
    });
});
describe('Box 3', () => {
    it("`.box3` is present on page", async () => {
        const box = await page.$('.box3');
        expect(box).toBeTruthy();
    });
    it("`.box3` has width & height of '200px'", async () => {
        const boxWidth = await page.$eval('.box3', el => getComputedStyle(el).width);
        const boxHeight = await page.$eval('.box3', el => getComputedStyle(el).height);
        expect(boxWidth).toBe('200px');
        expect(boxHeight).toBe('200px');
    });
    it("`.box3` has background color 'rgb(0, 183, 255)'", async () => {
        const boxColor = await page.$eval('.box3', el => getComputedStyle(el).backgroundColor);
        expect(boxColor).toBe('rgb(0, 183, 255)');
    });
    it("`.box3` is positioned to the bottom left and is 10px higher / 10px to the left of `.box2`", async () => {
        const boxBottom = await page.$eval('.box3', el => getComputedStyle(el).bottom);
        const boxLeft = await page.$eval('.box3', el => getComputedStyle(el).left);
        expect(boxBottom).toBe('20px');
        expect(boxLeft).toBe('20px');
    });
    it("`.box3` is placed behind `.box2` using CSS `z-index` property", async () => {
        let box2Index = await page.$eval('.box2', el => getComputedStyle(el).zIndex);
        let box3Index = await page.$eval('.box3', el => getComputedStyle(el).zIndex);
        if (box2Index === 'auto') {
            box2Index = 0;
        }
        expect(Number(box3Index)).toBeLessThan(Number(box2Index));
    });
});
