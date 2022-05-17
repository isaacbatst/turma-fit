import { Exercise, Set, Personal, Prisma, Student, Training, TrainingPlanning, WorkoutPlanType, User } from "@prisma/client"

const personalUserWithStudentsPlannings = Prisma.validator<Prisma.UserArgs>()({
  include: {
    personal: {
      include: {
        advices: {
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
  }
});

export type PersonalUserWithStudentsPlannings = Prisma.UserGetPayload<typeof personalUserWithStudentsPlannings>;

export type PersonalStudentWithPlannings = NonNullable<PersonalUserWithStudentsPlannings["personal"]>["advices"]["students"][number]

const personalUserWithStudentsTrainings = Prisma.validator<Prisma.UserArgs>()({
  include: {
    personal: {
      include: {
        advices: {
          include: {
            student: {
              include: {
                user: true,
              }
            },
            trainingPlannings: {
              include: {
                type: true,
                trainings: {
                  include: {
                    sets: {
                      include: {
                        exercises: {
                          include: {
                            movement: {
                              include: {
                                focusedMuscleGroup: true,
                              }
                            },
                            equipment: true
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

export type AdviceWithStudentAndPlanningsWithDetails = NonNullable<PersonalUserWithStudentsTrainings["personal"]>["advices"][number]
export type TrainingPlanningWithDetails = AdviceWithStudentAndPlanningsWithDetails["trainingPlannings"][number]
export type TrainingWithSets = TrainingPlanningWithDetails["trainings"][number]
export type SetsWithExercises = TrainingWithSets["sets"][number];
export type ExerciseWithDetails = SetsWithExercises["exercises"][number]
export type MovementWithMuscleGroup = ExerciseWithDetails["movement"]

const adviceWithPlanningAndStudentUser = Prisma.validator<Prisma.AdviceArgs>()({
  include: {
    student: {
      include: {
        user: true
      }
    },
    adviceTrainingPlannings: {
      include: {
        trainingPlanning: {
          include: {
            type: true
          }
        }
      }
    }
  }
});

export type AdviceWithPlanningsAndStudentUser = Prisma.AdviceGetPayload<typeof adviceWithPlanningAndStudentUser>
export type StudentUser = AdviceWithPlanningsAndStudentUser["student"]
export type TrainingPlanningWithType = AdviceWithPlanningsAndStudentUser["adviceTrainingPlannings"][number]["trainingPlanning"]