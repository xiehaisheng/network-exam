import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { queryCertificate } from "@/service/certificate";

import { LeftOutline } from "antd-mobile-icons";
import { IfControl } from "@/components/control";

export default function () {
  const [dataSource, setData] = useState<any>({
    data: [],
    count: 0,
  }); // 题目

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await queryCertificate();
    console.log(data);

    setData(data);
  };
  return (
    <div className={styles.certificateWrapper}>
      <div className="certificate-head">
        <LeftOutline
          onClick={() => {
            history.go(-1);
          }}
          fontSize={18}
        />
        <div className="title">我的证书</div>
        <div></div>
      </div>
      <IfControl when={dataSource.data.length}>
        <div></div>
      </IfControl>
    </div>
  );
}
