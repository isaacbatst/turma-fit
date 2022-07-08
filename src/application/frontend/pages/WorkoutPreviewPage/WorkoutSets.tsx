import { useAppSelector } from '@application/frontend/store/hooks';
import { selectUnauthenticatedPlanType } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan';
import React, { useContext } from 'react'
import { readableGrip } from 'src/lib/grips';
import { WorkoutContext } from './WorkoutContext'

const WorkoutSets: React.FC = () => {
  const { workout: { sets } } = useContext(WorkoutContext);
  const planType = useAppSelector(selectUnauthenticatedPlanType);

  return (
    <>
      {
        sets.map(set => {
          const techniqueString = set.technique ? ` - ${set.technique.name}` : ''
          const exercisesString = set.exercises.reduce((acc, exercise, index) => {
            const gripString = exercise.grip ? ` Pegada ${readableGrip[exercise.grip]}` : '';
            const equipmentString = exercise.equipment ? ` ${exercise.equipment.name}` : '';
            const exerciseString = `${exercise.movement.name}${equipmentString}${gripString}`

            if(index === 0) {
              return exerciseString;
            }

            return `${acc} + ${exerciseString}`
          }, '')

          return (
            <div key={set.id} className="p-5 bg-green-700 mb-3 shadow-md">
              <div className='flex flex-col mb-7 text-sm'>
                {exercisesString}
              </div>
              <div className='text-xs flex justify-between  '>
                <div>{set.times} x {set.repetitions}{techniqueString}</div>
                <div>{planType?.defaultMinRestTime} à {planType?.defaultMaxRestTime}s</div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default WorkoutSets