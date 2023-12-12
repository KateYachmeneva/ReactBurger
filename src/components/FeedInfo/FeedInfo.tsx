import styles from "./feedinfo.module.css";
import { useSelector } from "../../services/store";
import React from "react";

function FeedInfo() {
  const { orders, total, totalToday } = useSelector((state) => state.feed);
  if (!orders || !orders.length) {
    return null;
  }
  const doneOrders = orders
    .filter((item) => item.status === "done")
    .map((item) => item.number)
    .slice(0, 10);
  const inProgressOrders = orders
    .filter((item) => item.status !== "done")
    .map((item) => item.number)
    .slice(0, 10);

  return (
    <section className={styles.section_feedlist}>
      <div>
        <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
        <ul className={styles.list}>
          {doneOrders?.map((item, index) => (
            <li
              key={index}
              className="text text_type_digits-default text_color_success"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-6">В работе:</h3>
        <ul>
          {inProgressOrders?.map((item, index) => (
            <li key={index} className="text text_type_digits-default">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.wrapper}>
        <h3 className="text text_type_main-medium">Готовы:</h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.wrapper}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large ">{totalToday}</p>
      </div>
    </section>
  );
}
export default FeedInfo;
