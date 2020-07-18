<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">
                购物车({{cartLength}})
            </div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list/>
        <!-- 底部汇总 -->
        <cart-bottom-bar/>   
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import CartBottomBar from './childComps/CartBottomBar'

    import { //加括号
        mapGetters
    } from 'vuex'
    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: { //普助函数使用
            ...mapGetters(['cartLength']) //多个值之间用逗号间隔，另外还有其他定义方式，可以在vuex官网查询
        },
    }
</script>
<style scoped>
    .cart {
        height: 100vh;
        width: 100%;
    }
    
    .nav-bar {
        position: relative;
        background-color: lightcoral;
        color: #ffffff;
        font-size: 18px;
        /* 单词间距 */
        letter-spacing: 5px;
    }
    /* .content {
        height: calc(100vh - 44px - 49px);
    } */
</style>