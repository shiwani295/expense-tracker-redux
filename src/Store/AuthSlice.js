import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: {
    isAuthenticated: initialToken ? true : false,
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
//action
export const authAction = AuthSlice.actions;
export default AuthSlice.reducer;
