import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 路由
import router from "./router";

// 全局组件
import TypeNav from "./components/TypeNav";
Vue.component("TypeNav", TypeNav);

// vuex
import store from "./store";

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
