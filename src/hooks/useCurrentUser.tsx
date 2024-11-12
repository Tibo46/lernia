import useSWR from "swr";
import { UserModel } from "../models/UsersModels";
import { makeGetRequest } from "../services/httpHelper";

export const useCurrentUser = () => {
  const { data, error, isLoading } = useSWR<UserModel>(
    `${import.meta.env.VITE_API_URL}/users`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user: data,
    error,
    isLoading,
  };
};
