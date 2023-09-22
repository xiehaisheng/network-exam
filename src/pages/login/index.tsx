import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import Head from "@/components/Head";
import { Button, Form, Input, Modal } from "antd-mobile";
import { login, userInfo } from "@/service/login";
import { setToken } from "@/utils/config";
import { useHistory } from "react-router-dom";

export default function () {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  // 登入
  const onFinish = async (values: any) => {
    const { data, code }: any = await login(values);
    if (code === 1) {
      setToken("token", data.xy.token);
      setVisible(false);
    }
  };

  const isLogin = async () => {
    const { code }: any = await userInfo();
    if (code == -100) {
      setVisible(true);
      return;
    } else {
      history.push("/home");
    }
  };

  return (
    <>
      <div className={styles.loginWrapper}>
        <Head />
        <div className="center">
          <div className="content-item-wrapper">
            <div className="content-item" onClick={isLogin}>
              正式考试
            </div>
            <div className="content-item imitate" onClick={isLogin}>
              模拟考试
            </div>
          </div>
          <span>技术支持：合肥寻云网络科技有限公司</span>
        </div>
      </div>
      <Modal
        visible={visible}
        content={
          <Form
            onFinish={onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                提交
              </Button>
            }
          >
            <Form.Item
              name="zh"
              rules={[{ required: true, message: "身份号不能为空" }]}
            >
              <Input placeholder="请输入身份号" />
            </Form.Item>
            <Form.Item
              name="mm"
              rules={[{ required: true, message: "随机生成密码" }]}
            >
              <Input placeholder="请输入随机生成密码" />
            </Form.Item>
          </Form>
        }
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
