import { v4 } from "uuid"

enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

enum Grip {
  PRONATE = 'PRONATE',
  SUPINE = 'SUPINE',
  NEUTRAL = 'NEUTRAL'
}

enum MuscleGroup {
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  CHEST = 'CHEST',
  BACK = 'BACK',
  ABDOMINALS = 'ABDOMINALS',
  SHOULDERS = 'SHOULDERS',
  CALVES = 'CALVES',
  FOREARMS = 'FOREARMS',
  TRAPEZIUS = 'TRAPEZIUS',
  GLUTES = 'GLUTES'
}

interface Equipment {
  name: string
}

interface SetType {
  name: string
}

interface Movement {
  name:               string
  id:                 string        
  muscleGroup:        MuscleGroup 
}

interface Exercise {
  id           : string      
  movement     : Movement  
  equipment?   : Equipment 
  grip?        : Grip
}

interface Set {
  id:                   string               
  exercises:            Exercise[]
  times:                number
  repetitions:          string
  type?:                SetType
  minRestTime?:         number
  maxRestTime?:         number
}

interface Workout {
  id                 : string              
  sets               : Set[]
  aerobicMinutes     : number
}

interface WorkoutPlanType {
  name               : string
  id                 : string               
  explanation        : string
  defaultMinRestTime : number
  defaultMaxRestTime : number
}


interface CreateWorkoutPlanEntityParams {
  id?: string,
  workouts: Map<Day, Workout>,
  planType: WorkoutPlanType
}

export default class WorkoutPlan {
  private id        : string                     
  private workouts  : Map<Day, Workout>
  private planType  : WorkoutPlanType

  constructor(params: CreateWorkoutPlanEntityParams){
    this.id = params.id || v4();
    this.workouts = params.workouts;
    this.planType = params.planType;
  }
}

