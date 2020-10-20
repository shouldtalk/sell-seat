<template>
  <div id="app">
    <FooterNav v-if="is_show"/>
    <router-view/>
  </div>
</template>
<script>
import FooterNav from "@/components/FooterNav";

export default {
    data() {
        return {
            is_show:true,
        }
    },
    components: {
        FooterNav,
    },
    created() {
    this.eventBus.$on("footernav", (flag) => {
        this.is_show = flag;
    });
},
};
</script>
<style lang="scss" >
   * {
    margin: 0;
    padding: 0;
}
html,
body {
    touch-action: none;
    height: 100%;
    ul,
    li {
        list-style: none;
    }
}
</style>
