const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
   if (res.ok){
      return res.json();
   }
   return Promise.reject(`ошибка ${res.status}`)
};

function request(url, options) {
   return fetch(url, options).then(checkResponse)
 }

export const getIngridientsApi = () => {
   return request (`${API_URL}/ingredients`,{
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      }
   })
 };
 
export const submitOrderApi = (ingredients) => {

   return request(`${API_URL}/orders`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       ingredients: ingredients
     })
   })
 }