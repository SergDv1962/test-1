import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const isAuth = false;
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
      {isAuth ? <button>Вийти</button> : <Link to='/login'>Увійти</Link>}
    </div>
  );
};
