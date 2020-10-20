import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: '/images/load.jpg',
});


Vue.prototype.eventBus = new Vue();
Vue.use(ElementUI);

let _token = localStorage.getItem("_token")
if (_token) {
    store.commit("updateToken", _token);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
