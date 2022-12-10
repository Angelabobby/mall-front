import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// 配置路由
export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/search",
      component: Search,
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        showFooter: false,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        showFooter: false,
      },
    },
    // 重定向
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
