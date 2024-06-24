import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/authSlice.js";
import { toast } from "react-toastify";

export const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth);

  const logoutHandle = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Ви вийшли з системи(застосунку)')
  }
  return (
    <div className="flex justify-between text-gray-300 py-2">
      <span>E</span>
      {isAuth && (
        <div className="flex gap-10">
          <NavLink
            style={({ isActive }) => (isActive ? { color: "aqua" } : undefined)}
            to="/"
          >
            Головна
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "aqua" } : undefined)}
            to="/posts"
          >
            Мої пости
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "aqua" } : undefined)}
            to="/new"
          >
            Додати пост
          </NavLink>
        </div>
      )}
      {isAuth ? <button onClick={logoutHandle}>Вийти</button> : <Link to='/login'>Увійти</Link>}
    </div>
  );
};
