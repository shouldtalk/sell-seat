<template>
<div  class="scroll" :style="{ height: height + 'px' }">
  <div class="detail">
    <div class="goBack" @click="goBack">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
        alt=""
      />
    </div>
    <div class="img">
      <img v-lazy="item.poster" />
    </div>
    <div>
      <div>{{ item.name }}</div>
      <div>{{ item.category }}</div>
      <div>{{ item.premiereAt | parseDate }}上映</div>
      <div>{{ item.nation }} | {{ item.runtime }} 分钟</div>
      <div>
        {{ item.synopsis }}
      </div>
    </div>
    <Swiper :key="'actors_' + item.actors.length">
      <div
        v-for="(item, index) in item.actors"
        :key="index"
        class="swiper-slide"
      >
        <div>
          <img v-lazy="item.avatarAddress" alt="" />
        </div>
      </div>
    </Swiper>
    <Swiper :key="'photos_' + item.photos.length">
      <div
        v-for="(item, index) in item.photos"
        :key="index"
        class="swiper-slide"
      >
        <div>
          <img v-lazy="item" alt="" />
        </div>
      </div>
    </Swiper>
  </div>
</div>
</template>
<script>
import { detailData } from "@/api/api.js";
import Swiper from "@/components/Swiper";
import BScroll from "better-scroll";
const moment = require("moment");
export default {
  data() {
    return {
      item: { actors: [], photos: [] },
      height: 0,
    };
  },
  async mounted() {
    let ret = await detailData(this.$route.params.filmId);
    this.item = ret.data.data.film;
     this.height = document.documentElement.clientHeight;
  },
  updated() {
    this.bs = new BScroll(".scroll", {
      // 激活上滑的监听事件
      pullUpLoad: true,
      // 激活下滑的监听事件
      // pullDownRefresh: true,
      // 默认情况下使用bs后，它会禁止浏览器的点击事件
      click: true,
    });
  },
  filters: {
    parseDate: function (value) {
      let time = moment(value * 1000).format("YYYY-MM-DD");
      return time;
    },
  },
  methods: {
      goBack: function(){
          this.$router.go(-1)
      }
  },
  components: {
    Swiper,
  },
  created() {
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
};
</script>
<style lang="scss" scoped>
.scroll{
  overflow: hidden;
.detail {
  .img {
    width: 100%;
    height: 260px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide {
    img {
      width: 80px;
    }
  }
  .goBack{
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    color: transparent;
  }
  img{
      width: 30px;
  }
}}
</style>
