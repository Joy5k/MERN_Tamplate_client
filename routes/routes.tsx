import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFound from "../pages/NotFound";
import React from "react";


const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
    {/* No need to add children like previous system . there is the children , if you need more element then write in the Mainlayout Route */}
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        {/* using the protected routes below */}
        <Route path="home" element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>}></Route>
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default router;

