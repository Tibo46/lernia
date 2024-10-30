import { UserExerciseInProgressModel } from "../models/ExercisesModels";
import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";

export const useInProgressUserExercise = (category: string) => {
  const { data, error, isLoading } = useSWR<UserExerciseInProgressModel>(
    `${
      import.meta.env.VITE_API_URL
    }/exercises/category/${category}/in-progress`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    inProgressExercise: data,
    error,
    isLoading,
  };
};
