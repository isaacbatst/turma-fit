import { UuidGenerator } from "@domain/common/UuidGenerator"
import { Day } from "./enums/Day"

interface ExerciseBeingCreated {
  movementId: string,
  equipmentId?: string,
}

interface SetBeingCreated {
  times: number,
  repetitions: string,
  exercises: ExerciseBeingCreated[]
}

export interface WorkoutBeingCreated {
  sets: SetBeingCreated[],
  aerobicMinutes: number,
  day: Day
}

interface WorkoutListBeingCreatedParams {
  workouts: WorkoutBeingCreated[],
  uuidGenerator: UuidGenerator
}

interface Exercise extends ExerciseBeingCreated {
  id: string
}

interface Set extends SetBeingCreated {
  id: string;
  exercises: Exercise[];
}

interface Workout extends WorkoutBeingCreated {
  id: string
  aerobicMinutes: number
  sets: Set[]
}

export class WorkoutListBeingCreated {
  private uuidGenerator: UuidGenerator;
  private workouts: Workout[]

  constructor(params: WorkoutListBeingCreatedParams) {
    this.uuidGenerator = params.uuidGenerator;
    this.workouts = this.generateIds(params.workouts)
  }

  public getWorkouts() {
    return [ ...this.workouts ];
  }

  private generateIds(workouts: WorkoutBeingCreated[]): Workout[] {
    return workouts.map(workout => ({
      ...workout,
      id: this.uuidGenerator.generate(),
      sets: this.generateSetsIds(workout.sets)
    }))
  }

  private generateSetsIds(sets: SetBeingCreated[]): Set[] {
    return sets.map(set => ({
      ...set,
      id: this.uuidGenerator.generate(),
      exercises: this.generateExercisesIds(set.exercises),
    }))
  }

  private generateExercisesIds(exercises: ExerciseBeingCreated[]): Exercise[] {
    return exercises.map(exercise => ({
      ...exercise,
      id: this.uuidGenerator.generate()
    }))
  }
}