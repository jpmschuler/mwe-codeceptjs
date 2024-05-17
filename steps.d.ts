/// <reference types='codeceptjs' />
type stepsFile = typeof import("./tests/config/steps-file.js");
type ChaiWrapper = import("codeceptjs-chai");
type Testmail = import("codeceptjs-testmailapp-helper");
type PixelMatchHelper = import("codeceptjs-pixelmatchhelper");
type Mochawesome = typeof import("codeceptjs/lib/helper/Mochawesome");
type tryTo = typeof import("codeceptjs/lib/plugin/tryTo");

declare namespace CodeceptJS {
	interface SupportObject {
		I: I;
		current: any;
	}

	interface Methods
		extends ChaiWrapper,
			Testmail,
			Playwright,
			PixelMatchHelper,
			FileSystem,
			Mochawesome {}

	interface I
		extends ReturnType<stepsFile>,
			WithTranslation<ChaiWrapper>,
			WithTranslation<Testmail>,
			WithTranslation<PixelMatchHelper>,
			WithTranslation<FileSystem>,
			WithTranslation<Mochawesome> {}

	namespace Translation {
		interface Actions {}
	}
}
