import React from "react";
import { SafeArea } from "antd-mobile";
import { UserModelContext } from "@/context/userModel";
import styles from "./index.module.less";

export const LayoutCommon = (props: { children: React.ReactElement }) => {
  const UserModelCxt = UserModelContext.useProvider();

  return (
    <div className={styles.common}>
      <SafeArea position="top" />
      <UserModelCxt.Provider>
        <div className="body">{props.children}</div>
      </UserModelCxt.Provider>
      <SafeArea position="bottom" />
    </div>
  );
};
