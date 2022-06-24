import { Button, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import className from "classnames/bind";

import styles from "./header.module.scss";
import { AddIcon } from "../Icons";
import Post from "./Post";
import { debounce } from "../hooks";

const cx = className.bind(styles);
function Header({ disabled }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [show, setShow] = useState(true);

  const debounceValue = debounce(search, 500);

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    axios
      .get(
        `http://localhost:5000/blogs/search?q=${encodeURIComponent(
          debounceValue
        )}`
      )
      .then((res) => {
        setSearchResult(res.data);
      });
  }, [debounceValue]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleHideResult = () => {
    setShow(false);
  };
  return (
    <header className={cx("wrapper")}>
      <Link to="/">
        <Button
          disabled={disabled}
          className={cx("btn")}
          icon={<LeftOutlined />}
        >
          Quay lai
        </Button>
      </Link>
      <Tippy
        visible={show && searchResult.length > 0}
        interactive
        render={(attrs) => (
          <div className={cx("popper-wrapper")} tabIndex="-1" {...attrs}>
            <div className={cx("popper-heading")}>
              <SearchOutlined style={{ marginRight: 8 }} />
              {`Kết quả cho '${search}'`}
            </div>
            <h5 className={cx("popper-title")}>BÀI VIẾT</h5>
            {searchResult &&
              searchResult.map((post) => <Post key={post._id} data={post} />)}
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div>
          <Input
            className={cx("input-search")}
            prefix={<SearchOutlined />}
            placeholder="Tim kiem bai viet..."
            allowClear={true}
            value={search}
            onChange={handleSearch}
            spellCheck={false}
            onFocus={() => setShow(true)}
          />
        </div>
      </Tippy>
      <Link to="/new-post" className={cx("add-btn")}>
        <AddIcon className={cx("add-icon")} />
      </Link>
    </header>
  );
}

export default Header;
