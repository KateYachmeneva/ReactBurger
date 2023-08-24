import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";
import { setSelectedIngredient } from "../../../services/slices/ingredientsSlice";
import { useDrag } from "react-dnd";

export default function BurgerIngredient({ item, count }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setSelectedIngredient(item));
  }

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <>
      {count !== 0 ? (
        <Counter
          className={styles.counter}
          count={count}
          size="default"
          extraClass="m-1"
        />
      ) : (
        ""
      )}
      <article
        className={styles.ingredient}
        onClick={handleClick}
        ref={dragRef}
      >
        <img className="mb-1" src={item.image} />
        <div className={styles.price}>
          <p className="mb-1 text text_type_main-medium">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className="text text_type_main-default">{item.name}</h3>
      </article>
    </>
  );
}
BurgerIngredient.propTypes = {
  item: PropTypes.shape(ingredientType),
  count: PropTypes.number,
};
