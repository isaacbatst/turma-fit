export interface CreateWorkoutPlanTypeRepository {
  existById(id: string): Promise<boolean>
}