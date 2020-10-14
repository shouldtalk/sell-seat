<template>
    <div class="list scroll" :style="{height: height + 'px'}">
      <div>
           <Loading v-if="loading"></Loading>
         
         <div
            class="item"
            v-else
            v-for="(item, index) in data"
            @click="goDetail(item.filmId)"
            :key="index"
        >
            <div class="left">
                <img v-lazy="item.poster" />
            </div>
            <div class="middle">
                <div>{{ item.name }}</div>
                <div v-if='type ==1'>
                    <span>观众评分 </span>
                    <span class="grade">{{ item.grade }}</span>
                </div>
                <div>主演：{{ item.actors | parseActors }}</div>
                <div v-if="type == 1">{{ item.nation }} | {{ item.runtime }}分钟</div>
            </div>
            <div class="right">
                <span v-if="type == 1">购票</span>
        		<span v-else>预约</span>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading';
import BScroll from "better-scroll";
import {nowPlayingListData,comingSoonListData} from '@/api/api.js'
export default {
    data() {
        return {
            // 设置默认显示loading
            loading: true,
            height:0,
            data:[],
            bs:null,
            page:1
        }
    },
    props: ['list','type'],
    created() {
        // 判断是否有数据，如果有数据就移除loading加载层
        if(this.list.length > 0){
            this.loading = false
        }
    },
    components: {
        Loading
    },
     filters: {
        parseActors: function(value) {
            let actors = "";
            value.forEach((element) => {
                actors += element.name + " ";
            });
            return actors;
        },
    },
    methods: {
        goDetail: function(filmId) {
            this.$router.push({ name: "detail", params: { filmId } });
        },
        getData: async function(){
             this.page++ ;
             console.log(this.page)
            if(this.type == 1){
                var ret = await nowPlayingListData(this.page)
            }else{
               var ret = await comingSoonListData(this.page)
            }
            this.data = this.data.concat(ret.data.data.films)
        }
    },
     mounted() {
        // 获取可视高度
        this.data = this.list;
        this.height = document.documentElement.clientHeight - 111
    },
    updated() {
         this.$nextTick(() => {
            this.bs = new BScroll('.scroll', {
                // 激活上滑动的事件监听
                pullUpLoad: true,
                // 激活下滑的事件监听
                pullDownRefresh: true,
                // 默认情况下使用bs后，它会禁止浏览器的点击事件
                click: true
            })
            // 上拉刷新
         
            this.bs.on('pullingUp', () => {
                this.getData()
                // 获取数据
                //本次pullup动作已经完成，继续准备下一次pullup
                this.bs.finishPullUp()
            })
            this.bs.on('pullingDown', () => {
                 this.getData()
                // 获取数据
                //本次pulldown动作已经完成，继续准备下一次pulldown
                this.bs.finishPullDown()
            })
        })
    },
     beforeDestroy() {
        // 节约资源
        this.bs = null
    }
};

</script>


<style lang="scss" scoped>
.list{
    margin-bottom: 50px;
    .item {
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    color: #797d82;
    font-size: 13px;
    border-bottom: 1px solid #ededed;

    .left {
        width: 77px;
        height: 100px;
        margin-left: 20px;
        img {
            width: 66px;
            height: 100%;
        }
    }

    .middle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 55%;

        div:nth-of-type(1) {
            color: #191a1b;
            font-size: 16px;
        }

        div:nth-of-type(3) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
.scroll {
	overflow: hidden;
}
    .right {
        width: 15%;
        display: flex;
        align-items: center;
        margin-right: 20px;

        span {
            border: 1px solid #ff5f16;
            background: white;
            color: #ff5f16;
            border-radius: 2px;
            height: 25px;
            line-height: 25px;
            font-size: 13px;
            width: 50px;
            text-align: center;
        }
    }
}
}
</style>