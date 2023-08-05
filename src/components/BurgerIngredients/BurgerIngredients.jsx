import React from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

export default function BurgerIngredients(props){
    const data = props.data;

    const [current, setCurrent] = React.useState('buns');


    return (
        <section  className = {styles.section_ingridients}>
            <h1 className = "text text_type_main-large mt-10 mb-5"> Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className = {`${styles.content} custom-scroll`}>
    <h2 className = "text text_type_main-medium mt-10 mb-6">Булки</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="bun").map((item)=>
     <li key = {item._id}>
        <BurgerIngredient{...item}/>
     </li>)}
    </ul>
    <h2 className = "text text_type_main-medium mt-10 mb-6">Соусы</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="sauce").map((item)=>
     <li key = {item._id}>
        <BurgerIngredient{...item}/>
     </li>)}
    </ul>
    <h2 className = "text text_type_main-medium mt-10 mb-6">Начинки</h2>
    <ul className={`${styles.list} mb-10`}>
     {data.filter(item => item.type ==="main").map((item)=>
     <li key = {item._id}>
        <BurgerIngredient{...item}/>
     </li>)}
    </ul>
    </div>
        </section>
        );
}