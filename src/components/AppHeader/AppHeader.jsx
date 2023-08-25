import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.header_container} pb-4 pt-4`}>
        <nav className={styles.header_nav}>
          <a className={`${styles.header_link} p-4`} href="#">
            <BurgerIcon type="primary" />
            <p className="text_type_main-default text_color_primary ml-2">
              Конструктор
            </p>
          </a>
          <a className={`${styles.header_link} p-4`} href="#">
            <ListIcon type="secondary" />
            <p className="text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </a>
        </nav>
        <Logo />
        <a className={`${styles.header_link} p-4`} href="#">
          <ProfileIcon type="secondary" />
          <p className="text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
}
