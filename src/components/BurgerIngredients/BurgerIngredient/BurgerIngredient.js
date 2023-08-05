import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-ingredient.module.css";
import { Counter,CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerIngredient(props){
    
       return (
        <article className={styles.ingredient}>
           <img className="mb-1" src={props.image}/>
           <Counter className={styles.counter}  count={1} size="default" extraClass="m-1" />
           <div className={styles.price}>
           <p className="mb-1 text text_type_main-medium">
            {props.price}</p>
                  <CurrencyIcon type = "primary" />
                  </div>
           <h3 className="text text_type_main-default">{props.name}</h3>
        </article>

    )
}
BurgerIngredient.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  };