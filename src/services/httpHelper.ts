import axios, { Method, AxiosResponse } from "axios";
import { auth } from "./firebase";

const logoutIfUnauthorized = (error: any) => {
  if (error.response?.status === 401) {
    window.location.href = "/login";
  }
};

interface GetRequestParams {
  requestUrl: string;
  requestHeaders?: object;
}

interface PostRequestParams extends GetRequestParams {
  requestBody?: object;
}

export const makePostRequest = async ({
  requestUrl,
  requestBody,
  requestHeaders,
}: PostRequestParams) => {
  const requestOptions = {
    method: "POST" as Method,
    url: requestUrl,
    data: requestBody,
    headers: {
      ...requestHeaders,
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  };

  return await axios(requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error: any) => {
      logoutIfUnauthorized(error);

      return error.response
        ? error.response
        : {
            status: 500,
            data: {
              message:
                "The network request failed with an internal server error",
              error,
            },
          };
    });
};

export const makeDeleteRequest = async ({
  requestUrl,
  requestBody,
  requestHeaders,
}: PostRequestParams) => {
  const requestOptions = {
    method: "DELETE" as Method,
    url: requestUrl,
    data: requestBody,
    headers: {
      ...requestHeaders,
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  };

  return await axios(requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error: any) => {
      logoutIfUnauthorized(error);

      return error.response
        ? error.response
        : {
            status: 500,
            data: {
              message:
                "The network request failed with an internal server error",
              error,
            },
          };
    });
};

export const makePutRequest = async ({
  requestUrl,
  requestBody,
  requestHeaders,
}: PostRequestParams) => {
  const requestOptions = {
    method: "PUT" as Method,
    url: requestUrl,
    data: requestBody,
    headers: {
      ...requestHeaders,
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  };

  return await axios(requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logoutIfUnauthorized(error);

      return error.response
        ? error.response
        : {
            status: 500,
            data: {
              message:
                "The network request failed with an internal server error",
              error,
            },
          };
    });
};

export const makeDownloadRequest = async <T, R = AxiosResponse<T>>({
  requestUrl,
  requestHeaders,
}: GetRequestParams): Promise<R> => {
  const requestOptions = {
    method: "GET" as Method,
    responseType: "blob",
    headers: {
      ...requestHeaders,
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  };

  return await axios
    .get(requestUrl, { ...requestOptions, responseType: "blob" })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logoutIfUnauthorized(error);

      return error.response ? error.response : error;
    });
};

// SWR
export const makeGetRequest = async (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        ["Content-Type"]: "application/json; charset=utf-8",
      },
    })
    .then((res) => res.data);

const getAccessToken = async () => {
  const idToken = await auth.currentUser?.getIdTokenResult();
  if (!idToken) {
    return "";
  }
  return idToken.token;
};
