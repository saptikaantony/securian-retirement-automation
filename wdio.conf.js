exports.config = {
    runner: 'local',

    specs: ['./features/**/*.feature'],
    exclude: [],

    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],

    //
    // ✅ Minimal log level for clean console
    logLevel: 'error',
    // ✅ Don't write to log files
    outputDir: undefined,

    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'cucumber',

    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/retirementSteps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
};
