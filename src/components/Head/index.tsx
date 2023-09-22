import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { noLoginCount, userInfo } from "@/service/login";
import { getToken } from "@/utils/config";

export default function (props: any) {
  const [count, setCount] = useState(0);
  const [infoData, setInfoData] = useState<any>({});

  const getNoLoginCount = async () => {
    const { data } = await noLoginCount();
    setCount(data.xy_count || 0);
  };

  const getUserInfo = async () => {
    const { data, code }: any = await userInfo();
    if (code === 1) {
      setInfoData(data);
    } else {
      getNoLoginCount();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [getToken("token")]);

  return (
    <div className={styles.HeadWrapper}>
      <img className="bg_log" src={require("@/assets/img/bg_log.png")}></img>
      <div className="title">网络安全模拟考试</div>
      <div className="info">
        <img src={require("@/assets/img/head-icon.png")} alt="" />
        <div className="content">
          <b>{infoData.sfz_no || "未登录"}</b>
          {infoData.sj_count ? (
            <div>hi,您已累计刷了{infoData.sj_count}套题</div>
          ) : (
            <div>hi,目前有{count}人正在刷题</div>
          )}
        </div>
      </div>
    </div>
  );
}
