import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { config } from "@/utils/config";

import "antd-mobile/es/global";

import "./global.less";

import { Router } from "./router";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter basename={config.basePath}>
        <Router></Router>
      </BrowserRouter>
    </ConfigProvider>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
