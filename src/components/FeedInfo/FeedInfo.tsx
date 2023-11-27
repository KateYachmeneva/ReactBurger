import styles from "./feedinfo.module.css";

import React from 'react'

 function FeedInfo() {
  return (
    <section className={styles.section_feedlist}>
      <div>
      <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
      <ul className={styles.list}><li className="text text_type_digits-default text_color_success">034533</li><li className="text text_type_digits-default text_color_success">034533</li><li className="text text_type_digits-default text_color_success">034533</li><li className="text text_type_digits-default text_color_success">034533</li><li className="text text_type_digits-default text_color_success">034533</li><li className="text text_type_digits-default text_color_success">034533</li></ul>
      </div>
      <div>
      <h3 className="text text_type_main-medium mb-6">В работе:</h3>  
      <ul><li className="text text_type_digits-default">034593</li></ul>
      </div>
      <div className={styles.wrapper}>
      <h3 className="text text_type_main-medium">Готовы:</h3>
        <p className="text text_type_digits-large">28 752</p>
      </div>
      <div className={styles.wrapper}>
      <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large ">138</p>
      </div>
    </section>
  )
}
export default FeedInfo;