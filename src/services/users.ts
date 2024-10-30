import { AxiosResponse } from "axios";
import { makePostRequest, makePutRequest } from "./httpHelper";

export const registerUserInDB = async (
  userName: string,
  userEmail: string
): Promise<AxiosResponse<void>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/users`,
    requestBody: {
      name: userName,
      email: userEmail,
    },
  };

  return await makePostRequest(options);
};

export const updateUserInDB = async (
  userId: string,
  userEmail: string,
  userName: string
): Promise<AxiosResponse<void>> => {
  const options = {
    requestUrl: `${import.meta.env.VITE_API_URL}/users/${userId}`,
    requestBody: {
      email: userEmail,
      name: userName,
    },
  };

  return await makePutRequest(options);
};
