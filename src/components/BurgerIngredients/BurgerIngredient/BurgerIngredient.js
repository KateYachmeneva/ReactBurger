import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-ingredient.module.css";
import { Counter,CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerIngredient({item,onClick}){
    
       return (
        <article className={styles.ingredient} onClick={onClick}>
           <img className="mb-1" src={item.image}/>
           <Counter className={styles.counter}  count={1} size="default" extraClass="m-1" />
           <div className={styles.price}>
           <p className="mb-1 text text_type_main-medium">
            {item.price}</p>
                  <CurrencyIcon type = "primary" />
                  </div>
           <h3 className="text text_type_main-default">{item.name}</h3>
        </article>

    )
}
BurgerIngredient.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  };