import React, { FormEvent } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/Form/Form";
import { useDispatch } from "../../services/store";
import { logIn } from "../../services/slices/loginSlice";
import { useForm } from "../../hooks/useForm";

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
  },
];

function Login() {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      }) as any,
    );
  };
  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <main className={styles.content}>
        <Form
          title="Вход"
          buttonText="Войти"
          links={links}
          onFormSubmit={handleSubmit}
        >
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-6"
          />
        </Form>
      </main>
    </div>
  );
}

export default Login;
