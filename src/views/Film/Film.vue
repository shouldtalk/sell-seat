<template>
<div>
     <FilmListTopNav class="fixed"></FilmListTopNav>
        <router-view></router-view>
</div>
</template>
<script>
import FilmListTopNav from '@/components/FilmListTopNav'
export default {
     data() {
        return {
            // 默认不吸顶
            fixed: false,
        };
    },
    components: {
        FilmListTopNav
    },
}
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
  background : white;
}
</style>