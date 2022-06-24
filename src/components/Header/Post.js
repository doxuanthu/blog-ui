import { Avatar } from "antd";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import Styles from "./header.module.scss";

const cx = className.bind(Styles);
function Post({ data }) {
  const { author, title, slug } = data;
  return (
    <Link to={`/blog/${slug}`} className={cx("post-wrapper")}>
      <div>
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            width: 32,
            height: 32,
            display: "inline-block",
          }}
        >
          {author ? author.charAt(0).toUpperCase() : "A"}
        </Avatar>
      </div>
      <span className={cx("post-title")}>{title}</span>
    </Link>
  );
}

export default Post;
