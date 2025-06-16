import { join } from 'path';

export const config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
  }],
  logLevel: 'error',
  baseUrl: 'https://www.securian.com/insights-tools/retirement-calculator.html',
  waitforTimeout: 10000,
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    require: ['./features/step-definitions/*.js'],
    timeout: 60000,
  },
  services: ['chromedriver'],
};
