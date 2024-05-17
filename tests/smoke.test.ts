Feature("MWE smoke test");

Scenario("Check if legal notice is fine", async ({ I }) => {
	const fs = require("fs");
	I.amOnPage("https://demo.typo3.org/legal-notice/");
	I.see("Dispute resolution");
	I.see("Liability for Contents");
}).tag("@smoke");

Scenario("Check if backend login works", async ({ I }) => {
	const fs = require("fs");
	I.amOnPage("https://demo.typo3.org/typo3/");
	I.fillField("#t3-username", process.env.TYPO3_EDITOR_USERNAME);
	// no password in demo system
	//I.fillField('#t3-password', secret(process.env.TYPO3_EDITOR_PASSWORD));
	I.forceClick("#t3-login-submit");
	I.waitForVisible({ css: ".toolbar-item-name" }, 10);
}).tag("@smoke");
