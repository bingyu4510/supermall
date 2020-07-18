import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex);
const store = new Vuex.Store({
    //里面需要放的这几个东西都是固定的
    state: { //这里相当于data，里面可以放变量
        cartList: []
    },
    mutations,
    getters,
    modules,
    actions
});
//导出
export default store;