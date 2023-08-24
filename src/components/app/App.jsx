import { useEffect } from "react";
import { useDispatch} from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredients } from "../../services/slices/ingredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(getIngredients())
    },[dispatch]);

 
   return (
    <div>
      <AppHeader/>
      <main className = {styles.main}>
      <DndProvider backend={HTML5Backend}>
         <BurgerIngredients/>
         <BurgerConstructor/>
      </DndProvider>
      </main>
      </div>
  );
}

export default App;
