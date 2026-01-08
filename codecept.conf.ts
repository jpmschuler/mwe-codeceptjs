import {setHeadlessWhen, setCommonPlugins} from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
	tests: './*_test.ts',
	output: './.Build/testOutput',
	helpers: {
		Playwright: {
			browser: 'chromium',
			url: 'https://example.org',
			show: true
		},
		PixelmatchHelper: {
			require: "codeceptjs-pixelmatchhelper",
			dirExpected: "./.Build/testOutput/screenshot.expected/",
			dirDiff: "./.Build/testOutput/screenshot.diff/",
			dirActual: "./.Build/testOutput/screenshot.actual/",
			diffPrefix: "./",
			tolerance: 1.5,
			threshold: 0.1,
			dumpIntermediateImage: false,
			captureActual: true,
			captureExpected: true,
		},
	},
	include: {
		I: './steps_file'
	},
	plugins: {
		htmlReporter: {
			enabled: true,
			output: "./.Build/testOutput/report",
			reportFileName: 'report.html',
			includeArtifacts: true,
			showSteps: true,
			showSkipped: true,
		},
		screenshotOnFail: {
			enabled: true,
			uniqueScreenshotNames: true,
			fullPageScreenshots: true,
		},
	},
	name: 'mwe-codeceptjs'
}
