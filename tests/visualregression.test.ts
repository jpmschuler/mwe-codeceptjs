const sites = new DataTable(["title", "device", "urlExpected", "urlActual"]); //
sites.add([
	"Demo T3O: Check if main matches for EN and DE",
	"desktop",
	"https://demo.typo3.org",
	"https://demo.typo3.org/de/",
]);
sites.add([
	"Demo T3O: Check if cinnamon oats matches for EN and DE",
	"mobile",
	"https://demo.typo3.org/recipes/apple-cinnamon-overnight-oats/",
	"https://demo.typo3.org/de/rezepte/zimt-overnight-oats/",
]);

Feature("MWE visual regression test");
Data(sites)
	.Scenario("Screenshot Regression", async function ({ I, current }) {
		this.title = `${current.title}`;
		await I.retry(2).visualRegressionTestSite(current);
	})
	.tag("@visualregression")
	.tag("@currenttodo");
