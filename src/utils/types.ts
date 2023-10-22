export type TIngredientData = {
  _id: string,
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
};
export type TIngredientDataWithUuid = TIngredientData & {
  uuid:string
}
export type TLink = {
  title: string,
  linkName: string,
  path: string,
};

export type TUserData = {
  name: string,
  email: string,
};

export type TFullUserData = {
  email: string;
  name: string;
  password: string;
};
 export type TAuthData = {
  email: string,
  password: string,
}
export type TFormData = {
  [key:string]:string
};
export type TOrderData = {
  name: string,
  order: {
    number: number |null
  },
  success: boolean
};

export type TTokenData = {
  accessToken: string,
  refreshToken: string
};
export interface ILoginUserData {
  email: string
  password: string
 }
export interface IIngredientsResponse {
  id: number
  name: string
  email: string
  phone: string
};
