import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("/api/user");
  const data = await res.data;
  return data;
});
const users = createSlice({
  name: "users",
  initialState: {} as any,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export default users.reducer;
