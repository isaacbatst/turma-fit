import { MuscleGroup } from "@prisma/client";
import { ExerciseWithDetails, SetsWithExercises, TrainingPlanningWithDetails } from "../../types/schema";

const getMuscleGroupsFromExercises = (exercises: ExerciseWithDetails[], muscleGroups: MuscleGroup[]) => {
  exercises.forEach(exercise => {
    muscleGroups.push(exercise.movement.focusedMuscleGroup);
  })

  return muscleGroups;
}

const getMuscleGroupsFromSets = (sets: SetsWithExercises[]) => {
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