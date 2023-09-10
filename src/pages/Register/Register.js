import { useState } from "react";
import styles from './register.module.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from "../../components/form/form";

const links = [
    {
      title: "Уже зарегистрированы?",
      linkName: "Войти",
      path: "/login",
    },
  ];

function Register() {
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('')

    const onEmailChange = e => {
        setEmailValue(e.target.value)
      }
    
      const onPasswordChange = e => {
        setPasswordValue(e.target.value)
      }
    
      const onNameChange = e => {
        setNameValue(e.target.value)
      }
    return (
    <div className={`${styles.page} text text_type_main-default`}>
      <AppHeader />
      <main className={styles.content}>
        <Form title="Регистрация" buttonText="Зарегистрироваться" links={links}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onNameChange}
            value={nameValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
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


export default Register
