const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
   if (res.ok){
      return res.json();
   }
   return Promise.reject(`ошибка ${res.status}`)
};

export const getIngridientsApi = () => {
   return fetch (`${API_URL}/ingredients`,{
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      }
   })
   .then(checkResponse)
};