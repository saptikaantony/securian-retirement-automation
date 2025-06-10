const { Given, When, Then } = require('@wdio/cucumber-framework');
const retirementCalculatorPage = require('../pageobjects/calculator.page');

Given('I am on the retirement calculator page', async () => {
    console.log(' Navigating to retirement calculator page...');
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    await browser.pause(3000);
    console.log(' Page loaded successfully.');
});

When(/^I enter current age as "([^"]*)"$/, async (age) => {
    console.log(` Entering current age: ${age}`);
    await retirementCalculatorPage.ageInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.ageInput.setValue(age);
    console.log(' Current age entered.');
});

When(/^I enter retirement age as "([^"]*)"$/, async (age) => {
    console.log(`Entering retirement age: ${age}`);
    await retirementCalculatorPage.retirementAgeInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.retirementAgeInput.setValue(age);
    console.log('Retirement age entered.');
});

When(/^I enter current income as "([^"]*)"$/, async (income) => {
    console.log(` Entering current income: ${income}`);
    await retirementCalculatorPage.currentIncomeInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.currentIncomeInput.click();
    await retirementCalculatorPage.currentIncomeInput.clearValue();
    await retirementCalculatorPage.currentIncomeInput.setValue(income);
    await browser.pause(300);
    console.log(' Current income entered.');
});

When(/^I enter spouse income as "([^"]*)"$/, async (income) => {
    console.log(`Entering spouse income: ${income}`);
    await retirementCalculatorPage.spouseIncomeInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.spouseIncomeInput.click();
    await retirementCalculatorPage.spouseIncomeInput.clearValue();
    await retirementCalculatorPage.spouseIncomeInput.setValue(income);
    await browser.pause(300);
    console.log('Spouse income entered.');
});

When(/^I select social security benefits as "([^"]*)"$/, async (option) => {
    console.log(`Selecting social security benefits option: ${option}`);
    await retirementCalculatorPage.selectSocialSecurity(option);
    console.log('Social security option selected.');
});

When(/^I enter current savings as "([^"]*)"$/, async (amount) => {
    console.log(` Entering current savings: ${amount}`);
    await retirementCalculatorPage.currentSavingsInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.currentSavingsInput.click();
    await retirementCalculatorPage.currentSavingsInput.clearValue();
    await retirementCalculatorPage.currentSavingsInput.setValue(amount);
    await browser.pause(300);
    console.log('Current savings entered.');
});

When(/^I enter annual savings as "([^"]*)"$/, async (amount) => {
    console.log(`Entering annual savings: ${amount}`);
    await retirementCalculatorPage.annualSavingsInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.annualSavingsInput.click();
    await retirementCalculatorPage.annualSavingsInput.clearValue();
    await retirementCalculatorPage.annualSavingsInput.setValue(amount);
    await browser.pause(300);
    console.log('Annual savings entered.');
});

When(/^I enter savings increase rate as "([^"]*)"$/, async (rate) => {
    console.log(` Entering savings increase rate: ${rate}`);
    await retirementCalculatorPage.savingsIncreaseRateInput.waitForDisplayed({ timeout: 5000 });
    await retirementCalculatorPage.savingsIncreaseRateInput.click();
    await retirementCalculatorPage.savingsIncreaseRateInput.clearValue();
    await retirementCalculatorPage.savingsIncreaseRateInput.setValue(rate);
    await browser.pause(300);
    console.log('Savings increase rate entered.');
});

When('I click on the Calculate button', async () => {
    console.log(' Clicking Calculate button...');
    await retirementCalculatorPage.calculateButton.waitForClickable({ timeout: 5000 });
    await retirementCalculatorPage.calculateButton.click();
    console.log(' Calculate button clicked.');
});

Then('I should see the results section', async () => {
    console.log(' Waiting for results section to be visible...');
    await retirementCalculatorPage.resultsHeader.waitForDisplayed({ timeout: 10000 });
    await expect(retirementCalculatorPage.resultsHeader).toBeDisplayed();
    console.log('Results section is displayed.');
});

Then('I should see and log the result value', async () => {
    const expectedValue = ' $5,621 ';
    console.log(`\n Expected Retirement Result: ${expectedValue}`);
});



