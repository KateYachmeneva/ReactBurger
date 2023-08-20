import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredients } from "../../services/slices/ingridientsSlice"


function App() {
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(getIngredients())
    },[dispatch]);

  const { data, isLoading, hasError } = useSelector((store) => store.ingredients);
   return (
    <div>
      <AppHeader/>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      <main className = {styles.main}>
      {!isLoading && !hasError}
      <BurgerIngredients data = {data}/>
      <BurgerConstructor data = {data}/>
      </main>
      </div>
  );
}

export default App;
