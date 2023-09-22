import React, { useState } from "react";
import { TabBar, SafeArea } from "antd-mobile";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./index.module.less";

export const LayoutCommon = (props: { children: React.ReactElement }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <div className={styles.common}>
      <SafeArea position="top" />
      <div className="body">{props.children}</div>
      <SafeArea position="bottom" />
    </div>
  );
};
