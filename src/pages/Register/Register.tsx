import styles from "./register.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { registerUser } from "../../services/slices/registerSlice";
import { FormEvent } from "react";
import { useDispatch } from "../../services/hooks";
import React from "react";
const links = [
  {
    title: "Уже зарегистрированы?",
    linkName: "Войти",
    path: "/login",
  },
];

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSignUpValidity = () => {
    return !!values.name && !!values.email && !!values.password;
  };
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkSignUpValidity()) {
      dispatch(registerUser(values) as any);
      navigate("/login");
    } else {
      alert("Нужно заполнить все данные");
    }
  };
  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <main className={styles.content}>
        <Form
          title="Регистрация"
          buttonText="Зарегистрироваться"
          links={links}
          onFormSubmit={handleRegister}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
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

export default Register;
