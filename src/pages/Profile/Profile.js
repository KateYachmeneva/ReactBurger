import styles from "./profile.module.css";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { updateUserInfo } from "../../services/slices/updateUserDataSlice";
import { useState } from "react";
import { objectsComparison } from "../../utils/utils";

function Profile(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userData);
  console.log(user);
  const { values, handleChange, setValues } = useForm({
    email: user.email ?? "",
    name: user.name ?? "",
    password: "",
  });

  const [lockedFields, setLockedFields] = useState([
    "name",
    "email",
    "password",
  ]);
  const resetForm = () => {
    setValues({
      email: user.email,
      name: user.name,
      password: "",
    });
    setLockedFields(["name", "email", "password"]);
  };

  const toggleField = (name) => {
    setLockedFields(
      lockedFields.includes(name)
        ? lockedFields.filter((fieldName) => fieldName !== name)
        : [...lockedFields, name],
    );
  };

  const handleFormSubmit = () => {
    dispatch(updateUserInfo(values));
    setLockedFields(["name", "email", "password"]);
    console.log(user);
    setValues({
      ...values,
      password: "",
    });
  };
  // user.password = ""
  const isUserDataChange = objectsComparison(user, values);
  return (
    <main className={`${styles.content} mt-30`}>
      <div>
        <ProfileMenu />
        <p className="text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
          color={"text_color_inactive"}
          extraClass={`${styles.input} mb-6`}
          disabled={lockedFields.includes("name")}
          onIconClick={() => toggleField("name")}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder={"Логин"}
          extraClass="mb-6"
          isIcon={true}
          disabled={lockedFields.includes("email")}
          onIconClick={() => toggleField("email")}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
        {!isUserDataChange && (
          <div className={styles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={handleFormSubmit}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}

Profile.propTypes = {};

export default Profile;
