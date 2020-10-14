import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/vuex'

Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: '/images/load.jpg',
});
Vue.prototype.eventBus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
