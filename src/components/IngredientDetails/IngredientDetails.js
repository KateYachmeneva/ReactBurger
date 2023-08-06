import Modal from "../Modal/Modal";
import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';


export default function IngredientDetails(props){
    return (
        <Modal {...props}>
        <div className={styles.container}>
          <h2 className={`${styles.title} text text_type_main-large mt-2`}>Детали ингредиента</h2>
          <img src={props.ingridient.image_large} alt={props.ingridient.name}/>
          <p className="mt-4 mb-8 text text_type_main-medium">{props.ingridient.name}</p>
          <ul className={`${styles.table} text text_type_main-default text_color_inactive`}>
            <li className={styles.tableItem}>
              <h3 className="text text_type_main-default mb-2">Калории,ккал</h3>
              <p className="text text_type_digits-default">{props.ingridient.calories}</p>
            </li>
            <li className={styles.tableItem}>
              <h3 className="text text_type_main-default mb-2">Белки, г</h3>
              <p className="text text_type_digits-default">{props.ingridient.proteins}</p>
            </li>
            <li className={styles.tableItem}>
              <h3 className="text text_type_main-default mb-2">Жиры, г</h3>
              <p className="text text_type_digits-default">{props.ingridient.calories}</p>
            </li>
            <li className={styles.tableItem}>
              <h3 className="text text_type_main-default mb-2">Углеводы, г</h3>
              <p className="text text_type_digits-default">{props.ingridient.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </Modal>

    );
}