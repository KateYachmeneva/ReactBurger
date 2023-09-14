import styles from './profile-menu.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/slices/logoutSlice";
import { useDispatch } from 'react-redux';


export default function ProfileMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/profile")
    }
  return (
    <nav className={styles.menu}>
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        `${styles.link} text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`
      }
    >
      Профиль
    </NavLink>
    <NavLink
      to="/order-history"
      className={({ isActive }) =>
        `${styles.link} text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`
      }
    >
      История заказов
    </NavLink>
    <button
      onClick={handleLogout}
      className={`${styles.link} text_type_main-medium text_color_inactive`}
    >
      Выход
    </button>
  </nav>
  )
}
