import { expect } from '@wdio/globals';

class CalculatorPage {
    // Define selectors
    get cookieBannerButton() { return $('#onetrust-accept-btn-handler'); }

    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentIncomeInput() { return $('#current-income'); }
    get spouseIncomeInput() { return $('#spouse-income'); }
    get currentSavingsInput() { return $('#current-total-savings'); }
    get annualSavingsInput() { return $('#current-annual-savings'); }
    get savingsIncreaseRateInput() { return $('#savings-increase-rate'); }
    get socialSecurityOverrideInput() { return $('#social-security-override'); }

    get socialSecurityYesLabel() { return $('label[for="yes-social-benefits"]'); }
    get socialSecurityNoLabel() { return $('label[for="no-social-benefits"]'); }
    get marriedLabel() { return $('label[for="married"]'); }
    get singleLabel() { return $('label[for="single"]'); }

    //get calculateButton() { return $('#calculate'); }
    get calculateButtonXpath() { return $('//*[@id="retirement-form"]/div[4]/div[2]/div[1]/button'); }


    async acceptCookies() {
        if (await this.cookieBannerButton.isDisplayed()) {
            await this.cookieBannerButton.waitForClickable({ timeout: 5000 });
            await this.cookieBannerButton.click();
            console.log(' Cookie banner closed');
        }
    }

    async goToCalculatorPage() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
        await browser.pause(1000);
    }

    async setInputValue(inputElement, value, label) {
        value = String(value);
        await inputElement.scrollIntoView();
        await inputElement.waitForDisplayed({ timeout: 5000 });

        for (let i = 0; i < 3; i++) {
            await inputElement.click();
            await inputElement.clearValue();
            await inputElement.setValue(value);
            await browser.pause(200);

            const currentVal = await inputElement.getValue();
            const normalizedActual = currentVal.replace(/[^0-9]/g, '');
            const normalizedExpected = value.replace(/[^0-9]/g, '');

            if (normalizedActual === normalizedExpected) {
                console.log(`  Setting [${label}]: "${value}"`);
                return;
            }
        }

        throw new Error(` Failed to set [${label}] to "${value}"`);
    }

    async fillRetirementForm(data) {
        await this.acceptCookies();

        await this.setInputValue(this.currentAgeInput, data.currentAge, 'Current Age');
        await this.setInputValue(this.retirementAgeInput, data.retirementAge, 'Retirement Age');
        await this.setInputValue(this.currentIncomeInput, data.currentIncome, 'Current Income');
        await this.setInputValue(this.spouseIncomeInput, data.spouseIncome, 'Spouse Income');
        await this.setInputValue(this.currentSavingsInput, data.currentSavings, 'Current Savings');
        await this.setInputValue(this.annualSavingsInput, data.annualSavings, 'Annual Savings');
        await this.setInputValue(this.savingsIncreaseRateInput, data.savingsIncreaseRate, 'Savings Increase Rate');

        const socialSecurity = String(data.socialSecurity).toLowerCase();

        if (socialSecurity === 'yes') {
            await this.socialSecurityYesLabel.scrollIntoView();
            await this.socialSecurityYesLabel.waitForClickable({ timeout: 5000 });
            await this.socialSecurityYesLabel.click();

            await browser.pause(500);

            await browser.waitUntil(
                async () => await this.marriedLabel.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: ' Marital options not visible after enabling Social Security',
                }
            );

            const status = String(data.maritalStatus).toLowerCase();
            if (status === 'married') {
                await this.marriedLabel.waitForClickable({ timeout: 5000 });
                await this.marriedLabel.click();
            } else if (status === 'single') {
                await this.singleLabel.waitForClickable({ timeout: 5000 });
                await this.singleLabel.click();
            }

            //  OPTIONAL: Fill override if provided
            if (data.socialSecurityOverride && data.socialSecurityOverride.trim() !== '') {
                await this.setInputValue(
                    this.socialSecurityOverrideInput,
                    data.socialSecurityOverride,
                    'Social Security Override'
                );
            }
        } else {
            await this.socialSecurityNoLabel.waitForClickable({ timeout: 5000 });
            await this.socialSecurityNoLabel.click();
        }

        //  Fix for Calculate button not clickable
        // await this.calculateButton.scrollIntoView();
        // await this.calculateButton.waitForDisplayed({ timeout: 5000 });
        // await this.calculateButton.waitForEnabled({ timeout: 5000 });
        // await this.calculateButton.waitForClickable({ timeout: 5000 });
        //await this.calculateButton.click();
        await this.calculateButtonXpath.click();

        console.log(' Submitted form');
    }

    // Extracts the result text from the result panel
async getMainResultText() {
    try {
        const resultElement = await $('//*[@id="result-message"]/strong');
        await resultElement.waitForDisplayed({ timeout: 10000 });
        const resultText = await resultElement.getText();
        console.log(' Retirement result found:', resultText);
        return resultText;
    } catch (error) {
        console.error(' Could not find retirement result:', error.message);
        return null;
    }
}


}

export default new CalculatorPage();
