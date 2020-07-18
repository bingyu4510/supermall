<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
    export default {
        name: 'NavBar'
    }
</script>
<style scoped>
    .nav-bar {
        position: relative;
        background-color: #ffffff;
        z-index: 9;
        height: 44px;
        display: flex;
        text-align: center;
        line-height: 44px;
        box-shadow: 0 -2px 5px rgba(100, 100, 100, 0.5);
    }
    
    .left,
    .right {
        width: 60px;
        height: 44px;
    }
    
    .center {
        flex: 1;
    }
</style>