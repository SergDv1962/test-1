import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registrateUser } from "../redux/features/authSlice.js";
import { toast } from "react-toastify";

export const RegistratePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(status) toast(status)
  },[status])

  const handleSubmit = () => {
    dispatch(registrateUser({username, password}))
    setUsername('')
    setPassword('')
  }

  return (
    <form
      className="flex flex-col gap-5 items-center  mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-white text-2xl">Регістрація</h1>
      <label className="text-blue-400 ">
        Ім'я:
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-700 ml-10 pl-2 text-white"
          placeholder="your usermane"
        />
      </label>
      <label className="text-blue-400 ">
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
        <button onClick={handleSubmit} className="bg-blue-800 rounded-sm mr-2 px-3 py-1 hover:bg-blue-500">
          Підтвердити
        </button>
        <Link to='/login'>Вже зареєстровані?</Link>
      </div>
    </form>
  );
};
