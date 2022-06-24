import { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Editor from "./ckEditor";
import styles from "./newPost.module.scss";
import { createNewPost } from "../../components/Blogs/listBlogSlice";

const cx = className.bind(styles);
function NewPost() {
  const dispatch = useDispatch();

  const [contentPost, setContentPost] = useState("");
  const [auth, setAuth] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const formRef = useRef();

  const handleCreatePost = () => {
    dispatch(
      createNewPost({
        title: title,
        content: contentPost,
        description: desc || contentPost,
        author: auth,
      })
    );
    setAuth("");
    setDesc("");
    setTitle("");
  };
  return (
    <div className={cx("new-post")}>
      <div className={cx("header")}>
        <Link to="/">
          <Button className={cx("back-btn")} icon={<LeftOutlined />}>
            Quay lai
          </Button>
        </Link>
        <Link to="/">
          <Button
            disabled={!!!contentPost || !!!auth || !!!title}
            type="primary"
            onClick={handleCreatePost}
            htmlType="submit"
          >
            Xuất bản
          </Button>
        </Link>
      </div>

      <Form className={cx("post-info")} ref={formRef} name="control-ref">
        <Form.Item
          name="author"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tác giả !",
            },
          ]}
        >
          <Input
            value={auth}
            style={{ borderColor: "transparent" }}
            placeholder="Tác giả"
            onChange={(e) => setAuth(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={desc}
            style={{ borderColor: "transparent" }}
            placeholder="Mô tả"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề bài viết !",
            },
          ]}
        >
          <Input
            value={title}
            style={{ borderColor: "transparent", fontSize: 28 }}
            placeholder="Tiêu đề"
            size="large"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
      </Form>

      <div className={cx("editor")}>
        <Editor
          onChange={(contentPost) => {
            setContentPost(contentPost);
          }}
        />
      </div>
    </div>
  );
}

export default NewPost;
