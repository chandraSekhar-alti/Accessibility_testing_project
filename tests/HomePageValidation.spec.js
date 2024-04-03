import { test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { generateAccessibilityReport } from '../utils.js'

const directoryPath = 'test-results' // Defining the directory path where accessibility reports will be stored

test('Validate FlipCart login page accessibility rules as per WCAG', async ({
  page
}) => {
  //Launching the web page
  await page.goto('https://www.flipkart.com/')
  // Perform accessibility analysis on the current page using AxeCore, storing the results in axeBuilder.
  const axeBuilder = await new AxeBuilder({ page }).analyze()
  const reportFileName = 'flipcartHomePageReport' // Defining the filename for the FlipCart homepage accessibility report
  // Generating the accessibility report for the FlipCart homepage
  generateAccessibilityReport(axeBuilder, reportFileName, directoryPath)
})

test('Validate Myntra login page accessibility rules as per WCAG', async ({
  page
}) => {
  await page.goto('https://www.myntra.com/')
  // Perform accessibility analysis on the current page using AxeCore, storing the results in axeBuilder.
  const axeBuilder = await new AxeBuilder({ page })
    .disableRules([
      // Disabling specific accessibility rules for Myntra homepage analysis
      'color-contrast',
      'heading-order',
      'image-alt',
      'link-in-text-block',
      'link-name',
      'list',
      'meta-viewport',
      'region'
    ])
    .analyze()
  const reportFileName = 'myntraHomePageReport' // Defining the filename for the Myntra homepage accessibility report
  // Generating the accessibility report for the Myntra homepage
  generateAccessibilityReport(axeBuilder, reportFileName, directoryPath)
})

test('Validate Amazon login page accessibility rules as per WCAG', async ({
  page
}) => {
  await page.goto('https://www.amazon.com')
  try {
    // Perform accessibility analysis on the current page using AxeCore, storing the results in axeBuilder.
    const axeBuilder = await new AxeBuilder({ page }).analyze()
    const reportFileName = 'amazonHomepageReport' // Defining the filename for the Amazon homepage accessibility report
    // Generating the accessibility report for the Amazon homepage
    generateAccessibilityReport(axeBuilder, reportFileName, directoryPath)
  } catch (error) {
    console.error('Error occurred during accessibility testing:', error)
  }
})
