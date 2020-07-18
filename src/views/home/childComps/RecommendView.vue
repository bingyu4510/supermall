<template>
    <div class="recommend">
        <div class="recommend-view" v-for="item in recommend">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: "RecommendView",
        props: {
            recommend: {
                type: Array,
                default () {
                    return []
                }
            }
        },


    }
</script>
<style scoped>
    .recommend {
        display: flex;
        text-align: center;
        font-size: 14px;
        border-bottom: 10px solid #eee;
        padding: 10px 0 20px;
    }
    
    .recommend-view {
        flex: 1;
    }
    
    .recommend-view img {
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
</style>