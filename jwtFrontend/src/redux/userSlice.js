import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
