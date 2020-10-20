<template>
    <div>
        <Loading v-if="loading"></Loading>
        <CinemaListTopNav class="fixed"></CinemaListTopNav>
        <div class="scroll" :style="{height:height + 'px'}">
            <ul class="cinemalists">
            <li v-for="(item,index) in cinemas" :key="index" :class="{bgcolor:i === index}" @click="clickli(item,index)">
                <div class="nap">
                    <span class="name">{{item.name}}</span>
                    <span class="price">￥<i>{{item.lowPrice / 100}}</i>起</span>
                </div>
                <div class="loca">
                    <span class="address">{{item.address}}</span>
                    <span class="distance">{{item.Distance | parseDistance}} km</span>
                </div>
            </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import BScroll from "better-scroll"
import CinemaListTopNav from "@/components/CinemaListTopNav"
import {cinemaListData } from "@/api/api"
import Loading from "@/components/Loading"
// import loaction from "https://api.i-lynn.cn/poi?location=121.49124909851835,31.379142696763655"
export default {
    data() {
        return {
            loading:true,
            cinemas:[],
            height: 0,
            bs: null,
            i:-1
        }
    },
    components:{
        CinemaListTopNav,
        Loading,
    },
    created() {
        this.height = document.documentElement.clientHeight - 55
    },
    async mounted() {
        let ret = await cinemaListData()
        this.cinemas = ret.data.data.cinemas

        if(this.cinemas.length > 0){
            this.loading = false
        }else{
            this.loading = true
        }
    },
    updated() {
        this.bs = new BScroll('.scroll',{
            // 激活上滑的监听事件
            pullUpLoad: true,
            // 激活下滑的监听事件
            // pullDownRefresh: true,
            // 默认情况下使用bs后，它会禁止浏览器的点击事件
            click: true,
        })
    },
    filters:{
        parseDistance: function(value){
            return Math.ceil(value*100)/100
        }
    },
    
    methods: {
        clickli: function(item,index){
            this.i = index;
        }
    },
}
</script>

<style lang="scss" scoped>
    .fixed{
        position: fixed;
        top: 0;
        background: #fff;
        z-index: 123;
    }
    .cinemalists{
        padding-top: 85px;
        li{
            padding: 15px;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #ededed;
            .nap{
                display: flex;
                justify-content: space-between;
                color: #18191a;
                .name{
                    font-size: 16px;
                    font-weight: 600;
                }
                .price{
                    color: #ff5f16;
                    font-size: 12px;
                    i{
                        font-size: 15px;
                        font-style: normal;
                    }
                }
            }
            .loca{
                margin-top: 5px;;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #797d82;
                .address{
                    width: 260px; 
                    text-overflow: ellipsis; 
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }
        .bgcolor {
            background: #f5f5f5;
        }
    }
    .scroll{
        overflow: hidden;
    }
</style>