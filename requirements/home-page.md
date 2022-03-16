# Feature: / Missing Profile Data
  Given User has no name
    Or User is not a Personal And User is not a Student
  When User Access /
  Then User should be redirected to /fill-profile

# Feature: / CreateAdviceSection
  Given User is a Personal
  When User access /
  Then PersonalAdviceRequestForm should be rendered

  Given User is a Student
  When User access /
  Then StudentAdviceRequestForm should be rendered

## Component: PersonalAdviceRequestForm
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

## Component: StudentAdviceRequestForm
  Given User is a Student
    And User filled input with an existing Student name
  When User submit form
  Then should be created an Advice Request from Student to Student

  Given User is a Student
    And User filled input with an not existing Student name
  When User submit form
  Then a "Student not found" error message should be rendered

  Given User is not a Student
    And User filled input
  When User submit form
  Then a "You are not a Student" error message should be rendered

# Feature: / AdviceListSection
  Given User is a Personal 
    And this Personal has Advices
  When User access /
  Then Personal Advices should be listed

  Given User is a Personal
    And this Personal has no Advices
  When User access /
  Then "No advices found" message should be displayed.

  Given User is a Student 
    And this Student has Advices
  When User access /
  Then Student Advices should be listed

  Given User is a Personal
    And this Student has no Advices
  When User access /
  Then "No advices found" message should be displayed.

# Feature / MyTrainingsSection
  Given User has Planning Trainings
  When User Access /
  Then User Planning Trainings should be rendered