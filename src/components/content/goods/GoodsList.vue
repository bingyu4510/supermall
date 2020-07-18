<template>
    <div class="goods">     
        <!-- <goods-list-item ></goods-list-item> -->
        <goods-list-item v-for="item in goods" :goods-item="item"/>
    </div>
</template>
<script>
    import GoodsListItem from "./GoodsListItem"
    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goods: {
                type: Array,
                default () {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    .goods {
        display: flex;
        /* 多出换行显示 */
        flex-wrap: wrap;
        /* 一行内元素环绕分布 */
        justify-content: space-around;
        padding: 2px;
    }
</style>