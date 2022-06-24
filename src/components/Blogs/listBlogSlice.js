import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/config";

const initialState = {
  loading: "idle",
  listBlog: [],
};

export const listBlogSlice = createSlice({
  name: "listBlog",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.listBlog = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = "failed";
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        state.listBlog.push(action.payload);
      })

      .addCase(updatedPost.fulfilled, (state, action) => {
        state.listBlog.map((post) =>
          post._id === action.payload._id
            ? (post.likeCount = action.payload.likeCount)
            : post
        );
      })

      .addCase(destroyBlog.fulfilled, (state, action) => {
        state.listBlog.splice(state.listBlog.indexOf(action.meta.arg), 1);
      });
  },
});

// create the thunk
export const fetchBlogs = createAsyncThunk("listBlog/fetchBlogs", async () => {
  const response = await api.fetchBlogs();
  return response.data;
});

export const createNewPost = createAsyncThunk(
  "listBlog/createNewPost",
  async (newPost) => {
    const response = await api.createNewPost(newPost);
    return response.data;
  }
);

export const updatedPost = createAsyncThunk(
  "listBlog/updatedPost",
  async (_id, likeCount) => {
    const response = await api.updateBlog(_id, likeCount);
    return response.data;
  }
);

export const destroyBlog = createAsyncThunk(
  "listBlog/destroyBlog",
  async (_id) => {
    const response = await api.destroyBlog(_id);
    console.log(response.data);
    return response.data;
  }
);

export default listBlogSlice.reducer;
