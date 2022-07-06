import { Day } from "@prisma/client";
import { Grip } from "./enums/Grip";
import { Letter } from "./enums/Letter";
import { MuscleGroup } from "./enums/MuscleGroup";
import { WorkoutList } from "./WorkoutList";

export interface Equipment {
  id: string;
  name: string
}

interface SetTechnique {
  name: string
}

export interface Movement {
  name:               string
  id:                 string        
  muscleGroup:        MuscleGroup
}

export interface Exercise {
  id           : string      
  movement     : Movement  
  equipment?   : Equipment 
  grip?        : Grip
}

export interface Set {
  id:                   string               
  exercises:            Exercise[]
  times:                number
  repetitions:          string | number
  technique?:           SetTechnique
  minRestTime?:         number
  maxRestTime?:         number
}

export interface Workout {
  id                 : string              
  sets               : Set[]
  aerobicMinutes     : number
  day                : Day
  letter             : Letter
  muscleGroups       : MuscleGroup[]
}

export type WorkoutPort = Omit<Workout, 'letter' | 'muscleGroups'>

export class WorkoutListBeingGetted {
  private static readonly WORKOUT_LETTERS = Object.values(Letter)
  private static readonly WORKOUT_DAYS = Object.values(Day)

  private workouts: Workout[]

  constructor(workouts: WorkoutPort[]) {
    const workoutsCopy = [ ...workouts ];

    this.validateWorkouts(workoutsCopy);

    const workoutsOrderedByWeekDay = this.orderByDay(workoutsCopy);

    const workoutsWithLetter = this.addLetterByDay(workoutsOrderedByWeekDay);

    const workoutsWithMuscleGroups = this.addMuscleGroups(workoutsWithLetter);

    this.workouts = workoutsWithMuscleGroups;
  }

  public getWorkouts() {
    return this.workouts;
  }

  private validateWorkouts(workouts: WorkoutPort[]) {
    if(workouts.length > WorkoutList.WORKOUTS_MAX_LENGTH){
      throw new Error('WORKOUTS_MAX_LENGTH')
    }

    const isSomeDayRepeated = workouts.some((workout, index) => {
      const foundIndex = workouts.findIndex(workoutFind => workoutFind.day === workout.day);

      return index !== foundIndex
    })

    if(isSomeDayRepeated) {
      throw new Error('REPEATED_DAY');
    }
  }

  private orderByDay(workouts: WorkoutPort[]) {
    const ordered = workouts
      .sort((workoutA, workoutB) => 
        WorkoutListBeingGetted.WORKOUT_DAYS.findIndex(day => day === workoutA.day) - WorkoutListBeingGetted.WORKOUT_DAYS.findIndex(day => day === workoutB.day))
  
    return ordered;
  }

  private addLetterByDay(workouts: WorkoutPort[]){
    return workouts.map((workout, index) => ({
      ...workout,
      letter: WorkoutListBeingGetted.WORKOUT_LETTERS[index]
    }))
  }

  private addMuscleGroups(workouts: Omit<Workout, 'muscleGroups'>[]): Workout[] {
    return workouts.map<Workout>(workout => {
      const muscleGroups: MuscleGroup[] = [];

      workout.sets.forEach(set => {
        set.exercises.forEach(exercise => {
          if(!muscleGroups.find(muscleGroup => muscleGroup === exercise.movement.muscleGroup)){
            muscleGroups.push(exercise.movement.muscleGroup)
          }
        })
      })

      return {
        ...workout,
        muscleGroups: muscleGroups
      }
    })
  }
}