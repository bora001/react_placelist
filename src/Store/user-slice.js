import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userUid: null,
  placelist: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userUid = action.payload;
    },
    setList(state, action) {
      state.placelist = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
