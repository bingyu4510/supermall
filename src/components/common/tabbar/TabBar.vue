<template>
    <div class="tab-bar">
       <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'TabBar',
    }
</script>
<style scoped>
    .tab-bar {
        display: flex;
        flex: 1;
        height: 49px;
        background-color: #f6f6f6;
        box-shadow: 0 -3px 2px rgba(100, 100, 100, 0.1);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>