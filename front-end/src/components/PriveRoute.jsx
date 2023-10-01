import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PriveRoute = () => {
  const { userInfo } = useSelector((store) => store.auth);
  return userInfo ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
};

export default PriveRoute;
