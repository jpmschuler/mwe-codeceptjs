require('dotenv').config({path: './.env.defaults'});
require('dotenv').config();
const {setHeadlessWhen} = require('@codeceptjs/configure');

// Turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
    name: 'typo3-wiwi_uni-due_de',
    tests: './tests/*.test.js',
    output: './tests/output/test',
    helpers: {
        Testmail: {
            apiKey: '57291da5-0374-4a1a-83a9-9b0aa565b71a',
            namespace: '8tnsa',
            require: 'codeceptjs-testmailapp-helper',
        },
        Playwright: {
            // URL is set at the bottom of file for multi-system-config
            url: null,
            show: false,
            keepCookies: false,
            browser: 'chromium',
            chrome: {
                args: ['--no-sandbox', '--disable-notifications'],
            },
            chromium: {
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--single-process', '--ignore-certificate-errors'],
            },
        },
        ResembleHelper: {
            require: 'codeceptjs-resemblehelper',
            screenshotFolder: './tests/output/test',
            baseFolder: './tests/output/base',
            diffFolder: './tests/output/diff',
            uniqueScreenshotNames: true,
        },
        FileSystem: {},
        Mochawesome: {
            uniqueScreenshotNames: true,
        },
    },
    systems: {
        baseDomainSuffix: null,
        testDomainSuffix: null,
    },
    bootstrap: null,
    plugins: {
        pauseOnFail: {},
        tryTo: {
            enabled: true,
        },
        screenshotOnFail: {
            enabled: true,
            uniqueScreenshotNames: true,
            screenshotFolder: './tests/output/failed/',
        },
        autoLogin: {
            enabled: true,
            saveToFile: true,
            inject: 'loginAs',
            users: {
                editor: {
                    login: async I => {
                        I.resizeWindow(1280, 2000); // Sounds silly, but the username field is not available else
                        I.amOnPage('/typo3');
                        I.fillField('#t3-username', process.env.TYPO3_EDITOR_USERNAME);
                        I.fillField('#t3-password', process.env.TYPO3_EDITOR_PASSWORD);
                        I.click('#t3-login-submit');
                        I.waitForText(process.env.TYPO3_EDITOR_USERLABEL, 5, '.toolbar-item-name');
                    },
                    check: async I => {
                        I.amOnPage('/typo3/index.php?route=%2Fmain');
                        I.seeInCurrentUrl('/typo3/index.php?route=%2Fmain');
                    },
                },
            },
        },
    },
    require: ['assert', 'fs', 'codeceptjs/lib/utils', 'codeceptjs/lib/helper/Mochawesome', 'mochawesome'],
};

exports.config.helpers.Playwright.url = process.env.CODECEPT_URL;
exports.config.systems.baseDomainSuffix = process.env.CODECEPT_BASEDOMAINSUFFIX;
exports.config.systems.testDomainSuffix = process.env.CODECEPT_TESTDOMAINSUFFIX;

if (process.env.CODECEPT_TARGETSYSTEM === 'PRODUCTION') {
    exports.config.helpers.Playwright.url = process.env.CODECEPT_URL_PRODUCTION;
    exports.config.systems.testDomainSuffix = process.env.CODECEPT_TESTDOMAINSUFFIX_PRODUCTION;
}

if (process.env.CODECEPT_TARGETSYSTEM === 'DEV') {
    exports.config.helpers.Playwright.url = process.env.CODECEPT_URL_DEV;
    exports.config.systems.testDomainSuffix = process.env.CODECEPT_TESTDOMAINSUFFIX_DEV;
}

if (process.env.CODECEPT_TARGETSYSTEM === 'NEXTLTS') {
    exports.config.helpers.Playwright.url = process.env.CODECEPT_URL_NEXTLTS;
    exports.config.systems.testDomainSuffix = process.env.CODECEPT_TESTDOMAINSUFFIX_NEXTLTS;
}

if (process.env.CODECEPT_TARGETSYSTEM === 'BASE') {
    exports.config.helpers.Playwright.url = process.env.CODECEPT_URL_BASE;
    exports.config.systems.testDomainSuffix = process.env.CODECEPT_TESTDOMAINSUFFIX_BASE;
}
