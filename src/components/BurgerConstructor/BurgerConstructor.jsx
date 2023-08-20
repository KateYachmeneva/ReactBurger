import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from 'prop-types';

export default function BurgerConstructor(props){
  
    const img = "https://code.s3.yandex.net/react/code/bun-02.png";
    const [order, setOrder] = React.useState({ number: "034536" });
    
    const [isOrderOpen, setisOrderOpen] = useState(false);
    console.log(props.data)
    
    const price = useMemo( ()  => {
 
      return (
        (
         props.data.reduce((acc, item) =>  acc + item.price, 0) 
        )
      )
    }
       
       
       
      ,[props.data]);
console.log(price);
    function submitOrder () {
      setisOrderOpen(true);
      }

    function closeModal () {
        setisOrderOpen(false);
        }
    

    return (
      <>
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
              <li key={item._id} >
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
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
            extraClass="mr-5"
          />
        </div>
        <div className={`${styles.container} pr-4`}>
          <p className={`${styles.currency} mr-10 text text_type_digits-medium`}>
         {price}
            <CurrencyIcon className={styles.container} style={{ width: "33px"}}/>
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isOrderOpen && (
        <Modal onClose={closeModal} isOpen={isOrderOpen}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
      </>
      
    );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(ingredientType)
  )
};