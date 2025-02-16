import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";
import { QuestionModel } from "../models/ExercisesModels";

export const useAllQuestions = () => {
  const { data, error, isLoading, mutate } = useSWR<QuestionModel[]>(
    `${import.meta.env.VITE_API_URL}/questions/all`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    questions: data,
    refetch: mutate,
    error,
    isLoading,
  };
};
