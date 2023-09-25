import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { queryUserInfo } from "@/service/login";
import { LeftOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { removeToken } from "@/utils/config";
import { useHistory } from "react-router-dom";

export default function () {
  const history = useHistory();
  const [dataSource, setData] = useState<any>({}); // 题目

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await queryUserInfo();
    setData(data);
  };

  const exitLogin = () => {
    removeToken("token");
    history.push("/login");
  };
  return (
    <div className={styles.personalWrap}>
      <div className="personal-head">
        <LeftOutline
          onClick={() => {
            history.go(-1);
          }}
          fontSize={18}
        />
        <div className="title">个人信息</div>
        <div></div>
      </div>
      <div className="content">
        <div className="content-item">
          <div>账号</div>
          <div>{dataSource.sfz_no}</div>
        </div>
        <div className="content-item">
          <div>模拟考试次数</div>
          <div>{dataSource.sj_count}</div>
        </div>
        <div className="content-item">
          <div>证书数量</div>
          <div>{dataSource.zs_count}</div>
        </div>
        <div className="content-btn">
          <Button color="danger" fill="none" onClick={exitLogin}>
            退出登入
          </Button>
        </div>
      </div>
    </div>
  );
}
