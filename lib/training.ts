import { MuscleGroup } from "@prisma/client";
import { ExerciseWithMuscleGroups, ExerciseSeriesWithExercises, TrainingPlanningWithDetails } from "../types/schema";

const getMuscleGroupsFromExercises = (exercises: ExerciseWithMuscleGroups[], muscleGroups: MuscleGroup[]) => {
  exercises.forEach(exercise => {
    const notIncludedMuscleGroups = exercise.muscleGroups
      .filter(muscleGroup => !muscleGroups.includes(muscleGroup))
    
    muscleGroups.push(...notIncludedMuscleGroups);
  })

  return muscleGroups;
}

const getMuscleGroupsFromExercisesSeries = (exercisesSeries: ExerciseSeriesWithExercises[]) => {
  const muscleGroups: MuscleGroup[] = [];
  
  exercisesSeries.forEach(exercisesSerie => getMuscleGroupsFromExercises(exercisesSerie.exercises, muscleGroups));

  return muscleGroups;
}

export const getTrainingPlanningMuscleGroupsPerTraining = (trainingPlanning: TrainingPlanningWithDetails) => (
  trainingPlanning.trainings.map(training => (
    {
      ...training,
      muscleGroups: getMuscleGroupsFromExercisesSeries(training.exercisesSeries)
    }
  ))
)