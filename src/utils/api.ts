import { getCookie } from "./cookie";
import {
  TIngredientData,
  TFormData,
  TFullUserData,
  ILoginUserData,
  TUserData,
  TTokenData,
} from "../utils/types";
const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
};
const checkSuccess = (
  data: { success: string; data: any },
  returnData: any,
  // returnData: Promise<CustomResponse<TResponseBody<>>
) => {
  return data.success
    ? returnData
    : () => {
        throw new Error("Внутренняя ошибка апи");
      };
};
export const request = <T>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then((res) => checkResponse<T>(res));
};

export const getIngredientsApi = async (): Promise<TIngredientData[]> => {
  const res = await fetch(`${API_URL}/ingredients`);
  const data = (await checkResponse(res)) as { success: string; data: any };
  return checkSuccess(data, data.data);
};

// export const getIngridientsApi = () => {
//   return request<TIngredientData[]>(`${API_URL}/ingredients`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
// };

export const submitOrderApi = (ingredients: Array<TIngredientData>) => {
  return request(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

//auth

export const updateTokenApi = (token: string) => {
  return request<TTokenData>(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};

export const getUserDataApi = () => {
  return request<TUserData>(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("authToken"),
    },
  });
};

export const updateUserDataApi = (token: string, data: TFormData) => {
  return request<{ user: TUserData } & TTokenData>(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const registerUserRequestApi = (data: TFullUserData) => {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginUserDataApi = ({
  email,
  password,
}: ILoginUserData): Promise<TTokenData> => {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
export const logOut = (token: string) => {
  return request(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};

export const forgotPasswordApi = (email: string) => {
  return request(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
};

export const resetPasswordApi = (data: TFormData) => {
  return request(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const logoutApi = (token: string) => {
  return request(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};
