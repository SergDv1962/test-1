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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
   .addCase(registrateUser.pending, (state, action) => {
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
  }
});

export default authSlice.reducer;
