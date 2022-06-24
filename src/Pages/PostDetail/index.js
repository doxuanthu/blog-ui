import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import { Col, Row, Typography, Tooltip, Avatar } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import moment from "moment";

import Styles from "./postDetail.module.scss";
import Header from "../../components/Header";
import { updatedPost } from "../../components/Blogs/listBlogSlice";

const cx = className.bind(Styles);
function PostDetail() {
  const dispatch = useDispatch();
  const contentRef = useRef();
  let params = useParams();

  const [likeCount, setLikeCount] = useState(0);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${params.slug}`)
      .then((res) => res.json())
      .then((post) => {
        setCurrentPost(post);
        setLikeCount(post.likeCount);
        contentRef.current.innerHTML = post.content;
      });
  }, []);

  const handleLikePost = () => {
    dispatch(
      updatedPost({
        _id: currentPost._id,
        likeCount: likeCount + 1,
      })
    );
    setLikeCount(likeCount + 1);
  };
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Row className={cx("main-content")}>
        <Col md={6} className={cx("side-bar")}>
          <Typography.Title className={cx("side-bar__auth")} level={5}>
            {currentPost.author}
          </Typography.Title>
          <div className={cx("side-bar__favicon")}>
            <Tooltip placement="bottomLeft" title={"Nhấn để thích bài này"}>
              <HeartOutlined onClick={handleLikePost} />
            </Tooltip>
            <span className={cx("like-count")}>{likeCount}</span>
          </div>
        </Col>
        <Col md={18}>
          <Typography.Title level={1}>{currentPost.title}</Typography.Title>
          <div className={cx("user")}>
            <Avatar style={{ backgroundColor: "#f56a00" }} gap="A">
              {currentPost.author
                ? currentPost.author.charAt(0).toUpperCase()
                : "A"}
            </Avatar>

            <div className={cx("user-info")}>
              <Typography.Title className={cx("user-name")} level={5}>
                {currentPost.author}
              </Typography.Title>
              <Typography.Paragraph className={cx("createdAt")}>
                {moment(currentPost.createdAt).format("l")}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={cx("detail-content")} ref={contentRef}></div>
        </Col>
      </Row>
    </div>
  );
}

export default PostDetail;
