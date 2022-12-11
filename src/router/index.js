import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

// 重写$router的push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    originalPush.call(this, location, onComplete, onAbort);
  } else {
    originalPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

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
      path: "/search/:searchText?", // 加?，表示参数可选（可传可不传）
      component: Search,
      name: "Search",
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    // 重定向
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
