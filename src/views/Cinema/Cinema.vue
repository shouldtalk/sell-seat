<template>
<div>
    <div>
        <select name="city"  @click="handle" >
        <option >{{cityName}}</option>
        </select>
    </div>
    <h1>这是电影院</h1>
</div>
</template>
<script>
import { cinemaListData } from "@/api/api";
import {mapState} from 'vuex'
export default {
    data() {
        return {
            cinemas: [],
        };
    },
    computed: {
        ...mapState(['cityName'])
    },
    async mounted() {
        let ret = await cinemaListData();
        this.cinemas = ret.data.data.cinemas;
    },
    methods: {
        handle(){
            this.$router.push({path: '/city'})
        }
    },
};
</script>