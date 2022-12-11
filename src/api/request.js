// axios的二次封装

import axios from "axios";
// 引入nprogress 加入进度条功能 start()进度条开始，done()进度条结束
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 添加请求拦截器
requests.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么

    nProgress.start(); // 进度条开始
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    nProgress.done(); // 进度条结束
    return res;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default requests;
