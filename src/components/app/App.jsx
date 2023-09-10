import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getIngredients } from "../../services/slices/ingredientsSlice";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Main />}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/profile" element={<ResetPassword/>}/>
    <Route path="/ingredients/:id" element={<Main />}/>
    </Routes>
       </BrowserRouter>
  )
}

export default App;
