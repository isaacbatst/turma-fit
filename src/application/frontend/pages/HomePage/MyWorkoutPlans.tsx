import { WorkoutPlanDTO } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase"

type MyWorkoutPlansProps = {
  workoutPlans: WorkoutPlanDTO[]
}

const MyWorkoutPlans: React.FC<MyWorkoutPlansProps> = ({ workoutPlans }) => {
  return (
    <ul aria-label="Lista de planos">
      {
        workoutPlans.map(workoutPlan => (
          <li key={workoutPlan.id}>
            {workoutPlan.id}
          </li>
        ))
      }
    </ul>
  )
}

export default MyWorkoutPlans