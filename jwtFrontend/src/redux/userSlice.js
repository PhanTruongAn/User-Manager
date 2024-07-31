import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
};
const fetchUserToken = createAsyncThunk("user/get-user-token", async () => {
  try {
    const res = await userApi.fetchToken();
    if (res && res.EC === 0) {
      return res.DT;
    } else {
      toast.error(res.EM, { autoClose: 1000 });
      throw new Error(res.EM);
    }
  } catch (error) {
    throw error;
  }
});
const userSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = {};
      });
  },
});
export { fetchUserToken };
export default userSlice.reducer;
