Feature('MWE');

Scenario('test something', async ({I}) => {
    I.amOnPage('https://demo.typo3.org/typo3/login');
    I.waitForElement('#t3-username', 10)
    I.fillField('#t3-username', 'editor');
    I.forceClick('#t3-login-submit');
    I.waitForText('editor', 15, '.toolbar-item-name');
    I.amOnPage('https://demo.typo3.org/typo3/record/edit?edit%5Btt_content%5D%5B424%5D=edit');
    await I.waitForElement({css: 'iframe#typo3-contentIframe'}, 10);
    I.switchTo('#typo3-contentIframe');
    await I.waitForInvisible('#t3js-ui-block', 15);
    await I.waitForElement({css: 'a.cke_button__link'}, 10);
}).tag("@myTag");
