import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
const initialState = {
  isAuthenticated: false,
  user: {},
};
const fetchUserToken = createAsyncThunk(
  "user/get-user-token",
  async (token) => {
    try {
      const res = await userApi.fetchToken(token);
      if (res && res.EC === 0) {
        return res.DT;
      } else {
        throw new Error(res.EM);
      }
    } catch (error) {
      throw error;
    }
  }
);
const userSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUserToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = {};
      });
  },
});
export { fetchUserToken };
export default userSlice.reducer;
