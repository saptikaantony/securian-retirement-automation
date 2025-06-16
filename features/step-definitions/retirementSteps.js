import { Given, When, Then } from '@wdio/cucumber-framework';
import calculatorPage from '../pageobjects/calculator.page.js';
import { expect } from 'chai';

Given('I am on the retirement calculator page', async () => {
    await calculatorPage.goToCalculatorPage();
});
When('I fill out the retirement form with the following data:', async (dataTable) => {
    const data = dataTable.rowsHash();
    await calculatorPage.fillRetirementForm({
        currentAge: data.currentAge,
        retirementAge: data.retirementAge,
        currentIncome: data.currentIncome,
        spouseIncome: data.spouseIncome,
        currentSavings: data.currentSavings,
        annualSavings: data.annualSavings,
        savingsIncreaseRate: data.savingsIncreaseRate, 
        maritalStatus: data.maritalStatus,
        socialSecurityOverride: data.socialSecurityOverride 
    });
});


Then('I should see the result displayed', async () => {
    const result = await calculatorPage.getMainResultText();
    expect(result).to.not.be.null;
    console.log(' Final result:', result);
});

