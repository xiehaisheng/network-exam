import React from "react";
import Head from "@/components/Head";
import { Button } from "antd-mobile";
import { ForControl } from "@/components/control";
import { useHistory } from "react-router-dom";
import styles from "./index.module.less";

const data = [
  {
    title: "正式考试",
    img: require("@/assets/img/formal.png"),
    url: "/exam",
  },
  {
    title: "模拟考试",
    img: require("@/assets/img/imitate.png"),
    url: "/exam",
  },
  {
    title: "我的证书",
    img: require("@/assets/img/certificate.png"),
    url: "/certificate",
  },
  {
    title: "个人信息",
    img: require("@/assets/img/personal.png"),
    url: "/personal",
  },
];

export default function () {
  const history = useHistory();
  const startExam = () => {
    history.push("/exam");
  };

  return (
    <>
      <div className={styles.homeWrapper}>
        <Head />
        <div className="center">
          <div className="content-item-wrapper">
            <div className="content-item">
              <ForControl list={data}>
                {(el: any, index) => (
                  <div
                    onClick={() => {
                      history.push(el.url);
                    }}
                    key={index}
                    className="item"
                  >
                    <img src={el.img} />
                    <div>{el.title}</div>
                  </div>
                )}
              </ForControl>
            </div>
            <Button
              block
              shape="rounded"
              color="primary"
              size="large"
              onClick={startExam}
            >
              开始刷题
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
