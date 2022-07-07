import { Workout } from '@domain/entities/WorkoutPlan/WorkoutListBeingGetted'
import Link from 'next/link'
import React from 'react'
import { readableDay } from 'src/lib/days'
import { readableMuscleGroups } from 'src/lib/muscleGroups'

interface Props {
  workout: Workout
}

const WorkoutCard: React.FC<Props> = ({ workout: { id, aerobicMinutes, day, letter, muscleGroups } }) => {
  return (
    <Link href={`/workout-preview/${id}`}  passHref>
      <a>
        <li key={id} className='p-5 bg-white text-stone-800 flex flex-col mb-3 shadow-lg active:opacity-95 cursor-pointer hover:scale-105'>
          <div className="flex justify-between mb-3">
            <h5>Treino {letter}</h5>
            <p className='font-normal text-sm'>{readableDay[day]}</p>
          </div>
          {
            muscleGroups.length > 0 && (
              <ul className='text-white flex mb-3'>
                {
                  muscleGroups.map(muscleGroup => (
                    <li className='text-xs font-bold bg-green-700 px-3 py-1 shadow-lg mr-2' 
                      key={muscleGroup}>{readableMuscleGroups[muscleGroup]}</li>
                  ))
                }
              </ul>
            )
          }
          <div className='text-amber-500 font-bold text-xs bg-white shadow-md self-start px-3 py-2'>
      Aeróbico - {aerobicMinutes} minutos
          </div>
        </li> 
      </a>
    </Link>
  )
}

export default WorkoutCard