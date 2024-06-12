import { createSlice } from "@reduxjs/toolkit";
// import { getUserFromLocal, setUserToLocal } from "./localStorage";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      // setUserToLocal(state.users);
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      // setUserToLocal(state.users);
    },
  },
});
export const { addUser, deleteUser, updateUser } = userSlice.actions;
