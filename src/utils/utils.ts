import { TFormData, TUserData } from "./types";
export function objectsComparison(obj1: TUserData, obj2: TFormData): boolean {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  if (entries1.length !== entries2.length) {
    return false;
  }
  for (let i = 0; i < entries1.length; ++i) {
    if (entries1[i][0] !== entries2[i][0]) {
      return false;
    }
    if (entries1[i][1] !== entries2[i][1]) {
      return false;
    }
  }
  return true;
}
