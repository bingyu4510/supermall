<template>
    <div class="cart-list" >
        <scroll class="content" ref="scroll">
            <cart-list-item v-for='(item,index) in cartList' ::key="index" :item-info="item"></cart-list-item> 
        </scroll>     
    </div>     
</template>
<script>
    import {
        mapGetters
    } from 'vuex'

    import CartListItem from './CartListItem'
    import Scroll from 'components/common/scroll/Scroll'

    export default {
        name: 'CartList',
        components: {
            CartListItem,
            Scroll
        },
        computed: {
            ...mapGetters(['cartLength', 'cartList'])
        },
        activated() {
            //进入购物车页面之后重新计算scroll可滚动的高度
            this.$refs.scroll.refresh();
        },
    }
</script>
<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 40px);
    }
    
    .content {
        height: 100%;
        overflow: hidden;
    }
</style>