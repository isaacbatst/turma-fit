import { Day } from "@domain/entities/WorkoutPlan/enums/Day";
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip";
import { RelationError } from "@infra/persistence/errors/RelationError";
import { CreateWorkoutPlanPortExercise, CreateWorkoutPlanPortExerciseValidated, CreateWorkoutPlanPortSet, CreateWorkoutPlanPortSetValidated, CreateWorkoutPlanPortWorkout, CreateWorkoutPlanPortWorkoutValidated, CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated, ICreateWorkoutPlanPortValidator } from "./interfaces";

export class CreateWorkoutPlanPortValidator implements ICreateWorkoutPlanPortValidator {
  validate(port: CreateWorkoutPlanUseCasePort): CreateWorkoutPlanUseCasePortValidated {
    const validatedWorkouts = this.validateWorkouts(port.workouts);

    return {
      ...port,
      workouts: validatedWorkouts
    }
  }

  private validateWorkouts(workouts: CreateWorkoutPlanPortWorkout[]): CreateWorkoutPlanPortWorkoutValidated[] {
    return workouts.map(workout => {
      if(!(workout.day in Day)){
        throw new RelationError('INVALID_DAY');
      }

      return {
        ...workout,
        day: workout.day as Day,
        sets: this.validateSets(workout.sets),
      }
    })
  }

  private validateSets(sets: CreateWorkoutPlanPortSet[]): CreateWorkoutPlanPortSetValidated[] {
    return sets.map(set => ({
      ...set,
      exercises: this.validateExercises(set.exercises)
    }))
  }

  private validateExercises(exercises: CreateWorkoutPlanPortExercise[]): CreateWorkoutPlanPortExerciseValidated[] {
    return exercises.map((exercise) => {
      if(exercise.grip && !(exercise.grip in Grip)){
        throw new RelationError('INVALID_GRIP')
      }

      return {
        ...exercise,
        grip: exercise.grip as Grip | undefined
      }
    })
  }
}