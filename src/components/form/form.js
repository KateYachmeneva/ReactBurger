import styles from './form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

function form({children, title, buttonText, links}) {
    
  return (
     <form className={styles.form}>
           <h1 className="text text_type_main-medium mb-6" >{title}</h1>
           {children}
           <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
           {buttonText}
          </Button>
      {links.map((link, index) => 
          <p className="text text_color_inactive mb-4" key={index}>
          {link.title}
          <Link to={link.path} className={`${styles.link} ml-2`}>{link.linkName}</Link> 
          </p>
        )}
     </form>
  )
}


export default form
