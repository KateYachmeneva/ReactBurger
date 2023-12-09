import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "../../services/store";
import { getIngredients } from "../../services/slices/ingredientsSlice";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Profile from "../../pages/Profile/Profile";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { checkUserAuth } from "../../services/slices/getUserDataSlice";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderInfo from "../OrderInfo/OrderInfo";
import OrderHistory from "../OrderHistory/OrderHistory";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import Feed from "../../pages/Feed/Feed";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={`${styles.page} text text_type_main-default`}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-history/:number"
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/ingredients/:ingredientId"}
          element={<IngredientPage />}
        />
        <Route path={"/feed/:number"} element={<OrderInfo />} />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path={"/feed"} element={<Feed />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={"/ingredients/:ingredientId"}
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={"/feed/:number"}
            element={
              <Modal onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={"/order-history/:number"}
            element={
              <Modal onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
