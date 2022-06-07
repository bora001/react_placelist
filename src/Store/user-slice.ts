import { createSlice } from "@reduxjs/toolkit";

export type placeListType = {
  geo: string;
  id: string;
  comments: number;
  location: string;
  name: string;
  rate: number;
  user: string;
  img: string;
};

export type placeType = {
  userUid: string | null;
  placeList: placeListType[];
};

const initialState = {
  userUid: null,
  placelist: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userUid = action.payload;
    },
    setList: (state, action) => {
      state.placelist = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
