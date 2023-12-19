import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import { useNavigate } from "react-router-dom";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./ConstructorIngredient/ConstructorIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { sendData } from "../../services/slices/orderDetailsSlice";
import { useDispatch, useSelector } from "../../services/store";
import {
  addconstrIngredients,
  setconstrBun,
  undoconstrIngredients,
} from "../../services/slices/constrIngredientsSlice";
import { useDrop } from "react-dnd";
import {
  TIngredientData,
  TIngredientDataWithUuid,
} from "../../services/types/types";

export default function BurgerConstructor() {
  const { user } = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    constructorIngredients,
  }: { constructorIngredients: Array<TIngredientDataWithUuid> } = useSelector(
    (store) => store.constrIngredients,
  );
  const { bun } = useSelector((store) => store.constrIngredients);

  const [isOrderOpen, setisOrderOpen] = useState(false);

  function orderIngredients() {
    const allIngredients = [
      bun._id,
      ...constructorIngredients.map((item) => item._id),
      bun._id,
    ];
    return allIngredients;
  }

  const price = useMemo(() => {
    if (constructorIngredients && bun)
      return (
        constructorIngredients.reduce((acc, item) => acc + item.price, 0) +
        bun.price * 2
      );
  }, [constructorIngredients, bun]);

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient: TIngredientData) {
      if (ingredient.type !== "bun") {
        dispatch(addconstrIngredients(ingredient));
      } else {
        dispatch(setconstrBun(ingredient));
      }
    },
  });
  function submitOrder() {
    if (user.name) {
      //@ts-ignore
      dispatch(sendData(orderIngredients()) as any);
      setisOrderOpen(true);
    } else {
      navigate("/login");
    }
  }

  function closeModal() {
    setisOrderOpen(false);
    dispatch(undoconstrIngredients([]));
    dispatch(setconstrBun(null));
  }

  return (
    <>
      <section className={`${styles.constructor} pt-25 mb-10`}>
        <div
          className={`${styles.burger_item} mb-10`}
          ref={dropTarget}
          data-testid="constructor"
        >
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
                key={ingredient._id}
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
            <CurrencyIcon type="primary" />
          </p>
          <Button
            disabled={constructorIngredients.length === 0 || !bun}
            htmlType="button"
            type="primary"
            size="large"
            onClick={submitOrder}
            data-testid="order-button"
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
