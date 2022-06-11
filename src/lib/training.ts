import { Exercise, Movement, MuscleGroup, Set } from "@prisma/client";

interface ExerciseWithMovement extends Exercise {
  movement: Movement
}

interface SetWithExercisesWithMovement extends Set {
  exercises: ExerciseWithMovement[]
}

const getMuscleGroupsFromExercises = (exercises: ExerciseWithMovement[], muscleGroups: MuscleGroup[]) => {
  exercises.forEach(exercise => {
    muscleGroups.push(exercise.movement.focusedMuscleGroup);
  })

  return muscleGroups;
}

const getMuscleGroupsFromSets = (sets: SetWithExercisesWithMovement[]) => {
  const muscleGroups: MuscleGroup[] = [];
  
  sets.forEach(set => getMuscleGroupsFromExercises(set.exercises, muscleGroups));

  return muscleGroups;
}

// export const getTrainingPlanningMuscleGroupsPerTraining = (trainingPlanning: TrainingPlanningWithDetails) => (
//   trainingPlanning.trainings.map(training => (
//     {
//       ...training,
//       muscleGroups: getMuscleGroupsFromSets(training.sets)
//     }
//   ))
// )