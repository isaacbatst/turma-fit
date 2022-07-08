import React, { useContext } from 'react';
import { readableMuscleGroups } from 'src/lib/muscleGroups';
import NavButtons from './NavButtons';
import { WorkoutContext } from './WorkoutContext';
import WorkoutSets from './WorkoutSets';

const Workout: React.FC = () => {
  const { workout } = useContext(WorkoutContext);
  
  return (
    <section className='text-white px-3'>
      <div className='flex justify-between py-4 items-center mb-3'>
        <h2 className='font-bold text-xl '>Treino {workout.letter}</h2>
        <NavButtons />
      </div>
      <section className='flex justify-between mb-7 items-start'>
        <div className='flex  flex-wrap'>
          {
            workout.muscleGroups.map(muscleGroup => (
              <div key={muscleGroup} className='px-4  py-2 mr-2 mb-2 flex shadow-md items-center justify-center bg-green-700 font-bold text-xs'>
                {readableMuscleGroups[muscleGroup]}
              </div>
            ))
          }
        </div>
        <div className='bg-white text-amber-500 px-3 py-2 text-xs shadow-md min-w-[140px] text-center'>
          Aeróbico - {workout.aerobicMinutes} min
        </div>
      </section>
      <section>
        <WorkoutSets />
      </section>
    </section>
  )
}

export default Workout