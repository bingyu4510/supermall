<template>
<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
            }
        },
        props: {
            probeType: {
                tyep: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true, //设置div元素是否可以点击
                probeType: this.probeType, //是否可以监听滚动
                pullUpLoad: this.pullUpLoad, //是否可以监听下拉加载更多
            });

            this.scroll.on('scroll', (position) => { //使用这个函数监听位置信息
                this.$emit('scroll', position);
            });

            this.scroll.on('pullingUp', () => {
                // console.log("上拉加载更多");
                this.$emit('pullingUp');
            })
        },
        methods: {
            scrollTo(x, y, time = 1000) {
                //判断scroll对象是否为空，不为空执行后面的代码
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            refresh() {
                //这里也是判断scroll对象是否为空
                this.scroll && this.scroll.refresh();
                // console.log('防抖函数调用')
            },
            finishPullUp() {
                this.scroll.finishPullUp();
            }
        },
    }
</script>
<style scoped>

</style>
