// utils.js

// Importing necessary modules for generating accessibility reports
import { createHtmlReport } from "axe-html-reporter"; // Importing createHtmlReport function from axe-html-reporter
import { writeFileSync, existsSync, mkdirSync } from 'fs'; // Importing file system functions for file operations
import { exec } from 'child_process'; // Importing exec function from child_process for executing commands

// Function to generate an accessibility report
export function generateAccessibilityReport(axeBuilder, reportFileName, directoryPath) {
  try {
    // Generate HTML report using AxeCore analysis results
    const reportHTML = createHtmlReport({
      results: axeBuilder,
      options: {
        projectKey: reportFileName, // Set project key for the report
      },
    });

    // Define the path for the accessibility report
    const reportPath = `${directoryPath}/${reportFileName}.html`;

    // Create the directory if it doesn't exist
    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    }

    // Create the report file if it doesn't exist
    if (!existsSync(reportPath)) {
      writeFileSync(reportPath, ''); // Create an empty file
      console.log(`Report file created: ${reportPath}`);
    }

    // Write the HTML report to the file
    writeFileSync(reportPath, reportHTML);
    console.log(`Report generated at: ${reportPath}`);

    // Open the report file in the default browser
    exec(`start ${reportPath}`);
  } catch (error) {
    // Handle errors that occur during accessibility testing
    console.error('Error occurred during accessibility testing:', error);
  }
}
