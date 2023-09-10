import { useState } from "react";
import styles from './login.module.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from "../../components/form/form";

const links = [
    {
      title: "Вы — новый пользователь?",
      linkName: "Зарегистрироваться",
      path: "/register",
    },
    {
      title: "Забыли пароль?",
      linkName: "Восстановить пароль",
      path: "/forgot-password",
    }
  ];
  
function Login() {
    const [emailValue, setEmailInputValue] = useState('');
    const [passwordValue, setPasswordInputValue] = useState('')

    const onEmailChange = e =>{
        setEmailInputValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordInputValue(e.target.value)
    }
    return (
        <div className={`${styles.page} text text_type_main-default`}>
          <AppHeader />
          <main className={styles.content}>
            <Form title="Вход" buttonText="Войти" links={links}>
              <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
              />
              <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
                extraClass="mb-6"
              />
            </Form>
          </main>
        </div>
      );
    }
    



export default Login
