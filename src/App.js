import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./Pages/PostDetail";

import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
