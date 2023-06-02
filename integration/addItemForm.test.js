describe('addItemForm', () => {

    it('base example, visually looks correct', async () => {
        //APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=additemform--add-item-form-example&viewMode=story');
        const image = await page.screenshot();

        //APIs from jest-snapshot
        expect(image).toMatchImageSnapshot();
    })
})