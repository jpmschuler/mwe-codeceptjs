require("dotenv").config({ path: "./.env.defaults" });
require("dotenv").config();
const { setHeadlessWhen } = require("@codeceptjs/configure");

// Turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
	name: "mwe-codeceptjs",
	tests: "./tests/*.test.ts",
	output: "./tests/output/test/",
	helpers: {
		Playwright: {
			url: undefined,
			basicAuth: { username: "web", password: "relaunch" },
			restart: true,
			show: false,
			keepCookies: false,
			timeout: 10000,
			browser: "chromium",
			chrome: {
				args: ["--no-sandbox", "--disable-notifications"],
			},
			firefox: {
				args: [
					"--no-sandbox",
					"--ignore-certificate-errors",
					"--disable-notifications",
				],
			},
			chromium: {
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-notifications",
					"--single-process",
					"--ignore-certificate-errors",
				],
			},
		},
		PixelmatchHelper: {
			require: "codeceptjs-pixelmatchhelper",
			dirExpected: "./tests/output/screenshot.expected/",
			dirDiff: "./tests/output/screenshot.diff/",
			dirActual: "./tests/output/screenshot.actual/",
			diffPrefix: "./",
			tolerance: 1.5,
			threshold: 0.1,
			dumpIntermediateImage: false,
			captureActual: true,
			captureExpected: true,
		},
		FileSystem: {},
	},
	systems: {
		baseDomainSuffix: null,
		testDomainSuffix: null,
	},
	include: {
		I: "./tests/config/steps-file.js",
	},
	bootstrap: null,
	plugins: {
		allure: {
			enabled: true,
			require: "@codeceptjs/allure-legacy",
			outputDir: "./tests/allure-results/",
			enableScreenshotDiffPlugin: true,
		},
		pauseOnFail: {},
		retryFailedStep: {
			enabled: false,
		},
		tryTo: {
			enabled: true,
		},
		screenshotOnFail: {
			enabled: true,
			uniqueScreenshotNames: true,
			screenshotFolder: "./tests/output/failed/",
		},
	},
	require: ["assert", "fs", "codeceptjs/lib/utils"],
};
