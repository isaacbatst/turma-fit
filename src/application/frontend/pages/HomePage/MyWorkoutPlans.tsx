import { Day } from "@domain/entities/WorkoutPlan/WorkoutPlan"
import { WorkoutPlanDTO } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase"

type MyWorkoutPlansProps = {
  workoutPlans: WorkoutPlanDTO[]
}

const indexToLetter = ['A', 'B', 'C', 'D', 'E', 'F']
const dayToPrintableDay: Record<Day, string> = {
  FRIDAY: 'Sexta',
  MONDAY: 'Segunda',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
  THURSDAY: 'Quinta',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta'
}

const isLastItem = (array: any[], index: number) => array.length - 1 === index 

const MyWorkoutPlans: React.FC<MyWorkoutPlansProps> = ({ workoutPlans }) => {
  return (
    <ul aria-label="Lista de planos">
      {
        workoutPlans.map(({ planType, id, workouts }) => (
          <li key={id}>
            <h3>Plano de {planType.name}</h3>
            <p>
              Tempo de descanso: {planType.defaultMinRestTime} - {planType.defaultMaxRestTime} segundos 
            </p>
            <div>
              <h4>Treinos</h4>
              <ul>
                {workouts.map(({ id, aerobicMinutes, day, sets }, index) => (
                  <li key={id}>
                    <h5>Treino {indexToLetter[index]} ({dayToPrintableDay[day]})</h5>
                    <p>{aerobicMinutes} minutos de aeróbico</p>
                    <p>Séries</p>
                    <ul>
                      {sets.map(({ exercises, id, repetitions, times, technique }) => {

                        return (
                          <li key={id}>
                            <p>
                              {
                                exercises
                                  .reduce((acc, exercise, index) => {
                                    const separator = isLastItem(exercises, index) ? '' : ' - '; 
                                    return `${acc}${exercise.movement.name}${separator}`
                                  }, '')
                              }: {times} x {repetitions} {technique && `(${technique.name})`}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default MyWorkoutPlans