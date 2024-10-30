import useSWR from "swr";
import { makeGetRequest } from "../services/httpHelper";
import { CategoryModel } from "../models/CategoriesModels";

export const useCategory = (categoryId: string) => {
  const { data, error, isLoading } = useSWR<CategoryModel[]>(
    `${import.meta.env.VITE_API_URL}/categories`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    category: data?.find((x) => x.id === categoryId),
    error,
    isLoading,
  };
};
