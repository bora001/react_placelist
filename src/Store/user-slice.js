import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userUid: null,
  // isLogin: false, status: null
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userUid = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
