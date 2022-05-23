Feature('MWE');

Scenario('test something', async ({I}) => {
    const fs = require('fs');
    I.amOnPage('https://www.github.com');
    I.wait(5);
    I.see('Where the world builds');
});
