import { Card, Col, Row, Typography } from "antd";
import className from "classnames/bind";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import styles from "./blogs.module.scss";
import { listBlogSelector } from "../../redux/selector";
import { fetchBlogs } from "./listBlogSlice";

const cx = className.bind(styles);
function Blogs() {
  const listBlog = useSelector(listBlogSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  return (
    <Row className={cx("blogs")}>
      <Col span={24}>
        <Typography.Title className={cx("heading")}>
          Bài viết nổi bật
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Paragraph>
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
          và các kỹ thuật lập trình web.
        </Typography.Paragraph>
      </Col>
      {listBlog.length > 0 &&
        listBlog.map((blog) => <Blog key={blog._id} data={blog} />)}
    </Row>
  );
}

export default Blogs;
