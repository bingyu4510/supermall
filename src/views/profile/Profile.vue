<template>
    <div>
        <nav-bar class="nav-bar">
            <div class="left" slot="left" @click='back'>
              <div class="left-item"></div>
            </div>
            <div slot="center" class="center">
                我的主页
            </div>
            <div class="rigth" slot="right">设置</div>
            <div>

            </div>
        </nav-bar>
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
        /* background-color: dimgrey; */
    }

    .left-item {
        width: 20px;
        height: 20px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        margin: 12px auto;
        transform: rotate(40deg);
    }

    .center {
        background-color: indianred;
        color: black;
        font-size: 20px;
    }

    .right {
        color: black;
        font-size: 20px;
    }
</style>
