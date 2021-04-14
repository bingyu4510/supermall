import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store/index'
import toast from 'components/common/toast/index'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, { //安装使用懒加载
    // error: 'dist/error.png',
    // loading: './assets/img/lazyload.jpg', // 懒加载使用的图片
    loading: require('./assets/img/lazyload.jpg') //直接放链接的话可能不可以，这里使用require导入
  })
  //解决移动端打开时300毫秒延时的问题,unp安装，导入，添加下面一行代码即可解决
fastclick.attach(document.body)
Vue.use(toast); //安装toast，本质就是执行对象内部的install方法，所以在导出的toast对象中有install方法

Vue.config.productionTip = false;
//使用new出来的vue对象作为事件总线
Vue.prototype.$bus = new Vue();
new Vue({
  //这一步和template作用差不多，也会使用h函数创建的标签代替挂载元素，h函数也就是createElement
  render: h => h(App),
  router,
  store
}).$mount('#app')
