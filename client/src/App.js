import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";
import { RegistratePage } from "./pages/RegistratePage";
import { LoginPage } from "./pages/LoginPage";
import { AddPost } from "./pages/AddPost";
import { EditPost } from "./pages/EditPost";
import { Layout } from "./components/Layout";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/features/authSlice.js";

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMe())
  },[dispatch])

  return (
    <div className="px-4">
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path=":id" element={<PostPage />} />
          <Route path="registrate" element={<RegistratePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="new" element={<AddPost />} />
          <Route path=":id/edit" element={<EditPost />} />
        </Routes>
        <ToastContainer position="bottom-right"/>
      </Layout>
    </div>
  );
}

export default App;
