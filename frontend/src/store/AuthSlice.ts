import { createSlice } from "@reduxjs/toolkit";
import type { AuthInitialState } from "../types/AuthInterface";
import { fetch, login, logout, register } from "../feature/AuthThunk";

const authInitialState: AuthInitialState = {
  user: null,
  status: "idle",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch user
    builder
      .addCase(fetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetch.rejected, (state) => {
        state.status = "rejected";
        state.user = null;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "pending";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.status = "rejected";
        state.user = null;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "pending";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "rejected";
        state.user = null;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "pending";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default AuthSlice.reducer;
