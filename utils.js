// utils.js
import { createHtmlReport } from "axe-html-reporter";
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';

export function generateAccessibilityReport(axeBuilder, reportFileName, directoryPath) {
  try {
    const reportHTML = createHtmlReport({
      results: axeBuilder,
      options: {
        projectKey: reportFileName,
      },
    });

    const reportPath = `${directoryPath}/${reportFileName}.html`;

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    }

    if (!existsSync(reportPath)) {
      writeFileSync(reportPath, '');
      console.log(`Report file created: ${reportPath}`);
    }

    writeFileSync(reportPath, reportHTML);
    console.log(`Report generated at: ${reportPath}`);

    exec(`start ${reportPath}`);
  } catch (error) {
    console.error('Error occurred during accessibility testing:', error);
  }
}