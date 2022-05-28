import { Day } from "@prisma/client";
import { Grip } from "./enums/Grip";
import { Letter } from "./enums/Letter";
import { MuscleGroup } from "./enums/MuscleGroup";

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
}

export type WorkoutWithoutLetter = Omit<Workout, 'letter'>

export class WorkoutListBeingGetted {
  private static readonly WORKOUT_LETTERS = Object.values(Letter)
  private static readonly WORKOUT_DAYS = Object.values(Day)
  private static readonly WORKOUTS_MAX_LENGTH = 7

  private workouts: Workout[]

  constructor(workouts: WorkoutWithoutLetter[]) {
    this.validateWorkouts(workouts);

    const workoutsOrderedByWeekDay = this.orderByDay(workouts);

    const workoutsWithLetter = this.addLetterByDay(workoutsOrderedByWeekDay);

    this.workouts = workoutsWithLetter;
  }

  public getWorkouts() {
    return this.workouts;
  }

  private validateWorkouts(workouts: WorkoutWithoutLetter[]) {
    if(workouts.length > WorkoutListBeingGetted.WORKOUTS_MAX_LENGTH){
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

  private orderByDay(workouts: WorkoutWithoutLetter[]) {
    const ordered = workouts
      .sort((workoutA, workoutB) => 
        WorkoutListBeingGetted.WORKOUT_DAYS.findIndex(day => day === workoutA.day) - WorkoutListBeingGetted.WORKOUT_DAYS.findIndex(day => day === workoutB.day))
  
    return ordered;
  }

  private addLetterByDay(workouts: WorkoutWithoutLetter[]){
    return workouts.map((workout, index) => ({
      ...workout,
      letter: WorkoutListBeingGetted.WORKOUT_LETTERS[index]
    }))
  }
}