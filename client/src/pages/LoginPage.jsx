import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="flex flex-col gap-5 items-center  mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-white text-2xl">Авторизація</h1>
      <label className="text-green-400 ">
        Ім'я:
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-700 ml-10 pl-2 text-white"
          placeholder="your usermane"
        />
      </label>
      <label className="text-green-400 ">
        Пароль:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 ml-3 pl-2 text-white"
          placeholder="your password"
        />
      </label>
      <div className=" text-white">
        <button className="bg-green-800 rounded-sm mr-2 px-3 py-1 hover:bg-green-500">
          Підтвердити
        </button>
        <Link to='/registrate'>Не зареєстровані?</Link>
      </div>
    </form>
  );
};
