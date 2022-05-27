import { Day, Letter, MuscleGroup } from "@domain/entities/WorkoutPlan/WorkoutList";
import { WorkoutPlanDTO } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase";
import { GetUserUseCaseDTO } from "@domain/usecases/GetUser/GetUserUseCase";

export const USER: GetUserUseCaseDTO = {
  user: {
    id: 'any_user_id',
    name: 'any_user_name'
  }
}

export const WORKOUT_PLAN: WorkoutPlanDTO = {
  id: 'any_workout_id',
  planType: {
    defaultMaxRestTime: 60,
    defaultMinRestTime: 45,
    id: 'any_plan_type_id',
    name: 'any_plan_type_name'
  },
  workouts: [
    {
      id: 'any_workout_id',
      aerobicMinutes: 40,
      day: Day.MONDAY,
      letter: Letter.A,
      sets: [
        {
          id: 'any_set_id',
          repetitions: 10,
          times: 3,
          exercises: [
            { 
              id: 'any_exercise_id', 
              movement: {
                id: 'any_movement_id',
                muscleGroup: MuscleGroup.ABDOMINALS,
                name: 'any_movement_name'
              },
              equipment: {
                id: 'any_equipment_id',
                name: 'any_equipment_name'
              },
            },
          ]
        }
      ]
    }
  ]
}
