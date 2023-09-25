import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Popup, Slider } from "antd-mobile";
import { TextOutline, LeftOutline } from "antd-mobile-icons";
import {
  queryExamQuestions,
  getExamAnswers,
  queryAnswers,
  getAnswersSheet,
} from "@/service/exam";
import styles from "./index.module.less";
import { ForControl } from "@/components/control";

export default function () {
  const total = 20;
  const [visible, setVisible] = useState(false); // 答题卡
  const [dataSource, setData] = useState<any>({}); // 题目
  const [current, setCurrent] = useState(0); // 题目进度
  const [currentData, setCurrentData] = useState<any>({}); //当前题目
  const [option, setOption] = useState(""); // 选中
  const [answer, setAnswer] = useState([]); // 答案
  const options: any = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  }; // 选项
  useEffect(() => {
    getExamQuestions();
  }, []);

  useEffect(() => {
    if (JSON.stringify(currentData) !== "{}") {
      getAnswers(currentData);
    }
  }, [currentData]);

  // 查询当前题目答案
  const getAnswers = async (currentData: any) => {
    const { data } = await queryAnswers({
      sj_id: dataSource.sj_id,
      tk_id: currentData.tk_id,
    });
    setOption(data?.xy_answers[0]);
  };

  // 获取考题
  const getExamQuestions = async () => {
    const { data } = await queryExamQuestions();
    const _d = data.sj_list.splice(0, total);
    setData({
      sj_id: data.sj_id,
      data: _d,
    });
    setCurrentData(_d[0]);
  };

  const nextStep = () => {
    if (current === total - 1) return;
    setCurrent(current + 1);
    setCurrentData(dataSource.data[current + 1]);
  };

  const backStep = () => {
    if (current === 0) return;
    setCurrent(current - 1);
    setCurrentData(dataSource.data[current - 1]);
  };

  // 选中后提交答案
  const active = async (option: string) => {
    const res = await getExamAnswers({
      sj_id: dataSource.sj_id,
      tk_id: currentData.tk_id,
      xy_answers: option,
    });
    console.log(res, currentData, 888);
    setOption(option);
  };

  const clickAnswerSheet = async () => {
    setVisible(true);
    const { data } = await getAnswersSheet({
      sj_id: dataSource.sj_id,
    });
    const _d = data.splice(0, total);
    setAnswer(_d);
  };

  return (
    <>
      <div className={styles.examWrapper}>
        <div className="head">
          <div className="title-wrapper">
            <LeftOutline
              onClick={() => {
                history.go(-1);
              }}
              fontSize={18}
            />
            <div className="title">网络安全模拟考试</div>
            <div className="close-exam">放弃考试</div>
          </div>
          <Slider value={current} max={total - 1} min={0} disabled />
          <div>
            {current + 1}/{total}
          </div>
        </div>
        <div className="center">
          <div className="option-title">
            {current + 1}、{currentData.tk_name}
          </div>
          <ForControl list={currentData.answers || []}>
            {(el: any, index) => (
              <div
                className={`option-item ${
                  option === options[index] && "option-active"
                }`}
                onClick={() => active(options[index])}
                key={index}
              >
                <div>{options[index]}.</div>
                <div>{el}</div>
              </div>
            )}
          </ForControl>
          <div className="content-item-wrapper"></div>
        </div>
        <div className="exam-bottom">
          <div className="answer-sheet">
            <TextOutline fontSize={24} onClick={clickAnswerSheet} />
            <div>答题卡</div>
          </div>
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
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ minHeight: "60vh" }}
      >
        <div className="answer-wrapper">
          <div className="title">答题卡</div>
          <div className="describe">
            注：显示为灰色的为未完成、遗漏题目；蓝色为已答题{" "}
          </div>
          <div className="answer-content">
            <ForControl list={answer}>
              {(el: any, index) => (
                <div
                  className={`answer-item ${el.is_dt === "1" && "unanswered"}`}
                >
                  {index + 1}
                </div>
              )}
            </ForControl>
          </div>
        </div>
      </Popup>
    </>
  );
}
