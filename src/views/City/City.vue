<template>
  <div class="scroll" :style="{ height: height + 'px' }">
    <van-index-bar :index-list="indexList" highlight-color="#ff0000">
      <template v-for="item in dataList">
        <van-index-anchor
          :index="item.index"
          :key="item.index"
          style="background: #eee"
        ></van-index-anchor>
        <van-cell
          @click="chooseCity(sub.name)"
          v-for="(sub, key) in item.data"
          :title="sub.name"
          :key="key"
        />
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { cityListData } from "@/api/api";
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
import BScroll from "better-scroll";
import "vant/lib/index.css";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      dataList: [],
      indexList: [],
      height: 0,
    };
  },
  async mounted() {
  
    // 获取城市的列表数据
    let ret = await cityListData();
    this.dataList = ret[0];
    this.indexList = ret[1];
  },
   created() {
        if (navigator.geolocation) {
            console.log(navigator.geolocation);
      var n =  navigator.geolocation.getCurrentPosition(function (res) {
        console.log(res); // 需要的坐标地址就在res中
      },err=>{ alert("该浏览器不支持定位")});
    } 
    this.eventBus.$emit("footernav", false);
    this.height = document.documentElement.clientHeight - 55;
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
  methods: {
    // 获取选择的城市名称
    chooseCity: function (city) {
      this.$store.commit("add", city);
      this.$router.go(-1);
    },
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
};
</script>