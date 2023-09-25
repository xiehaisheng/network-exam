import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { queryUserInfo } from "@/service/login";

import { LeftOutline } from "antd-mobile-icons";

export default function () {
  const [dataSource, setData] = useState<any>({}); // 题目

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await queryUserInfo();
  };
  return (
    <div className={styles.certificateWrapper}>
      <LeftOutline
        onClick={() => {
          history.go(-1);
        }}
        fontSize={18}
      />
    </div>
  );
}
