import useSWR from "swr";
import { UserExerciseInProgressModel } from "../models/ExercisesModels";
import { makeGetRequest } from "../services/httpHelper";

export const usePastUserExercises = (category: string) => {
  const { data, error, isLoading } = useSWR<UserExerciseInProgressModel[]>(
    `${import.meta.env.VITE_API_URL}/exercises/category/${category}/past`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    pastExercises: data,
    error,
    isLoading,
  };
};
