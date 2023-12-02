import styles from "./feedlist.module.css";
import OrderCard from "../OrderCard/OrderCard";
import { useSelector } from "../../services/store";

function FeedList() {
  const { orders } = useSelector((state) => state.feed);
  return (
    <div className={`${styles.container} custom-scroll`}>
      {orders?.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
}

export default FeedList;
