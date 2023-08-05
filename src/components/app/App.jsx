import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import data from "../../utils/data.js";


function App() {
  return (
    <div>
      |<AppHeader/>
    <main className = {styles.main}>
      <BurgerIngredients data = {data}/>
      <BurgerConstructor data = {data}/>
      </main>
      </div>
  );
}

export default App;
