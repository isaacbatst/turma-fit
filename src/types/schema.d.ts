import { Exercise, ExerciseSerie, Personal, Prisma, Student, Training, TrainingPlanning, TrainingPlanningType, User } from "@prisma/client"

const personalUserWithStudentsPlannings = Prisma.validator<Prisma.UserArgs>()({
  include: {
    personal: {
      include: {
        students: {
          include: {
            trainingPlannings: {
              include: {
                type: true,
              }
            },
            user: true
          }
        }
      }
    }
  }
});

export type PersonalUserWithStudentsPlannings = Prisma.UserGetPayload<typeof personalUserWithStudentsPlannings>;

export type PersonalStudentWithPlannings = NonNullable<PersonalUserWithStudentsPlannings["personal"]>["students"][number]
export type TrainingPlanningWithType = PersonalStudentWithPlannings["trainingPlannings"][number];

const personalUserWithStudentsTrainings = Prisma.validator<Prisma.UserArgs>()({
  include: {
    personal: {
      include: {
        students: {
          include: {
            user: true,
            trainingPlannings: {
              include: {
                type: true,
                trainings: {
                  include: {
                    exercisesSeries:{
                      include: {
                        exercises: {
                          include: {
                            muscleGroups: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

export type PersonalUserWithStudentsTrainings = Prisma.UserGetPayload<typeof personalUserWithStudentsTrainings>

export type PersonalStudentWithTrainings = NonNullable<PersonalUserWithStudentsTrainings["personal"]>["students"][number]
export type TrainingPlanningWithDetails = PersonalStudentWithTrainings["trainingPlannings"][number]
export type TrainingWithExercisesSeries = TrainingPlanningWithDetails["trainings"][number] 
export type ExerciseSeriesWithExercises = TrainingWithExercisesSeries["exercisesSeries"][number];
export type ExerciseWithMuscleGroups = ExerciseSeriesWithExercises["exercises"][number] 
