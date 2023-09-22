import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, Space } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { ForControl } from "@/components/control";
import styles from "./index.module.less";

export default function () {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // console.log(await getuserinfor());
  };
  return <div className={styles.personalWrap}></div>;
}
