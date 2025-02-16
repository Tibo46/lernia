import { AxiosResponse } from "axios";
import { QuestionModel } from "../models/ExercisesModels";
import {
  makeDeleteRequest,
  makePostRequest,
  makePutRequest,
} from "./httpHelper";

export const updateQuestion = async (
  question: QuestionModel
): Promise<AxiosResponse<QuestionModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/questions/${question.id}`,
    requestBody: {
      ...question,
    },
  };

  return await makePutRequest(options);
};

export const generateQuestions = async (
  categoryId: string,
  numberOfQuestions: number,
  aiContext: string
): Promise<AxiosResponse<QuestionModel[]>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/questions/generate`,
    requestBody: {
      categoryId,
      numberOfQuestions,
      aiContext,
    },
  };

  return await makePostRequest(options);
};

export const deleteQuestion = async (
  questionId: string
): Promise<AxiosResponse<QuestionModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/questions/${questionId}`,
  };

  return await makeDeleteRequest(options);
};
