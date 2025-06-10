Feature: Calculate retirement savings

  Scenario: Fill out form and view results
    Given I am on the retirement calculator page
    When I enter current age as "40"
    And I enter retirement age as "65"
    And I enter current income as "100000"
    And I enter spouse income as "50000"
    And I enter current savings as "20000"
    And I enter annual savings as "10000"
    And I enter savings increase rate as "5"
    And I click on the Calculate button
    Then I should see the results section
    And I should see and log the result value
