import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { generateAccessibilityReport } from "../utils.js";

const directoryPath = "test-results";

test("Validate FlipCart login page accessibility rules as per WCAG", async ({
  page,
}) => {
  await page.goto("https://www.flipkart.com/");
  const axeBuilder = await new AxeBuilder({ page }).analyze();
  const reportFileName = "flipcartHomePageReport";
  generateAccessibilityReport(axeBuilder, reportFileName, directoryPath);
});

test("Validate Myntra login page accessibility rules as per WCAG", async ({
  page,
}) => {
  await page.goto("https://www.myntra.com/");
  const axeBuilder = await new AxeBuilder({ page })
    .disableRules([
      "color-contrast",
      "heading-order",
      "image-alt",
      "link-in-text-block",
      "link-name",
      "list",
      "meta-viewport",
      "region",
    ])
    .analyze();
  const reportFileName = "myntraHomePageReport";
  generateAccessibilityReport(axeBuilder, reportFileName, directoryPath);
});

test("Validate Amazon login page accessibility rules as per WCAG", async ({
  page,
}) => {
  await page.goto("https://www.amazon.com");

  try {
    const axeBuilder = await new AxeBuilder({ page }).analyze();
    const reportFileName = "amazonHomepageReport";
    generateAccessibilityReport(axeBuilder, reportFileName, directoryPath);
  } catch (error) {
    console.error("Error occurred during accessibility testing:", error);
  }
});
