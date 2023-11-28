import styles from "./orderhistory.module.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import FeedList from '../../components/FeedList/FeedList';

function OrderHistory() {
  return (
    <main className={`${styles.content} mt-30`}>

        <ProfileMenu />
        <FeedList />

    </main>
  )
};

export default OrderHistory;