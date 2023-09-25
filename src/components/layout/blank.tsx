import React from "react";
import { SafeArea } from "antd-mobile";
import styles from "./index.module.less";
import { UserModelContext } from "@/context/userModel";

export const LayoutBlank = (props: { children: React.ReactElement }) => {
  const UserModelCxt = UserModelContext.useProvider();

  return (
    <div className={styles.blank}>
      <SafeArea position="top" />
      <UserModelCxt.Provider>
        <div className="blankBody">{props.children}</div>
      </UserModelCxt.Provider>
      <SafeArea position="bottom" />
    </div>
  );
};
