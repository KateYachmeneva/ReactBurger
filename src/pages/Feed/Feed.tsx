import styles from "./feed.module.css";
import FeedInfo from "../../components/FeedInfo/FeedInfo";
import FeedList from "../../components/FeedList/FeedList";
import Main from "../Main/Main";

function Feed() {
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
