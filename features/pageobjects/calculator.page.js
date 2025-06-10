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

    async waitForPageResultText(expectedText) {
    // Retry up to 10 seconds
    const timeout = 10000;
    const start = Date.now();

    while (Date.now() - start < timeout) {
        const pageSource = await browser.getPageSource();

        if (pageSource.includes(expectedText)) {
            console.log('\n Found expected result in page: ' + expectedText);
            return;
        }

        await browser.pause(500); // Wait before next try
    }

    throw new Error(` Result text "${expectedText}" not found in page after ${timeout}ms`);
}

}


module.exports = new CalculatorPage();
