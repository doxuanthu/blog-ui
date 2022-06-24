import axios from "axios";

const URL = "http://localhost:5000";

export const fetchBlogs = () => axios.get(`${URL}/blogs`);
export const createNewPost = (payload) => axios.post(`${URL}/blogs`, payload);
export const updateBlog = (payload) =>
  axios.post(`${URL}/blogs/update`, payload);
export const destroyBlog = (_id) => axios.delete(`${URL}/blogs/${_id}`);
