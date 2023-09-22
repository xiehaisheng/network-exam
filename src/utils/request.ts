import axios from "axios";
import { getToken } from "./config";

// 请求拦截器
axios.interceptors.request.use((config: any) => {
  //请求头参数
  config.headers = {
    token: getToken("token"),
    "Content-Type": 'multipart/form-data',
  }
  return config;
});
// 响应拦截器
axios.interceptors.response.use((response) => {
  return response.data;
});

export default axios;
