import useSWR from "swr";
import { UserModel } from "../models/UsersModels";
import { makeGetRequest } from "../services/httpHelper";

export const useAllUsers = () => {
  const { data, error, isLoading } = useSWR<UserModel[]>(
    `${import.meta.env.VITE_API_URL}/users/all`,
    makeGetRequest,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    users: data,
    error,
    isLoading,
  };
};
