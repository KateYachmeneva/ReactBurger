import React, { FC, useMemo } from "react";
import styles from "./ordercard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedOrder, TIngredientData } from "../../services/types/types";
import { useSelector } from "../../services/store";
import { Link, useLocation } from "react-router-dom";
type OrderCardPropsType = {
  order: TFeedOrder;
};
const OrderCard: FC<OrderCardPropsType> = ({ order }) => {
  const { data } = useSelector((state) => state.ingredients);
  const location = useLocation();
  const navigateRoute =
    location.pathname === "/feed"
      ? `/feed/${order.number}`
      : `/order-history/${order.number}`;
  const maxIngredientsToShow = 6;
  const memoOrder = useMemo(() => {
    if (!data.length) {
      return null;
    }

    const ingredientsInfo = order.ingredients.reduce(
      (acc: any, item: string) => {
        const ingredient = data.find((ing) => ing._id === item);
        if (ingredient) acc.push(ingredient);
        return acc;
      },
      [],
    );
    const total = ingredientsInfo.reduce((acc: any, item: TIngredientData) => {
      return acc + item.price;
    }, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredientsToShow);
    const hiddenIngredients =
      ingredientsInfo.length > maxIngredientsToShow
        ? ingredientsInfo.length - maxIngredientsToShow
        : null;

    return {
      ...order,
      ingredientsInfo,
      total,
      ingredientsToShow,
      hiddenIngredients,
    };
  }, [data, order]);
  if (!memoOrder) return null;

  return (
    <Link
      to={navigateRoute}
      state={{ background: location }}
      key={order._id}
      className={styles.Link}
    >
      <article className={`${styles.order} p-6`}>
        <h3 className="text text_type_digits-default">{order.number}</h3>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <h2 className={`${styles.orderTitle} text text_type_main-medium`}>
          {order.name}
        </h2>
        <ul className={styles.ingredients}>
          {memoOrder.ingredientsToShow.map(
            (item: TIngredientData, index: number) => {
              let zIndex = maxIngredientsToShow - index;
              let ishidden = index + 1 === maxIngredientsToShow;
              return (
                <li
                  className={styles.ingredient}
                  key={index}
                  style={{ zIndex: zIndex }}
                >
                  <div
                    className={`${styles.ingredientWrapper} ${
                      ishidden && styles.ingredientWrapperDissabled
                    }`}
                  >
                    <img src={item.image_mobile} alt={item.name} />
                    {ishidden ? (
                      <span
                        className={`${styles.count} text text_type_main-defaul`}
                      >
                        {" "}
                        + {memoOrder.hiddenIngredients}
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            },
          )}
        </ul>
        <div className={styles.total}>
          <p className="text text_type_digits-default">{memoOrder.total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </article>
    </Link>
  );
};

export default OrderCard;
