import React, { FC } from "react";
import { useDispatch } from "../../../services/store";
import styles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setSelectedIngredient } from "../../../services/slices/ingredientsSlice";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredientData } from "../../../services/types/types";

type BurgerIngredientPropsType = {
  item: TIngredientData;
  count: number;
};
const BurgerIngredient: FC<BurgerIngredientPropsType> = ({ item, count }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientId = item["_id"];
  function handleClick() {
    dispatch(setSelectedIngredient(item));
  }

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <Link
      key={ingredientId}
      className={`${styles.link} text_color_primary`}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
    >
      {count !== 0 ? (
        <Counter extraClass={styles.counter} count={count} size="default" />
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
    </Link>
  );
};
export default BurgerIngredient;
