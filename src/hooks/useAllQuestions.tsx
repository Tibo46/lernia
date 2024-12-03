import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";
import { QuestionModel } from "../models/ExercisesModels";

export const useAllQuestions = () => {
  const { data, error, isLoading } = useSWR<QuestionModel[]>(
    `${import.meta.env.VITE_API_URL}/exercises/all`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    questions: data,
    error,
    isLoading,
  };
};
