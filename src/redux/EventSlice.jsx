import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "event",
  initialState: {
    addEvent: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.addEvent = action.payload;
      console.log("User Data:", state.addEvent);
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;