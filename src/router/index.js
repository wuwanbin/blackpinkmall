import Vue from "vue";
import VueRouter from "vue-router";

//懒加载
const home = () => import("../views/home/home");
const category = () => import("../views/category/category");
const shutcart = () => import("../views/shutcart/shutcart");
const profile = () => import("../views/profile/profile");
const Detail = () => import("../views/detail/Detail");

//1.安装插件
Vue.use(VueRouter);

//2.创建router
const routes = [{
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: home
  },
  {
    path: "/shutcart",
    component: shutcart
  },
  {
    path: "/category",
    component: category
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
