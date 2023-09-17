import { getCookie } from "../utils/cookie";

const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getIngridientsApi = () => {
  return request(`${API_URL}/ingredients`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const submitOrderApi = (ingredients) => {
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

export const updateTokenApi = (token) => {
  return request(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};

export const getUserDataApi = () => {
  return request(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("authToken"),
    },
  });
};

export const updateUserDataApi = (token, data) => {
  return request(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const registerUserRequestApi = (data) => {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginUserDataApi = ({ email, password }) => {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
export const logOut = (token) => {
  return request(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};

export const forgotPasswordApi = (email) => {
  return request(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
};

export const resetPasswordApi = (data) => {
  return request(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const logoutApi = (token) => {
  return request(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
};
