Feature('CodeceptJS demo')

Scenario('check Welcome page on site', ({ I }) => {
	I.amOnPage('/');
	I.see('Learn more');
})

Scenario('fail due to missing text', ({ I }) => {
	I.amOnPage('/');
	I.see('Meep meep');
})

const testData = new DataTable(["url", "word"]);
testData.add(["https://example.org/","Learn more"]);
testData.add(["https://example.org/\"","bar"]);
testData.add(["https://testpages.eviltester.com/pages/basics/basic-web-page/","Basic Web Page"]);
testData.add(["https://testpages.eviltester.com/pages/basics/basic-web-page/","Foo"]);


Data(testData).Scenario('check multiple urls', ({ I,current }) => {
	I.amOnPage(current.url);
	I.see(current.word);
})
