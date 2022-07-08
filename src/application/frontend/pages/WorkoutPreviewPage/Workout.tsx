import React, { useContext } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { readableMuscleGroups } from 'src/lib/muscleGroups';
import { WorkoutContext } from './WorkoutContext';
import WorkoutSets from './WorkoutSets';

const Workout: React.FC = () => {
  const { workout } = useContext(WorkoutContext);
  
  return (
    <section className='text-white px-3'>
      <div className='flex justify-between py-4 items-center mb-3'>
        <h2 className='font-bold text-xl'>Treino {workout.letter}</h2>
        <button className='bg-white p-3 text-amber-500 shadow-md hover:scale-105 active:opacity-90'>
          <HiArrowRight />
        </button>
      </div>
      <section className='flex justify-between flex-wrap mb-7'>
        <div>
          {
            workout.muscleGroups.map(muscleGroup => (
              <div key={muscleGroup} className='px-6 py-2 mr-2 flex shadow-md items-center bg-green-700 font-bold text-xs'>
                {readableMuscleGroups[muscleGroup]}
              </div>
            ))
          }
        </div>
        <div className='bg-white text-amber-500 px-3 py-2 text-xs shadow-md'>
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