// In this file you can append custom step methods to 'I' object
const fs = require("fs");
const assert = require("assert");
const sharp = require("sharp");

module.exports = function () {
	return actor({
		async visualRegressionTestSite(currentPage) {
			return await this.visualRegressionTest(
				currentPage.title,
				currentPage.device,
				currentPage.urlExpected,
				currentPage.urlActual,
			);
		},
		async visualRegressionTest(testtitle, device, urlExpected, urlActual) {
			const {
				clearString,
			} = require("../../node_modules/codeceptjs/lib/utils.js");
			const allure = codeceptjs.container.plugins("allure");
			const AllureCommon = require("allure-js-commons");

			let element = "body";
			const filename =
				clearString(testtitle) +
				"-" +
				device +
				"-" +
				clearString(element) +
				".png";
			const messagePrefix = `visualRegressionTest ${testtitle}:`;
			allure.setDescription(
				`visualRegressionTest with screen size ${device} for ${testtitle}.<ul><li><a href="${urlExpected}">${urlExpected}</a></li><li><a href="${urlActual}">${urlActual}</a></li></ul>`,
				"html",
			);
			switch (device) {
				case "mobile":
					this.resizeWindow(720, 400);
					break;
				case "tablet":
					this.resizeWindow(960, 2000);
					break;
				default:
					this.resizeWindow(1280, 2000);
			}

			this.amOnPage(urlExpected);
			this.wait(1); // to ease this example
			await this.takeScreenshot(filename, "expected", element).then();

			this.amOnPage(urlActual);
			this.wait(1); // to ease this example
			await this.takeScreenshot(filename, "actual", element).then();

			const fileExpected =
				require("codeceptjs").config.get("helpers").PixelmatchHelper
					.dirExpected + filename;
			const fileActual =
				require("codeceptjs").config.get("helpers").PixelmatchHelper
					.dirActual + filename;
			await this.adaptImageCanvasForCompareIfNecessary(
				fileExpected,
				fileActual,
			);

			const diffResult = await this.getVisualDifferences(filename, {
				captureActual: false,
				captureExpected: false,
			});

			if (!diffResult.match) {
				allure.addScreenDiff(
					"Diff image for " + filename,
					fs.readFileSync(fileExpected, { encoding: "base64" }),
					fs.readFileSync(fileActual, { encoding: "base64" }),
					fs.readFileSync(
						require("codeceptjs").config.get("helpers")
							.PixelmatchHelper.dirDiff + diffResult.diffImage,
						{ encoding: "base64" },
					),
				);
				assert.fail(
					`${messagePrefix} Screenshots too different. Difference is ${diffResult.difference} % `,
				);
			}
			this.say(
				`Screenshots similar enough. Difference is ${diffResult.difference} % `,
			);
		},

		async adaptImageCanvasForCompareIfNecessary(fileExpected, fileActual) {
			const expectedImage = sharp(fs.readFileSync(fileExpected));
			const actualImage = sharp(fs.readFileSync(fileActual));
			const expectedImageMetadata = await expectedImage.metadata();
			const actualImageMetadata = await actualImage.metadata();
			const maximumWidth = Math.max(
				expectedImageMetadata.width,
				actualImageMetadata.width,
			);
			const maximumHeight = Math.max(
				expectedImageMetadata.height,
				actualImageMetadata.height,
			);

			if (
				expectedImageMetadata.width !== actualImageMetadata.width ||
				expectedImageMetadata.height !== actualImageMetadata.height
			) {
				this.say(
					`Screenshots have different dimensions; increasing canvas to ${maximumWidth}x${maximumHeight}`,
				);
				const newExpectedImage = await expectedImage
					.resize({
						width: maximumWidth,
						height: maximumHeight,
						fit: "contain",
						position: "left top",
					})
					.png()
					.toFile(fileExpected);
				const newActualImage = await actualImage
					.resize({
						width: maximumWidth,
						height: maximumHeight,
						fit: "contain",
						position: "left top",
					})
					.png()
					.toFile(fileActual);
			}
		},
	});
};
