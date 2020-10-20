<template>
<div>
     <FilmList :list="list" :key="'film' + list.length" :type="type"></FilmList>
</div>
</template>
<script>
import {comingSoonListData} from '@/api/api.js'
import FilmList from '@/components/FilmList'
export default {
    data() {
        return {
            pagNum: 1,
            list:[],
            type:2
        }
    },
    async mounted() {
       let ret = await comingSoonListData(this.pagNum)
       this.list = ret.data.data.films;
    },
    components: {
        FilmList
    },
}
</script>