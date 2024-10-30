import { AxiosResponse } from "axios";
import { makePostRequest } from "./httpHelper";
import { AnswerModel, UserExerciseModel } from "../models/ExercisesModels";

export const validateAnswer = async (
  userExerciseId: string,
  questionId: string,
  userAnswer: string
): Promise<AxiosResponse<AnswerModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/exercises/validate`,
    requestBody: {
      userExerciseId,
      questionId,
      userAnswer,
    },
  };

  return await makePostRequest(options);
};

export const startNewExercise = async (
  categoryId: string
): Promise<AxiosResponse<UserExerciseModel>> => {
  const options = {
    requestUrl: `${
      import.meta.env.VITE_API_URL
    }/exercises/category/${categoryId}/start`,
  };

  return await makePostRequest(options);
};
