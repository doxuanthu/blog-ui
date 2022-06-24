import { Avatar, Card, Typography, Popover, Button, Modal } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import className from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./blogs.module.scss";
import { destroyBlog } from "./listBlogSlice";

const { confirm } = Modal;
const cx = className.bind(styles);

function Blog({ data }) {
  const { title, description, author, attachment, slug, createdAt, _id } = data;
  const [visibleAction, setVisibleAction] = useState(true);

  const dispatch = useDispatch();
  const descRef = useRef();

  const [desc, setDesc] = useState(description);

  useEffect(() => {
    setDesc(description);
    descRef.current.innerHTML = desc
      .replaceAll("<strong>", "")
      .replaceAll("</strong>", "");
  }, [description]);

  const handleDeleteBlog = () => {
    setVisibleAction(false);
    confirm({
      title: "Bạn chắc chắn muốn xóa bài viết này",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        dispatch(destroyBlog(_id));
        setVisibleAction(true);
      },

      onCancel() {
        console.log("Cancel");
        setVisibleAction(true);
      },
    });
  };

  const contentAction = (
    <Button type="text" danger onClick={handleDeleteBlog}>
      <DeleteOutlined /> Xóa
    </Button>
  );

  return (
    <Card
      className={cx("card")}
      style={{
        width: "100%",
        border: "2px solid #e8e8e8",
        borderRadius: "16px",
      }}
    >
      <div className={cx("card-header")}>
        <div className={cx("user")}>
          <Avatar style={{ backgroundColor: "#f56a00" }} gap="A">
            {author ? author.charAt(0).toUpperCase() : "A"}
          </Avatar>
          <p className={cx("name")}>{author}</p>
        </div>
        <div className={cx("actions")}>
          {visibleAction && (
            <Popover
              placement="leftTop"
              content={contentAction}
              trigger="click"
            >
              <EllipsisOutlined className={cx("more-icon")} />
            </Popover>
          )}
        </div>
      </div>
      <div className={cx("card-body")}>
        <div className={cx("content")}>
          <Link to={`/blog/${slug}`}>
            <h2 className={cx("title")}>{title}</h2>
          </Link>
          <p ref={descRef} className={cx("desc")} id="description"></p>
        </div>
        {attachment && (
          <img src={attachment} alt="image" className={cx("image")} />
        )}
      </div>
      <Typography.Paragraph>
        {moment(createdAt).format("l")}
      </Typography.Paragraph>
    </Card>
  );
}

export default Blog;
