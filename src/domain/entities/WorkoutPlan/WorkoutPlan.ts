export enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export enum Grip {
  PRONATE = 'PRONATE',
  SUPINE = 'SUPINE',
  NEUTRAL = 'NEUTRAL'
}

export enum MuscleGroup {
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  CHEST = 'CHEST',
  BACK = 'BACK',
  ABDOMINALS = 'ABDOMINALS',
  SHOULDERS = 'SHOULDERS',
  CALVES = 'CALVES',
  FOREARMS = 'FOREARMS',
  TRAPEZIUS = 'TRAPEZIUS',
  GLUTES = 'GLUTES',
  HAMSTRINGS = 'HAMSTRINGS',
  LOWER_BACK = 'LOWER_BACK',
  QUADRICEPS = 'QUADRICEPS'

}

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
}

interface CreateWorkoutPlanEntityParams {
  id: string,
  workouts: Workout[]
  planTypeId: string
}

export default class WorkoutPlan {
  private id        : string                     
  private workouts  : Workout[]
  private planTypeId  : string

  constructor(params: CreateWorkoutPlanEntityParams){
    this.id = params.id;
    this.workouts = params.workouts;
    this.planTypeId = params.planTypeId;
  }

  getId() {
    return this.id;
  }

  getWorkouts() {
    return this.workouts;
  }

  getPlanTypeId() {
    return this.planTypeId;
  }
}

