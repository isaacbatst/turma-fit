import { CreateWorkoutPlanValidRequestExercise, CreateWorkoutPlanValidRequestSet, CreateWorkoutPlanValidRequestWorkout } from '@application/api/usecases/CreateWorkoutPlan/CreateWorkoutPlanRequestValidator';
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectUnauthenticatedWorkoutPlanIsSavedOnApi, selectUnauthenticateWorkoutPlan, setIsSavedAction } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan';
import { useUser } from '@application/frontend/swr/useUser';
import { Exercise, Set, Workout } from '@domain/entities/WorkoutPlan/WorkoutListBeingGetted';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { mutate } from 'swr';

const toValidRequestWorkout = (workout: Workout): CreateWorkoutPlanValidRequestWorkout => ({
  aerobicMinutes: workout.aerobicMinutes,
  day: workout.day,
  sets: workout.sets.map(toValidRequestSet)
})

const toValidRequestSet = (set: Set): CreateWorkoutPlanValidRequestSet => ({
  repetitions: String(set.repetitions),
  times: set.times,
  techniqueId: set.technique?.id,
  maxRestTime: set.maxRestTime,
  minRestTime: set.minRestTime,
  exercises: set.exercises.map(toValidRequestExercise)
})

const toValidRequestExercise = (exercise: Exercise): CreateWorkoutPlanValidRequestExercise => ({
  movementId: exercise.movement.id,
  equipmentId: exercise.equipment?.id,
  grip: exercise.grip
})

const CacheWorkoutSync: React.FC = ({ children }) => {
  const workoutPlan = useAppSelector(selectUnauthenticateWorkoutPlan);
  const isSavedOnApi = useAppSelector(selectUnauthenticatedWorkoutPlanIsSavedOnApi);
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const syncLocalWorkoutPlanWithApi = useCallback(async () => {
    if(workoutPlan && user && !isSavedOnApi){
      try {
        const workouts: CreateWorkoutPlanValidRequestWorkout[] = 
          workoutPlan.workouts.map(toValidRequestWorkout)

        await axios.post(`/api/user/${user.id}/workout-plans`, {
          workoutPlan: {
            planTypeId: workoutPlan.planType.id,
            workouts
          }
        });  

        mutate(`/api/user/${user.id}/workout-plans`)

        dispatch(setIsSavedAction());
      } catch (error) {
        console.log(error)
      }
    }
  }, [user, workoutPlan, dispatch, isSavedOnApi])
  
  useEffect(() => {
    syncLocalWorkoutPlanWithApi()
  }, [syncLocalWorkoutPlanWithApi])

  return (
    <>
      {children}
    </>
  )
}

export default CacheWorkoutSync