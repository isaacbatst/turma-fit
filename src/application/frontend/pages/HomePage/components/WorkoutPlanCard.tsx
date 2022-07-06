import { WorkoutPlanDTO } from '@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase'
import React from 'react'
import { readableDay } from 'src/lib/days'

type WorkoutPlanCardProps = {
  workoutPlan: WorkoutPlanDTO
}

const isLastItem = (array: any[], index: number) => array.length - 1 === index 

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ workoutPlan }) => {
  const { planType, workouts } = workoutPlan;
  return (
    <li className='list-none'>
      <h3>Plano de {planType.name}</h3>
      <p>
        Tempo de descanso: {planType.defaultMinRestTime} - {planType.defaultMaxRestTime} segundos 
      </p>
      <div>
        <h4>Treinos</h4>
        <ul>
          {workouts.map(({ id, aerobicMinutes, day, sets, letter }, index) => (
            <li key={id}>
              <h5>Treino {letter} ({readableDay[day]})</h5>
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
  )
}

export default WorkoutPlanCard