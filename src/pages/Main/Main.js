import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main.module.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";

function Main() {
    return (
      <div className="page text text_type_main-default">
           <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </main>
      </div>
    );
  }
  
  export default Main;

