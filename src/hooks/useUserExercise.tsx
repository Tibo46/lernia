import { UserExerciseModel } from "../models/ExercisesModels";
import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";

export const useUserExercise = (id: string) => {
  const { data, error, isLoading } = useSWR<UserExerciseModel>(
    `${import.meta.env.VITE_API_URL}/exercises/${id}`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    userExercise: data,
    error,
    isLoading,
  };
};
