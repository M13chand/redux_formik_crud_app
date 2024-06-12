import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer
  }
})