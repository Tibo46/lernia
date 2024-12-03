import useSWR from "swr";
import { ExercisesStatsModel, UsersStatsModel } from "../models/StatsModels";
import { makeGetRequest } from "../services/httpHelper";

export const useStats = () => {
  const {
    data: usersStats,
    error: usersStatsError,
    isLoading: usersStatsLoading,
  } = useSWR<UsersStatsModel>(
    `${import.meta.env.VITE_API_URL}/stats/users`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );
  const {
    data: exercisesStats,
    error: exercisesStatsError,
    isLoading: exercisesStatsLoading,
  } = useSWR<ExercisesStatsModel>(
    `${import.meta.env.VITE_API_URL}/stats/exercises`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    usersStats,
    exercisesStats,
    error: usersStatsError || exercisesStatsError,
    isLoading: usersStatsLoading || exercisesStatsLoading,
  };
};
