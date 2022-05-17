
import WorkoutPlan, { Day, Equipment, Exercise, Grip, Movement, MuscleGroup, Set, Workout } from '@domain/entities/WorkoutPlan/WorkoutPlan';
import { Equipment as PrismaEquipment, Grip as PrismaGrip, MuscleGroup as PrismaMuscleGroup, Prisma } from '@prisma/client';

export class PrismaWorkoutPlanInclude {
  static WORKOUT_PLAN_DETAILS = {
    workouts: {
      include: {
        sets: {
          include: {
            exercises: {
              include: {
                movement: true,
                equipment: true,
              }
            },
            technique: true
          }
        }
      }
    }
  }
}

const WORKOUT_PLAN_WITH_RELATIONS = Prisma.validator<Prisma.WorkoutPlanArgs>()({
  include: PrismaWorkoutPlanInclude.WORKOUT_PLAN_DETAILS
})

type PrismaWorkoutPlanWithWorkouts = Prisma.WorkoutPlanGetPayload<typeof WORKOUT_PLAN_WITH_RELATIONS>
type PrismaWorkoutWithSets = PrismaWorkoutPlanWithWorkouts['workouts'][number]
type PrismaSetWithExercisesAndTechnique = PrismaWorkoutWithSets['sets'][number]
type PrismaExerciseWithMovement = PrismaSetWithExercisesAndTechnique['exercises'][number]
type PrismaMovementWithFocusedMuscleGroup = PrismaExerciseWithMovement['movement'];

export class PrismaWorkoutPlanMapper {
  static ormToDomain(prismaWorkoutPlan: PrismaWorkoutPlanWithWorkouts): WorkoutPlan {
    const workoutPlan = new WorkoutPlan({
      id: prismaWorkoutPlan.id,
      planTypeId: prismaWorkoutPlan.workoutPlanTypeId,
      workouts: prismaWorkoutPlan.workouts.map(prismaWorkout => PrismaWorkoutMapper.ormToDomain(prismaWorkout)),
    });

    return workoutPlan;
  }
}

class PrismaWorkoutMapper {
  static ormToDomain(prismaWorkout: PrismaWorkoutWithSets): Workout {
    const workout: Workout = {
      id: prismaWorkout.id,
      day: Day[prismaWorkout.day],
      aerobicMinutes: prismaWorkout.aerobicMinutes,
      sets: prismaWorkout.sets.map(prismaSet => PrismaSetMapper.ormToDomain(prismaSet)),
    }

    return workout;
  }
}

class PrismaSetMapper {
  static ormToDomain(prismaSet: PrismaSetWithExercisesAndTechnique): Set {
    const set: Set = {
      id: prismaSet.id,
      exercises: prismaSet.exercises.map(prismaExercise => PrismaExerciseMapper.ormToDomain(prismaExercise)),
      times: prismaSet.times,
      repetitions: prismaSet.repetitions,
      maxRestTime: prismaSet.maxRestTime || undefined,
      minRestTime: prismaSet.minRestTime || undefined,
      technique: prismaSet.technique || undefined,
    }

    return set;
  }
}

class PrismaExerciseMapper {
  static ormToDomain(prismaExercise: PrismaExerciseWithMovement): Exercise {
    const exercise: Exercise = {
      id: prismaExercise.id,
      movement: PrismaMovementMapper.ormToDomain(prismaExercise.movement),
      equipment: prismaExercise.equipment ? PrismaEquipmentMapper.ormToDomain(prismaExercise.equipment) : undefined,
      grip: prismaExercise.grip ? PrismaGripMapper.ormToDomain(prismaExercise.grip) : undefined,
    }

    return exercise;
  }
}

class PrismaEquipmentMapper {
  static ormToDomain(prismaEquipment: PrismaEquipment): Equipment {
    const equipment: Equipment = {
      id: prismaEquipment.id,
      name: prismaEquipment.name,
    }

    return equipment;
  }
}

class PrismaGripMapper {
  static ormToDomain(prismaGrip: PrismaGrip): Grip {
    const grip: Grip = Grip[prismaGrip];

    return grip;
  }
}

class PrismaMovementMapper {
  static ormToDomain(prismaMovement: PrismaMovementWithFocusedMuscleGroup): Movement {
    const movement: Movement = {
      id: prismaMovement.id,
      muscleGroup: PrismaMuscleGroupMapper.ormToDomain(prismaMovement.focusedMuscleGroup),
      name: prismaMovement.name,
    }

    return movement
  }
}

class PrismaMuscleGroupMapper {
  static ormToDomain(prismaMuscleGroup: PrismaMuscleGroup): MuscleGroup {
    const map: Record<PrismaMuscleGroup, MuscleGroup> = {
      'ABS': MuscleGroup.ABDOMINALS,
      'BACK': MuscleGroup.BACK,
      'BICEPS': MuscleGroup.BICEPS,
      'CHEST': MuscleGroup.CHEST,
      'SHOULDERS': MuscleGroup.SHOULDERS,
      'FOREARMS': MuscleGroup.FOREARMS,
      'GLUTES': MuscleGroup.GLUTES,
      'HAMSTRINGS': MuscleGroup.HAMSTRINGS,
      'LOWER_BACK': MuscleGroup.LOWER_BACK,
      'TRICEPS': MuscleGroup.TRICEPS,
      'QUADRICEPS': MuscleGroup.QUADRICEPS,
      'CALVES': MuscleGroup.CALVES,
      'TRAPEZIUS': MuscleGroup.TRAPEZIUS,
    }

    return map[prismaMuscleGroup];
  }
}
