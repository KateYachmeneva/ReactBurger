import styles from "./forgot-password.module.css";
import Form from "../../components/form/form";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/slices/userSlice";

const links = [
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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("f");
    dispatch(forgotPassword(values));
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
