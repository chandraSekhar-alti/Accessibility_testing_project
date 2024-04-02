import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from 'fs';

test('Accessibility Testing', async ({ page }) => {
  await page.goto("https://www.amazon.com");
  await page.waitForTimeout(5000);

  try {
    // Run Axe analysis and store results
    const results = await new AxeBuilder({ page }).analyze();

    // Generate HTML report
    const reportHtml = AxeBuilder.createReport(results);

    // Write report to file
    writeFileSync('accessibility_report.html', reportHtml, 'utf-8');
    
    console.log('Accessibility report generated: accessibility_report.html');

    // Attach results to the test report
    await test.attach('accessibilityScanResults', {
      name: 'Accessibility Scan Results',
      contentType: 'text/html',
      body: reportHtml,
    });

    // Assert no violations found
    expect(results.violations).toHaveLength(0);
  } catch (e) {
    // Handle any errors
    console.error('Error occurred during accessibility testing:', e);
  }
});
