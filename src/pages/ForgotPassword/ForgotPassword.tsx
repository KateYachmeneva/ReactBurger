import styles from "./forgot-password.module.css";
import Form from "../../components/Form/Form";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "../../services/hooks";
import { forgotPassword } from "../../services/slices/userSlice";
import { TLink } from "../../utils/types";
import React from "react";

const links: Array<TLink> = [
  {
    title: "Вспомнили пароль?",
    linkName: "Войти",
    path: "/login",
  },
];

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
  });

  const handleForgotPassword = () => {
    dispatch(forgotPassword(values.email) as any);
    navigate("/reset-password", {
      replace: true,
      state: { from: "forgot-password" },
    });
  };
  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <main className={styles.content}>
        <Form
          title="Восстановление пароля"
          buttonText="Восстановить"
          links={links}
          onFormSubmit={handleForgotPassword}
        >
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
        </Form>
      </main>
    </div>
  );
}

export default ForgotPassword;
