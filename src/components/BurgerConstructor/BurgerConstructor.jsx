import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./ConstructorIngredient/ConstructorIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { sendData } from "../../services/slices/orderDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addconstrIngredients,
  setconstrBun,
  undoconstrIngredients,
} from "../../services/slices/constrIngredientsSlice";
import { useDrop } from "react-dnd";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(
    (store) => store.constrIngredients,
  );
  const { bun } = useSelector((store) => store.constrIngredients);

  const [isOrderOpen, setisOrderOpen] = useState(false);

  const orderIngredients = () => {
    const allIngredients = [
      bun._id,
      ...constructorIngredients.map((item) => item._id),
      bun._id,
    ];
    return allIngredients;
  };
  const price = useMemo(() => {
    if (constructorIngredients && bun)
      return (
        constructorIngredients.reduce((acc, item) => acc + item.price, 0) +
        bun.price * 2
      );
  }, [constructorIngredients, bun]);

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient) {
      if (ingredient.type !== "bun") {
        dispatch(addconstrIngredients(ingredient));
      } else {
        dispatch(setconstrBun(ingredient));
      }
    },
  });
  function submitOrder() {
    dispatch(sendData(orderIngredients()));
    setisOrderOpen(true);
  }

  function closeModal() {
    setisOrderOpen(false);
    dispatch(undoconstrIngredients([]));
    dispatch(setconstrBun(null));
  }

  return (
    <>
      <section className={`${styles.constructor} pt-25 mb-10`}>
        <div className={`${styles.burger_item} mb-10`} ref={dropTarget}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}

          <ul className={`${styles.list} mb-4 mt-4 pr-2 custom-scroll`}>
            {constructorIngredients.map((ingredient, index) => (
              <ConstructorIngredient
                ingredient={ingredient}
                key={ingredient.uuid}
                index={index}
              />
            ))}
          </ul>
          {constructorIngredients.length === 0 && !bun && (
            <p className={`${styles.note} text text_type_main-medium`}>
              Перенесите ингдиенты в конструктор
            </p>
          )}
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        <div className={`${styles.container} pr-4`}>
          <p
            className={`${styles.currency} mr-10 text text_type_digits-medium`}
          >
            {price}
            <CurrencyIcon
              className={styles.container}
              style={{ width: "33px" }}
            />
          </p>
          <Button
            disabled={constructorIngredients.length === 0 || !bun}
            htmlType="button"
            type="primary"
            size="large"
            onClick={submitOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isOrderOpen && (
        <Modal onClose={closeModal} isOpen={isOrderOpen}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
