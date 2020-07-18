<template>
    <div class="tab-bar-item" @click="itemclick">
        <slot name="item-icon" v-if="!isactive"></slot>
        <slot name="item-icon-active" v-else ></slot>
        <!-- <div :class="{active:isactive}">这里修改为下句代码，动态指定文字颜色，active属性不再使用-->
        <div :style="activeStyle">
            <!-- 这里slot标签会被替换，样式会继承外面的div盒子的设置，上面两个也可以包装一个div，把if判断写在外层的div中 -->
            <slot name="item-text"></slot>
        </div>
    </div>
        
</template>
<script>
    export default {
        name: 'TabBarItem',
        data() {
            return {
                // isactive: true,
            }
        },
        methods: {
            itemclick() {
                this.$router.push(this.path)
            }
        },
        props: {
            path: String,
            activeColor: {
                type: String,
                default: '#b11111'
            }
        },
        computed: {
            isactive() {
                return this.$route.path == this.path;
                //或者使用下面的方法也可以
                // return this.$route.path.indexOf(this.paht) !== -1
            },
            //动态设置颜色，方法很多此例暂参考
            activeStyle() {
                if (this.isactive) {
                    // retrue this.style.color = this.activeColor;
                    return {
                        color: this.activeColor
                    }

                }
            }
        }
    }
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        font-size: 14px;
    }
    
    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        margin-bottom: 2px;
        vertical-align: bottom;
    }
    
    .active {
        color: #b11111;
    }
</style>