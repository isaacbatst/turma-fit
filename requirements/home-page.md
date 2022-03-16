# Feature: /personal/advices CreateSection
  Given User is a Personal
  When User access /personal/advices
  Then AdviceRequestForm should be rendered

  Given User is not a Personal
  When User access /personal/advices
  Then TrainOthersButton should be rendered

# Feature: AdviceRequestForm
  Given User is a Personal
    And User filled input with an existing Student name
  When User submit form
  Then should be created an Advice Request from Personal to Student

  Given User is a Personal
    And User filled input with an not existing Student name
  When User submit form
  Then a "Student not found" error message should be rendered

  Given User is not a Personal
    And User filled input
  When User submit form
  Then a "You are not a Personal" error message should be rendered

# Feature: TrainOthersButton
  Given User is not a Personal
  When User clicks TrainOthersButton
  Then User should be a Personal

# Feature: /personal/advices ListSection
  Given User is a Personal 
    And this Personal has Advices
  When User access /personal/advices
  Then Personal Advices should be listed

  Given User is a Personal
    And this Personal has no Advices
  When User access /personal/advices
  Then TrainMyselfButton should be rendered

  Given User is not a Personal
  When User access /personal/advices
  Then TrainMyselfButton should be rendered

# Feature: TrainMyself button
  Given User is not a Personal
    And User is not a Student
  When User clicks TrainMyselfButton
  Then User should be a Student
    And User should be a Personal
    And these Student and Personal should have an active Advice