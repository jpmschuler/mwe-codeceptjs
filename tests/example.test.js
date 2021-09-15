Feature('MWE');

Scenario('test something', async ({I}) => {
    let filename = 'mwe-screenshot.png';
    I.amOnPage("https://www.google.com/");
    await I.saveScreenshot(filename, true).then();
    await I.seeVisualDiff(filename, {
        tolerance: 0,
        prepareBaseImage: true
    }).then();

    I.amOnPage("https://www.lego.com/");
    await I.saveScreenshot(filename, true).then();
    await I.seeVisualDiff(filename, {
        tolerance: 0,
        prepareBaseImage: false
    }).then();
}).tag("@myTag");
