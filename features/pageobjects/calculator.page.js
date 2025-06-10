class CalculatorPage {
    get ageInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentIncomeInput() { return $('#current-income'); }
    get spouseIncomeInput() { return $('#spouse-income'); }
    get maritalStatusDropdown() { return $('#marital-status'); }
    get yesSocialSecurityRadio() { return $('#yes-social-benefits'); }
    get noSocialSecurityRadio() { return $('#no-social-benefits'); }
    get currentSavingsInput() { return $('#current-total-savings'); }
    get annualSavingsInput() { return $('#current-annual-savings'); }
    get savingsIncreaseRateInput() { return $('#savings-increase-rate'); }
    get calculateButton() { return $('button*=Calculate'); }
    get resultsHeader() { return $('h3*=Results'); }

    // Iframe and Result
    get resultIframe() { return $('iframe[title="Retirement Calculator Tool"]'); }
    get resultValue() { return $('div#results-summary .results-value'); }

    async selectMaritalStatus(status) {
        await this.maritalStatusDropdown.selectByVisibleText(status);
    }

    async selectSocialSecurity(option) {
        if (option.toLowerCase() === 'yes') {
            const label = await $('label[for="yes-social-benefits"]');
            await label.click(); 
        } else {
            const label = await $('label[for="no-social-benefits"]');
            await label.click();
        }
    }
    async closeCookieBannerIfPresent() {
    try {
        const closeBtn = await $('//*[@id="onetrust-close-btn-container"]/button');

        if (await closeBtn.isDisplayed()) {
            console.log('Cookie popup detected. Attempting to close...');
            await closeBtn.click();
            console.log('Cookie popup closed.');
        } else {
            console.log('Cookie popup not displayed.');
        }
    } catch (error) {
        console.warn('Error while trying to close cookie popup:', error.message);
    }
}



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


module.exports = new CalculatorPage();
