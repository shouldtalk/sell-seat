import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    // state中存放的就是全局共享的数据
    state: {
        count: 0,
        cityName: '地球',
        _token:''
    },
    mutations: {
        add(state,cityName){
            // 变更状态
           state.cityName =  cityName
        },
        updateToken: function(state,_token) {
            state._token = _token
            localStorage.setItem("_token", _token);
        },
        delet_token: function(state){
            state._token = '';
            localStorage.removeItem('_token');
        }
    }
})