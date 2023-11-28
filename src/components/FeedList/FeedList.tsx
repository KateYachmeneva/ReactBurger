import styles from "./feedlist.module.css";
import OrderCard from "../OrderCard/OrderCard";
function FeedList() {
  return (
    <section className={styles.section_feedlist}>
      <ul className={`${styles.container} custom-scroll`}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ul>
    </section>
  );
}

export default FeedList;
