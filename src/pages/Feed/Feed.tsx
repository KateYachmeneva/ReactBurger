import styles from "./feed.module.css";
import FeedInfo from "../../components/FeedInfo/FeedInfo";
import FeedList from "../../components/FeedList/FeedList";
import { useDispatch } from "../../services/store";
import { API_WSS_FEED } from "../../utils/constants";
import { connect, disconnect } from "../../services/actions/actions";
import { useEffect } from "react";

function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(API_WSS_FEED));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

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
