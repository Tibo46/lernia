export interface UsersStatsModel {
  numberOfUsers: number;
  activeThisMonth: number;
  activeLastMonth: number;
  createdThisMonth: number;
  createdLastMonth: number;
}
export interface ExercisesStatsModel {
  totalCompletedExercises: number;
  inProgressExercises: number;
  createdThisMonth: number;
  createdLastMonth: number;
}
