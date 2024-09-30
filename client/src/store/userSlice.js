import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Hanvs-Redux-555",
  user:'vongsay'
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = "Login";
      state.user = "HanVongsay-login"
    },
    logout: (state) => {
      state.value = "Logout";
      state.user = "HanVongsay-logout"
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
