import { useState, useEffect} from 'react';
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { useInView } from "react-intersection-observer";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";

export default function BurgerIngredients({data}){
  const [current, setCurrent] = useState("buns");
  const [bunsRef, bunsInView, bunsTab] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesTab] = useInView({ threshold: 0 });
  const [mainsRef, mainsInView, mainsTab] = useInView({ threshold: 0 });
   
  const onTabClick = (tabType, entry) => {
    setCurrent(tabType);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    mainsInView && setCurrent("main");
    saucesInView && setCurrent("sauce");
    bunsInView && setCurrent("buns");
  }, [bunsInView, saucesInView, mainsInView]);
    return (
        <section  className = {styles.section_ingridients}>
            <h1 className = "text text_type_main-large mt-10 mb-5"> Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
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
    <div className = {`${styles.content} custom-scroll`}>
    <h2 className = "text text_type_main-medium mt-10 mb-6" ref={bunsRef}>Булки</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="bun").map((item)=>
     <li key = {item._id} className={styles.ingredient}>
        <BurgerIngredient item={item} />
     </li>)}
    </ul>
    <h2 className = "text text_type_main-medium mt-10 mb-6" ref={saucesRef}>Соусы</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="sauce").map((item)=>
     <li key = {item._id} className={styles.ingredient}>
        <BurgerIngredient item={item}/>
     </li>)}
    </ul>
    <h2 className = "text text_type_main-medium mt-10 mb-6" ref={mainsRef}>Начинки</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="main").map((item)=>
     <li key = {item._id}  className={styles.ingredient}>
        <BurgerIngredient item={item} />
     </li>)}
    </ul>
    </div>
        </section>
        );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(ingredientType)
  )
};