import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function IngredientDetails(props) {
  console.log(props)
  let { id } = useParams();
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large mt-2`}>
        Детали ингредиента
      </h2>
      <img src={props.ingridient.image_large} alt={props.ingridient.name} />
      <p className="mt-4 mb-8 text text_type_main-medium">
        {props.ingridient.name}
      </p>
      <ul
        className={`${styles.table} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.tableItem}>
          <h3 className="text text_type_main-default mb-2">Калории,ккал</h3>
          <p className="text text_type_digits-default">
            {props.ingridient.calories}
          </p>
        </li>
        <li className={styles.tableItem}>
          <h3 className="text text_type_main-default mb-2">Белки, г</h3>
          <p className="text text_type_digits-default">
            {props.ingridient.proteins}
          </p>
        </li>
        <li className={styles.tableItem}>
          <h3 className="text text_type_main-default mb-2">Жиры, г</h3>
          <p className="text text_type_digits-default">
            {props.ingridient.calories}
          </p>
        </li>
        <li className={styles.tableItem}>
          <h3 className="text text_type_main-default mb-2">Углеводы, г</h3>
          <p className="text text_type_digits-default">
            {props.ingridient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
IngredientDetails.propTypes = {
  ingridient: PropTypes.shape({
    id: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
