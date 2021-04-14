<template>
    <div>
        <nav-bar class="nav-bar">
            <div class="left" slot='left' @click='back'>
              <div class="left-item"></div>
            </div>
            <div slot="center" class="center">
                我的主页哈哈哈
            </div>
            <div class="rigth" slot="right">设置</div>
        </nav-bar>
        <div>我是内容区域</div>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: 'Profile',
        components: {
            NavBar
        },
        methods: {
            back() {
                this.$router.back()
            }
        },
    }
</script>
<style scoped>
    .nav-bar {
        font-size: 18px;
        font-family: '黑体', '华文楷体', '隶书', '楷体', "宋体", Helvetica, sans-serif, Arial!important;
        color: coral;
    }

    .right img {
        height: 40px;
        background-color: darkgrey;
    }

    .left {
        /* 使用flex模式居中 */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .left-item {
        /* 使用定位居中时，translate不起效果 */
        width: 15px;
        height: 15px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        transform: rotate(40deg);
    }

    .center {
        background-color: #ff8198;
        color: black;
        font-size: 20px;
    }

    .right {
        color: black;
        font-size: 20px;
    }
</style>
