<template>
<div>
        <FilmList :list="list" :key="'film' + list.length" :type="type"></FilmList>
</div>
</template>
<script>
import {nowPlayingListData} from '@/api/api.js'
import FilmList from '@/components/FilmList'
export default {
    data() {
        return {
            pagNum: 1,
            list:[],
            type: 1
        }
    },
    async mounted() {
       let ret = await nowPlayingListData(this.pagNum)
       this.list = ret.data.data.films;
    },
     components: {
        FilmList
    },
}
</script>