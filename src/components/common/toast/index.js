import Toast from './Toast'
var obj = {}
obj.install = function(Vue) { //第一个参数是一个vue对象
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //使用new的方式，使用构造器，构建组件对象
    const toast = new toastContrustor();
    //将组件对象，手动挂载到一个元素上
    toast.$mount(document.createElement('div'));
    //toast.$el对应的就是挂载的div
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast

}
export default obj