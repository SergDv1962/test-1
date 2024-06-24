import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

const initialState = {
  user: null,
  isLoading: false,
  status: null,
  token: null,
};

export const registrateUser = createAsyncThunk(
  "auth/registrateUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("auth/registrate", {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("auth/login", {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async () => {
    try {
      const { data } = await axios.get("auth/me");

      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.status = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
   builder
   .addCase(registrateUser.pending, (state) => {
      state.isLoading = true;
      state.status = null
   })
   .addCase(registrateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token
   })
   .addCase(registrateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message
   })
   .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null
   })
   .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token
   })
   .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message
   })
   .addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null
   })
   .addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token
   })
   .addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message
   })
  }
});

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer;
