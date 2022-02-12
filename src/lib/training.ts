import { MuscleGroup } from "@prisma/client";
import { ExerciseWithMuscleGroups, SetsWithExercises, TrainingPlanningWithDetails } from "../types/schema";

const getMuscleGroupsFromExercises = (exercises: ExerciseWithMuscleGroups[], muscleGroups: MuscleGroup[]) => {
  exercises.forEach(exercise => {
    const notIncludedMuscleGroups = exercise.muscleGroups
      .filter(muscleGroup => !muscleGroups.includes(muscleGroup))
    
    muscleGroups.push(...notIncludedMuscleGroups);
  })

  return muscleGroups;
}

const getMuscleGroupsFromSets = (sets: SetsWithExercises[]) => {
  const muscleGroups: MuscleGroup[] = [];
  
  sets.forEach(set => getMuscleGroupsFromExercises(set.exercises, muscleGroups));

  return muscleGroups;
}

export const getTrainingPlanningMuscleGroupsPerTraining = (trainingPlanning: TrainingPlanningWithDetails) => (
  trainingPlanning.trainings.map(training => (
    {
      ...training,
      muscleGroups: getMuscleGroupsFromSets(training.sets)
    }
  ))
)