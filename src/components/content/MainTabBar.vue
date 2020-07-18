<template>
    <tab-bar>
        <tab-bar-item path="/home" >
          <img src="../../assets/img/tabbar/主页.jpg" alt="" slot="item-icon">
          <img src="../../assets/img/tabbar/主页-red.jpg" alt="" slot="item-icon-active">
          <div slot="item-text">主页</div>
        </tab-bar-item>
        <tab-bar-item path="/category" >
          <img src="../../assets/img/tabbar/选项.jpg" alt="" slot="item-icon">
          <img src="../../assets/img/tabbar/选项-red.jpg" alt="" slot="item-icon-active">
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart" >
          <img src="../../assets/img/tabbar/购物车.jpg" alt="" slot="item-icon">
          <img src="../../assets/img/tabbar/购物车-red.jpg" alt="" slot="item-icon-active">
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile">
          <img src="../../assets/img/tabbar/我的.jpg" alt="" slot="item-icon">
          <img src="../../assets/img/tabbar/我的-red.jpg" alt="" slot="item-icon-active">
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>  
</template>
<script>
    import TabBar from "../common/tabbar/TabBar"
    import TabBarItem from "../common/tabbar/TabBarItem"
    export default {
        name: 'MainTabBar',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>
<style scoped>

</style>