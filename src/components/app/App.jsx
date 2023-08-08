import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import * as api from '../../utils/api'


function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect (() => {
    api.getIngridients()
    .then (({isSuccess, data}) => setState ({...state,data,isLoading:false}))
    .catch(e => {
      setState({...state, hasError:true, isLoading:false});
    });  
   },[] );

  const { data, isLoading, hasError } = state;
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
