import styles from './resetpassword.module.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import Form from "../../components/form/form";
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";

const links = [
    {
      title: "Вспомнили пароль?",
      linkName: "Войти",
      path: "/login",
    },
  ];

  

function ResetPassword() {
  
    const [passwordValue, setPasswordValue] = useState('')
    const [codeValue, setCodeValue] = useState('')

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }
    const onCodeChange = e => {
        setCodeValue(e.target.value)
    }
  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <AppHeader />
      <main className={styles.content}>
        <Form title="Восстановление пароля" buttonText="Сохранить" links={links}>
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
            extraClass="mb-6"
            placeholder={'Введите новый пароль'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onCodeChange}
            value={codeValue}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
        </Form>
      </main>
    </div>
  )
}



export default ResetPassword
