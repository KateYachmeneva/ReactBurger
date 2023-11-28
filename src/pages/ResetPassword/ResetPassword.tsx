import styles from "./resetpassword.module.css";
import Form from "../../components/Form/Form";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TFormData, TLink } from "../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "../../services/hooks";
import { useEffect } from "react";
import { resetPassword } from "../../services/slices/userSlice";
import React from "react";

const links: Array<TLink> = [
  {
    title: "Вспомнили пароль?",
    linkName: "Войти",
    path: "/login",
  },
];

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { values, handleChange } = useForm<TFormData>({
    token: "",
    password: "",
  });

  const handleResetPassword = () => {
    dispatch(resetPassword(values) as any);
    navigate("/login");
  };
  useEffect(() => {
    if (!location.state) {
      navigate("/forgot-password", { replace: true });
    }
  }, []);
  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <main className={styles.content}>
        <Form
          title="Восстановление пароля"
          buttonText="Сохранить"
          links={links}
          onFormSubmit={handleResetPassword}
        >
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-6"
            placeholder={"Введите новый пароль"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
        </Form>
      </main>
    </div>
  );
}

export default ResetPassword;
