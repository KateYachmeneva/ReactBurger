import React from "react";
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import Preloader from "../preloader/preloader";

export default function IngredientDetails() {
  const { data, isLoading } = useSelector((store) => store.ingredients);

  let { ingredientId } = useParams();

  if (isLoading) {
    // Показываем Preloader во время загрузки данных
    return <Preloader />;
  }

  let ingredient = data.find((ingredient) => ingredient._id === ingredientId);

  return (
    <>
      <div className={styles.container}>
        <h2 className={`${styles.title} text text_type_main-large mt-2`}>
          Детали ингредиента
        </h2>
        {ingredient ? (
          <>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className="mt-4 mb-8 text text_type_main-medium">
              {ingredient.name}
            </p>
            <ul
              className={`${styles.table} text text_type_main-default text_color_inactive`}
            >
              <li className={styles.tableItem}>
                <h3 className="text text_type_main-default mb-2">
                  Калории,ккал
                </h3>
                <p className="text text_type_digits-default">
                  {ingredient.calories}
                </p>
              </li>
              <li className={styles.tableItem}>
                <h3 className="text text_type_main-default mb-2">Белки, г</h3>
                <p className="text text_type_digits-default">
                  {ingredient.proteins}
                </p>
              </li>
              <li className={styles.tableItem}>
                <h3 className="text text_type_main-default mb-2">Жиры, г</h3>
                <p className="text text_type_digits-default">
                  {ingredient.calories}
                </p>
              </li>
              <li className={styles.tableItem}>
                <h3 className="text text_type_main-default mb-2">
                  Углеводы, г
                </h3>
                <p className="text text_type_digits-default">
                  {ingredient.carbohydrates}
                </p>
              </li>
            </ul>
          </>
        ) : (
          "Загрузка..."
        )}
      </div>
    </>
  );
}
