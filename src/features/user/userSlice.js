import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";

const initialState = {
  user_data: {},
  status: "idle",
  error: "",
  application_proparties: {
    theme_color: "#050505",
  },
};

export const loginUser = createAsyncThunk("user/loginUser", async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/user/login`, payload.user);
  sessionStorage.setItem("user_data", JSON.stringify(response?.data));
  return response?.data;
});

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response.status} : ${response.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setThemeColor: (state, action) => {
      state.application_proparties.theme_color = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user_data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (!action?.payload.id) {
          console.log("could not delete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        const OldPosts = state.posts.filter((post) => post.id !== id);
        state.posts = OldPosts;
      });
  },
});
export const getUserData = (state) => state.user.user_data;
export const getUserError = (state) => state.user.error;
export const getUserStatus = (state) => state.user.status;
export const { setThemeColor } = userSlice.actions;
export default userSlice.reducer;
