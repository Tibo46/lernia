import { UserExerciseQuestionModel } from "../models/ExercisesModels";
import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";

export const useQuestion = (userExerciseId: string, questionId?: string) => {
  const { data, error, isLoading } = useSWR<UserExerciseQuestionModel>(
    questionId !== undefined
      ? `${
          import.meta.env.VITE_API_URL
        }/exercises/${userExerciseId}/questions/${questionId}`
      : null,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    userExerciseQuestion: data,
    error,
    isLoadingQuestion: isLoading,
  };
};
