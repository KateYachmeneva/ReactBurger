import styles from "./ordercard.module.css";
import bunImage from "../../images/bun-01.png"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

 function OrderCard() {
  return (
    <li className={`${styles.order} p-6`}>
<h3 className="text text_type_digits-default">27221</h3>
<p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
<h2 className={`${styles.orderTitle} text text_type_main-medium`}>Death Star Starship Main бургер</h2>
<p className={`${styles.status} text text_type_main-default`}>Создан</p>
<ul className= {styles.ingredients}>
  <li className={styles.ingridient}>
    <div>
      <img src={bunImage}/>
    </div>
  </li>
</ul>
<div className={styles.total}>
<p className="text text_type_digits-default">480</p>
        <CurrencyIcon type="primary" />
</div>
</li>
  )
}

export default OrderCard;
