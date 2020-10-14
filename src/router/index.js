import Vue from 'vue'
import VueRouter from 'vue-router'
import centerPouter from '@/router/routers/center'
import cinemaPouter from '@/router/routers/cinema'
import filmPouter from '@/router/routers/film'
import detailRouter from '@/router/routers/detail'
import cityRouter from "@/router/routers/city"
import loadRouter from "@/router/routers/load"

Vue.use(VueRouter)

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
  loadRouter
]

const router = new VueRouter({
  mode: 'history',
//  base: process.env.BASE_URL,
  routes
})

export default router
