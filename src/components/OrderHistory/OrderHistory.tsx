import styles from "./orderhistory.module.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import FeedList from "../../components/FeedList/FeedList";
import { useDispatch } from "../../services/store";
import { useEffect } from "react";
import { API_WSS_FEED_USER } from "../../utils/constants";
import { connect, disconnect } from "../../services/actions/actions";
import { getCookie } from "../../utils/cookie";

function OrderHistory() {
  const dispatch = useDispatch();
  const accessToken = getCookie("authToken");

  useEffect(() => {
    dispatch(connect(`${API_WSS_FEED_USER}?token=${accessToken}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  return (
    <main className={`${styles.content} mt-30`}>
      <ProfileMenu />
      <FeedList />
    </main>
  );
}

export default OrderHistory;
