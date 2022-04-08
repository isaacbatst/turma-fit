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

//todo: workout interfaces

interface Workout {
  id                 : string              
  sets               : Set[]
  aerobicMinutes     : number
}

interface WorkoutIntoPlan extends Workout {
  day: Day,
}

interface WorkoutPlanType {
  name               : string
  id                 : string               
  explanation        : string
  defaultMinRestTime : number
  defaultMaxRestTime : number
}

type LetterToWorkoutMap = Map<string, WorkoutIntoPlan>

interface CreateWorkoutPlanEntityParams {
  id?: string,
  workouts: LetterToWorkoutMap,
  planType: WorkoutPlanType
}

export default class WorkoutPlan {
  private id                    : string                     
  private workouts              : LetterToWorkoutMap
  private planType  : WorkoutPlanType

  constructor(params: CreateWorkoutPlanEntityParams){
    this.id = params.id || v4();
    this.workouts = params.workouts;
    this.planType = params.planType;
  }
}

