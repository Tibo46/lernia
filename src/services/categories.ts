import { AxiosResponse } from "axios";
import { CategoryModel } from "../models/CategoriesModels";
import { makePutRequest, makePostRequest } from "./httpHelper";

export const updateCategory = async (
  category: CategoryModel
): Promise<AxiosResponse<CategoryModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/categories/${category.id}`,
    requestBody: {
      ...category,
    },
  };

  return await makePutRequest(options);
};

export const createCategory = async (
  category: CategoryModel
): Promise<AxiosResponse<CategoryModel>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/categories`,
    requestBody: category,
  };

  return await makePostRequest(options);
};
