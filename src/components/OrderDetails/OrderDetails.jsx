import React from "react";
import styles from "./order-details.module.css";
import doneIconPath from "../../images/done-icon.svg";
import PropTypes from "prop-types";


export default function OrderDetails({ orderNumber }) {
  return (
    <>
      <h2
        className={`${styles.number} text text_type_digits-large`}
      >
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
      <img
        src={doneIconPath}
        alt="Галочка"
        className={`${styles.doneIcon} mt-15 mb-15`}
      ></img>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
  }

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
};