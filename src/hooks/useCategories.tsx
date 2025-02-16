import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";
import { CategoryModel } from "../models/CategoriesModels";

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR<CategoryModel[]>(
    `${import.meta.env.VITE_API_URL}/categories`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    categories: data,
    error,
    isLoading,
    refetch: mutate,
  };
};
