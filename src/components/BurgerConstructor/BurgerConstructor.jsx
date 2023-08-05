import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructorr(props){
    const img = "https://code.s3.yandex.net/react/code/bun-02.png"
    return (
        <section className={`${styles.constructor} pt-25 mb-10`}>
        <div className={`${styles.burger_item} mb-10`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
            extraClass="mr-5"
          />
          <ul className={`${styles.list} mb-4 mt-4 pr-2 custom-scroll`}>
            {props.data.map((item) => 
              <li key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            )}
          </ul>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
            extraClass="mr-5"
          />
        </div>
        <div className={`${styles.container} pr-4`}>
          <p className={`${styles.currency} mr-10 text text_type_digits-medium`}>
            610
            <CurrencyIcon className={styles.container} style={{ width: "33px"}}/>
          </p>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
}