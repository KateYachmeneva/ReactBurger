import { Routes, Route,useLocation,useNavigate, Router  } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getIngredients } from "../../services/slices/ingredientsSlice";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Profile from "../../pages/Profile/Profile";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Orders from "../../pages/Orders/Orders";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { checkUserAuth } from "../../services/slices/getUserDataSlice";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;


  const closeModal = () => {
    navigate(-1)
  }
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth())
  }, [dispatch]);


  return (
    <div className={`${styles.page} text text_type_main-default`}>
     <AppHeader />
    <Routes  location={background || location}>
    <Route path="/" element={<Main />}/>
    <Route path="/orders" element={<Orders />}/>
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
           <Route path={'/ingredients/:id'} element={<IngredientPage/>}/>
    </Routes>
    {background && (
        <Routes>
          <Route path={'/ingredients/:id'} element={
            <Modal onClose={closeModal}>
              <IngredientDetails/>
            </Modal>
          }/>
        </Routes>
      )}
       </div>
  )
}

export default App;
