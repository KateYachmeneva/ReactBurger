import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.header_container} pb-4 pt-4`}>
        <nav className={styles.header_nav}>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} p-5 mr-2 ${
                isActive ? `text_color_primary` : `text_color_inactive`
              }`
            }
            to="/"
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} p-5 mr-2 ${
                isActive ? `text_color_primary` : `text_color_inactive`
              }`
            }
            to="/feed"
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} p-5 mr-2 ${
              isActive ? `text_color_primary` : `text_color_inactive`
            }`
          }
          to="/profile"
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
}
