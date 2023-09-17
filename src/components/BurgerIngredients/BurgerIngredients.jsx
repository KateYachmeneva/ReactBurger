import { useState, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { useInView } from "react-intersection-observer";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { setSelectedIngredient } from "../../services/slices/ingredientsSlice";

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("buns");
  const [bunsRef, bunsInView, bunsTab] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesTab] = useInView({ threshold: 0 });
  const [mainsRef, mainsInView, mainsTab] = useInView({ threshold: 0 });
  const { constructorIngredients } = useSelector(
    (store) => store.constrIngredients,
  );
  const { bun } = useSelector((store) => store.constrIngredients);
  const { selectedIngredient } = useSelector((store) => store.ingredients);
  const { data, isLoading, hasError } = useSelector(
    (store) => store.ingredients,
  );
  function closeModal() {
    dispatch(setSelectedIngredient());
  }
  const onTabClick = (tabType, entry) => {
    setCurrent(tabType);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    mainsInView && setCurrent("main");
    saucesInView && setCurrent("sauce");
    bunsInView && setCurrent("buns");
  }, [bunsInView, saucesInView, mainsInView]);

  const calculateCount = (ingredient) => {
    let count = 0;
    if (constructorIngredients && bun) {
      if (ingredient.type !== "bun") {
        constructorIngredients.forEach((item) => {
          if (ingredient._id === item._id) {
            count++;
          }
        });
      } else {
        if (ingredient._id === bun._id) {
          count = 2;
        }
      }
    }
    return count;
  };

  return (
    <section className={styles.section_ingridients}>
      <h1 className="text text_type_main-large mt-10 mb-5"> Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => onTabClick("buns", bunsTab)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => onTabClick("sauce", saucesTab)}
        >
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "main"}
          onClick={() => onTabClick("main", mainsTab)}
        >
          Начинки
        </Tab>
      </div>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {!isLoading && !hasError}
      <div className={`${styles.content} custom-scroll`}>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
          Булки
        </h2>
        <ul className={`${styles.list} mb-10`}>
          {data
            .filter((item) => item.type === "bun")
            .map((item) => (
              <li key={item._id} className={styles.ingredient}>
                <BurgerIngredient item={item} count={calculateCount(item)} />
              </li>
            ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          Соусы
        </h2>
        <ul className={`${styles.list} mb-10`}>
          {data
            .filter((item) => item.type === "sauce")
            .map((item) => (
              <li key={item._id} className={styles.ingredient}>
                <BurgerIngredient item={item} count={calculateCount(item)} />
              </li>
            ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainsRef}>
          Начинки
        </h2>
        <ul className={`${styles.list} mb-10`}>
          {data
            .filter((item) => item.type === "main")
            .map((item) => (
              <li key={item._id} className={styles.ingredient}>
                <BurgerIngredient item={item} count={calculateCount(item)} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
