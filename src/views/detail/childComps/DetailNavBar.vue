<template>
    <div>
      <nav-bar>
            <div slot="left" class="left" @click='back'>
                <div class="left-back"></div>
            </div>
        
          <div slot="center" class="title" >
            <div v-for="(item,index) in title" 
                class="title-item" 
                :class="{active:index===currentIndex}"
                @click="itemClick(index)">
                {{item}}
            </div>
          </div>
      </nav-bar>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: 'DetailNavBar',
        data() {
            return {
                title: ['商品', '评论', '参数', '推荐'],
                currentIndex: 0,
            }
        },
        components: {
            NavBar
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('titleClick', index)
            },
            back() {
                this.$router.back()
            }
        },
    }
</script>
<style scoped>
    .title {
        display: flex;
    }
    
    .title-item {
        flex: 1;
    }
    
    .active {
        color: rgb(177, 17, 17);
    }
    /* .left {
        text-align: center;
    } */
    
    .left-back {
        height: 15px;
        width: 15px;
        border-left: 3px solid brown;
        border-bottom: 3px solid brown;
        margin-left: 30px;
        margin-top: 15px;
        /* 顺时针旋转45度 deg:单位 */
        transform: rotate(45deg);
    }
</style>