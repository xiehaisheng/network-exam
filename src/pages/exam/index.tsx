import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Slider } from "antd-mobile";
import { TextOutline, LeftOutline } from "antd-mobile-icons";
import { queryExamQuestions } from "@/service/exam";
import styles from "./index.module.less";

export default function () {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>({});
  const [current, setCurrent] = useState(1);

  const getExamQuestions = async () => {
    const { data } = await queryExamQuestions();
    const _d = data.sj_list.splice(0, 10);
    setData(_d);
    console.log(_d, 7777);
  };
  useEffect(() => {
    getExamQuestions();
  }, []);

  const nextStep = () => {
    if (current === 10) return;
    setCurrent(current + 1);
  };

  const backStep = () => {
    if (current === 1) return;
    setCurrent(current - 1);
  };

  console.log(data);

  return (
    <>
      <div className={styles.examWrapper}>
        <div className="head">
          <div className="title-wrapper">
            <LeftOutline fontSize={18} />
            <div className="title">网络安全模拟考试</div>
            <div className="close-exam">放弃考试</div>
          </div>
          <Slider value={current} max={10} min={1} disabled />
        </div>
        <div className="center">
          <div className="content-item-wrapper"></div>
        </div>
        <div className="exam-bottom">
          <TextOutline fontSize={28} />
          <Button
            color="primary"
            shape="rounded"
            fill="outline"
            onClick={backStep}
          >
            上一题
          </Button>
          <Button
            color="primary"
            shape="rounded"
            fill="solid"
            onClick={nextStep}
          >
            下一题
          </Button>
        </div>
      </div>
      <Modal
        visible={visible}
        content={<></>}
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
