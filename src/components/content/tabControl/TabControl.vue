<template>
    <div class="tab-control">
        <div v-for="(item,index) in title" class="tab-control-item" 
            :class="{active: index===currentIedex}" 
            @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TabControl",
        props: {
            title: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {
                currentIedex: 0,
            }
        },
        methods: {
            itemclick(index) {
                this.currentIedex = index;
                this.$emit('tabClick', index);
            }
        }
    }
</script>
<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background-color: #ffffff;
        z-index: 8;
    }
    
    .tab-control-item {
        flex: 1;
    }
    
    .active {
        color: #e04365;
    }
    
    .active span {
        border-bottom: 2px solid #e04365;
        padding: 5px;
    }
</style>