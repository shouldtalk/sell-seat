import Vue from 'vue'
import VueRouter from 'vue-router'
import centerPouter from '@/router/routers/center'
import cinemaPouter from '@/router/routers/cinema'
import filmPouter from '@/router/routers/film'
import detailRouter from '@/router/routers/detail'
import cityRouter from "@/router/routers/city"
import loadRouter from "@/router/routers/load"
import settingPouter from '@/router/routers/setting'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err=>err)
}
const routes = [
  {
    path: '/',
    redirect: '/film'
  },
  centerPouter,
  cinemaPouter,
  filmPouter,
  detailRouter,
  cityRouter,
  loadRouter,
  settingPouter
]

const router = new VueRouter({
  mode: 'history',
//  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let arr = [
      // 需要登录才能访问的集合，以“/cinema为例”
      "/cinema",
      "/setting"
  ];
  if (!arr.includes(to.path)) {
      next();
  } else {
      if (localStorage.getItem("_token")) {
          next();
      } else {
          next({ path: "/load", query: { refer: to.fullPath } });
      }
  }
});

export default router
