import { configureStore } from "@reduxjs/toolkit";
import listBlogReducer from "../components/Blogs/listBlogSlice";

const store = configureStore({
  reducer: {
    listBlog: listBlogReducer,
  },
});

export default store;
