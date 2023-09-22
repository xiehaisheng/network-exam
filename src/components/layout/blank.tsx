import React from "react";
import { SafeArea } from "antd-mobile";
import styles from "./index.module.less";

// export const LayoutBlank = (props: { children: React.ReactElement }) => {
//   return props.children;
// };

export const LayoutBlank = (props: { children: React.ReactElement }) => {
  return (
    <div className={styles.blank}>
      <SafeArea position="top" />
      <div className="blankBody">{props.children}</div>
      <SafeArea position="bottom" />
    </div>
  );
};
