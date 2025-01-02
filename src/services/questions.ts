import { AxiosResponse } from "axios";
import { QuestionModel } from "../models/ExercisesModels";
import { makePostRequest, makePutRequest } from "./httpHelper";

export const updateQuestion = async (
  question: QuestionModel
): Promise<AxiosResponse<QuestionModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/questions/${question.id}`,
    requestBody: {
      question,
    },
  };

  return await makePutRequest(options);
};

export const generateQuestions = async (
  categoryId: string
): Promise<AxiosResponse<QuestionModel[]>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/questions/generate`,
    requestBody: {
      categoryId,
    },
  };

  return await makePostRequest(options);
};
