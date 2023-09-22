import React, { useState, FC } from "react";
import { Mask, SpinLoading } from "antd-mobile";
import styles from "./index.module.less";

// 自定义内容
const Loading = (props: { loading: boolean }) => {
  const { loading } = props;
  const [visible] = useState(loading);
  return (
    <>
      <Mask visible={visible}>
        <div className={styles.overlayContent}>
          <SpinLoading color="white" style={{ "--size": "48px" }} />
          <div className="content">加载中...</div>
        </div>
      </Mask>
    </>
  );
};

export default Loading;
