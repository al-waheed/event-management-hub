import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "event",
  initialState: {
    addEvent: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.addEvent = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;