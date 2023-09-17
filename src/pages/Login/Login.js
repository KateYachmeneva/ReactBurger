import { useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/form/form";
import { useDispatch } from "react-redux";
import { logIn } from "../../services/slices/loginSlice";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      }),
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
