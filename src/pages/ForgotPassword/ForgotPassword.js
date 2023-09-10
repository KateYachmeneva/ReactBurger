import styles from './forgot-password.module.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import Form from "../../components/form/form";
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";

const links = [
    {
      title: "Вспомнили пароль?",
      linkName: "Войти",
      path: "/login",
    },
  ];

function ForgotPassword() {
  const [emailValue,setEmailValue] = useState('');

  const onEmailChange = e =>{
    setEmailValue(e.target.value)
  }
  return (
    <div className={`${styles.page} text text_type_main-default`}>
    <AppHeader />
    <main className={styles.content}>
      <Form title="Восстановление пароля" buttonText="Восстановить" links={links}>
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
      </Form>
    </main>
  </div>
  )
}


export default ForgotPassword
