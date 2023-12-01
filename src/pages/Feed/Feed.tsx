import styles from "./feed.module.css";
import FeedInfo from "../../components/FeedInfo/FeedInfo";
import FeedList from "../../components/FeedList/FeedList";
import { useDispatch, useSelector } from "../../services/store";
import { API_WSS_FEED } from "../../utils/constants";
import { connect, disconnect } from "../../services/actions/actions";
import { useEffect } from "react";

function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.feed);
  useEffect(() => {
    dispatch(connect(API_WSS_FEED));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  console.log(orders);
  console.log(total);
  console.log(totalToday);
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5"> Лента заказов</h1>
      <div className={styles.container}>
        <FeedList />
        <FeedInfo />
      </div>
    </main>
  );
}
export default Feed;
