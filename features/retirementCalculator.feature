Feature: Retirement Calculator

  Background:
    Given I am on the retirement calculator page

  Scenario: Calculate retirement amount with valid inputs
  When I fill out the retirement form with the following data:
  | currentAge             | 35       |
  | retirementAge          | 65       |
  | currentIncome          | 90000    |
  | spouseIncome           | 50000    |
  | currentSavings         | 20000    |
  | annualSavings          | 100   |
  | savingsIncreaseRate    | 2        |
  | socialSecurity         | Yes      |
  | maritalStatus          | Married  |
  | socialSecurityOverride | 1500     |


    Then I should see the result displayed
