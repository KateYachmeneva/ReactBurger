import styles from "./order-info.module.css";
import bunImage from "../../images/bun-01.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderInfo() {
  // const { data, isLoading } = useSelector((store) => store.ingredients);

  // let { ingredientId } = useParams();

  // if (isLoading) {
  //   // Показываем Preloader во время загрузки данных
  //   return <Preloader />;
  // }

  // let ingredient = data.find((ingredient) => ingredient._id === ingredientId);

  return (
    <main className={styles.main}>
      <section className={styles.order}>
        <h1 className="text text_type_digits-default mb-10">#034533</h1>
        <h2 className="text text_type_main-medium mb-3">
          Black Hole Singularity острый бургер
        </h2>
        <p className="text text_type_main-default mb-15 text_color_success">
          Выполнен
        </p>
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <ul className={`${styles.container} mb-10 custom-scroll`}>
          <li>
            <div className={styles.ingredient}>
              <div>
                <img src={bunImage} />
              </div>
            </div>
            <p>Флюоресцентная булка R2-D3</p>
            <div className={styles.count}>
              <div>
                2<span>x</span>
                20
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вчера, 13:50
          </p>
          <div className={styles.total}>
            <p className="text text_type_digits-default">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderInfo;
