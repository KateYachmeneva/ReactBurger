import { useParams, useLocation } from "react-router-dom";
import { useMemo } from "react";
import styles from "./order-info.module.css";
import { useSelector } from "../../services/store";
import {
  TFeedOrder,
  TIngredientData,
  formatOrderStatus,
} from "../../services/types/types";
import { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/store";
import { API_WSS_FEED_USER, API_WSS_FEED } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { connect, disconnect } from "../../services/actions/actions";
import Preloader from "../preloader/preloader";

function OrderInfo() {
  const dispatch = useDispatch();
  const accessToken = getCookie("authToken");
  const location = useLocation();
  const url = location.pathname.includes("feed")
    ? API_WSS_FEED
    : `${API_WSS_FEED_USER}?token=${accessToken}`;
  useEffect(() => {
    dispatch(connect(url));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  const { orders } = useSelector((state) => state.feed);
  const feed = useParams();
  console.log(feed);
  const { data } = useSelector((state) => state.ingredients);
  const { number } = useParams();
  const order: TFeedOrder | undefined = orders?.find(
    (item) => item.number.toString() === number,
  );

  const memoOrder = useMemo(() => {
    if (!data.length || !orders?.length) return null;

    const ingredientsInfo: Array<TIngredientData> = order?.ingredients.reduce(
      (acc: any, item: string) => {
        const ingredient = data.find((ing) => ing._id === item);
        acc.push(ingredient);
        return acc;
      },
      [],
    );
    const oneIngredients: Array<TIngredientData> = ingredientsInfo.filter(
      (element, index, selfArr) =>
        index === selfArr.findIndex((t) => t._id === element._id),
    );
    type TcountIngredients = {
      [key: string]: number;
    };
    const countIngredients = ingredientsInfo.reduce(
      (acc: TcountIngredients, ingredient: { _id: string | number }) => {
        acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
        return acc;
      },
      {},
    );
    const total = ingredientsInfo.reduce((acc: any, item: TIngredientData) => {
      return acc + item.price;
    }, 0);
    return {
      ...order,
      ingredientsInfo,
      oneIngredients,
      countIngredients,
      total,
    };
  }, [data, order, orders?.length]);

  if (order && memoOrder)
    return (
      <section className={`${styles.order} mt-5`}>
        <h1 className="text text_type_digits-default mb-10">{`# ${number}`}</h1>
        <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
        <p className="text text_type_main-default mb-15 text_color_success">
          {formatOrderStatus(order.status)}
        </p>
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <ul className={`${styles.ingredients} mb-10 custom-scroll`}>
          {memoOrder.oneIngredients.map((ingredient, index) => (
            <li key={index}>
              <div className={styles.ingredient}>
                <div className={styles.ingredientWrapper}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
              </div>
              <p className={styles.ingredientName}>{ingredient.name}</p>
              <div className={styles.count}>
                <div>
                  {memoOrder.countIngredients[ingredient._id]}
                  <span>x</span>
                  {ingredient.price}
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <div className={styles.total}>
            <p className="text text_type_digits-default">{memoOrder.total}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    );
  else {
    return <Preloader />;
  }
}

export default OrderInfo;
