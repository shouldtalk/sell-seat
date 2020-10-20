<template>
    <div class="nav">
        <div class="topBox">
            <router-link to="/city" tag="div" class="loca">
               <span>&lt;</span>  {{cityName}} <span>&gt;</span>
            </router-link>
            <span class="title">影院</span>
            <span class="search">搜索</span>
        </div>
        <ul class="navgation">
            <li>
                <span>全城</span>
            </li>
            <li>
                <span>APP订票</span>
            </li>
            <li>
                <span>离我最近</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['count','cityName']) // 扩展运算符...
    },
}
</script>

<style lang="scss" scoped>
    .nav {
    width: 100%;
    height: 80px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .topBox{
        height: 30px;
        font-size: 14px;
        position: relative;
        .loca{
            float: left;
            margin-left: 10px;
            span{
                font-size: 8px;
            }
        }
        .title{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 16px;
        }
        .search{
            display: block;
            float: right;
            margin-right: 10px;;
        }
        
    }
    .navgation {
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: space-evenly;
        li {
            font-size: 14px;
        }
    }
}
</style>