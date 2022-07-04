import { addExerciseAction, removeExerciseAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React, { useContext } from 'react'
import { HiPlus, HiTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { SetSlideContext } from '../SetSlideContext'
import EquipmentSelect from './EquipmentSelect'
import { ExerciseContext } from './ExerciseContext'
import GripRadio from './GripRadio'
import MovementSelect from './MovementSelect'

const Exercise: React.FC = () => {
  const { exerciseIndex, exercisesLength } = useContext(ExerciseContext);
  const { setIndex, workoutIndex } = useContext(SetSlideContext);
  const dispatch = useDispatch();

  const isFirstIndex = exerciseIndex === 0;
  const isLastIndex = exercisesLength - 1 === exerciseIndex;
  const showRemoveText = !isLastIndex;

  return (
    <>
      <div className="flex flex-col py-2">   
        <MovementSelect />
        <EquipmentSelect />
        <GripRadio />
      </div>
      {
        (isLastIndex || !isFirstIndex) && (
          <div className="flex justify-between py-2">
            {
              isLastIndex && (
                <button 
                  type="button"
                  className='border-2 border-white p-2 mb-2 mr-1 flex-1 
              flex justify-center items-center' 
                  onClick={() => {
                    dispatch(addExerciseAction({ setIndex, workoutIndex }));
                  }} 
                >
                  {!isFirstIndex && <HiPlus className='mr-2' />}
                  {isFirstIndex ? 'Criar Super-Set' : 'Exercício ao Super-Set'}
                </button> 
              )
            }
            {
              !isFirstIndex && (
                <button 
                  type="button" 
                  className={`border-2 border-white p-2 mb-2 flex 
              justify-center items-center
              ${showRemoveText && 'flex-1'}`} 
                  onClick={() => {
                    dispatch(removeExerciseAction({
                      exerciseIndex,
                      setIndex,
                      workoutIndex
                    }))
                  }}
                >
                  <HiTrash className={showRemoveText ? 'mr-1': ''}/> 
                  { showRemoveText && 'Exercício' }
                </button>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default Exercise