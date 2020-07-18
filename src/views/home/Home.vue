<template>
    <div id="home">
        <!-- 顶部 -->
       <nav-bar class="home-nav">
           <div slot="center">购物街</div>
       </nav-bar>
       <tab-control :title="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show='isShow'/>
       <!-- 轮播图 -->
      <scroll class="content" ref='scroll'
            :probe-type="3"
            @scroll='contentScroll'
            :pull-up-load="true"
            @pullingUp='loadMore'>
        <home-swiper v-bind:banner="banner" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
      </scroll>
      <!-- .native修饰符，组件标签无法监听事件点击，但是添加这个修饰符就可以了 -->
      <back-top  @click.native="backtop" v-show='isShowBackTop'/>
    </div>
</template>
<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper"
    import RecommendView from "./childComps/RecommendView"
    import FeatureView from "./childComps/FeatureView"
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll"
    import BackTop from '../../components/content/backTop/BackTop'

    //函数导入
    import {
        debounce
    } from 'common/utils'

    import {
        getHomeMultidata,
        getHomeGoods
    } from "../../network/home"
    import {
        itemListenerMixin
    } from 'common/mixin'

    export default {
        name: 'Home',
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,
        },
        data() {
            return {
                banner: [],
                recommend: [],
                goods: {
                    pop: {
                        page: 0,
                        list: []
                    },
                    new: {
                        page: 0,
                        list: []
                    },
                    sell: {
                        page: 0,
                        list: []
                    }
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isShow: false,
                saveY: 0,
            }
        },
        mixins: [itemListenerMixin],
        created() {
            this.getHomeMultidata();

            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        mounted() {
            /*  //调用防抖函数,使用混入函数之后，可以代替这里的代码，相当于在这里也定义了和下面相同的代码
             const refresh = debounce(this.$refs.scroll.refresh, 500);
             // 封装为一个变量，可以方便在关闭防抖函数中使用这个变量
             this.itemImgListence = () => {
                 refresh()
             };
             //使用事件总线刷新图片，事件总线用法,在这里定义方法，保证content已经实现挂载，获取时不为空
             this.$bus.$on("itemImageLoad", this.itemImgListence); */

        },
        methods: {
            //组件数据传输函数
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = "pop"
                        break;
                    case 1:
                        this.currentType = "new"
                        break;
                    case 2:
                        this.currentType = "sell"
                        break;
                }
                this.$refs.tabControl1.currentIedex = index
                this.$refs.tabControl2.currentIedex = index

                // console.log(index)
            },

            //网络链接函数
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banner = res.data.banner.list;
                    this.recommend = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                // goods[type]和goods.type效果一样，区别是，前面一个可以传入变量，而type就是变量，goods.的形式只能跟指定的属性名称
                const nums = this.goods[type].page + 1
                getHomeGoods(type, nums).then(res => {
                    //使用可变数组的形式将数据追加到this.goods[type].list中
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    // console.log(res)
                    //多次上拉加载更多
                    this.$refs.scroll.finishPullUp();
                })
            },

            //组件内的点击方法回到顶部
            backtop() {
                // console.log('fdjg')
                // this.$refs.content获取的是Scroll组件对象，再使用组件对象再获取实现滚动的scroll对象
                //scrollTo(0, 0, 1000)返回顶部函数，前两个是返回的位置，后面是时间
                // this.$refs.scroll.scroll判断scroll对象是都为空，
                this.$refs.scroll.scrollTo(0, 0);
            },

            //滚动位置监听
            contentScroll(position) {
                //返回顶部是否可显示,大于1000时isShowBackTop等于true，返回顶部标签显示出来
                this.isShowBackTop = (-position.y) > 1000;
                //吸顶效果是否显示
                this.isShow = (-position.y) > this.tabOffsetTop;
                // console.log(position)
            },

            //上拉加载更多
            loadMore() {
                this.getHomeGoods(this.currentType);
            },

            swiperImageLoad() { //获取轮播图中图片的高度
                //所有组件都有这个$el属性，获取组件中的元素
                // console.log(this.$refs.tabControl.$el.offsetTop)
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },

        },
        destroyed() {
            console.log('测试是否调用：destroyed')
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.scroll.y;

            //关闭防抖函数，前面是发射过来的事件名，后面是需要关闭的回调函数
            this.$bus.$off("itemImageLoad", this.itemImgListence);
            // console.log(this.$refs.content.scroll.y)这里可以获取滚动的y轴数值
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
    }
</script>
<style scoped>
    #home {
        /* padding-top: 44px; */
        position: relative;
        height: 100vh;
    }

    .home-nav {
        /* 使用css变量 */
        background-color: var( --color-tint);
        color: cornsilk;
        font-size: 20px;
        /*  position: fixed;
        z-index: 9;
        left: 0;
        right: 0;
        top: 0; 使用scroll插件之后，可滑动的区域是固定的，不会影响这里，所以可以删除fixed*/
        /* 字间距 */
        /* letter-spacing: 10px; */
    }
    /* 使用scroll实现滚动之后，这里就无法获取位置了 tab-control已经无效*/

    .tab-control {
        /* position: sticky;
        top: 44px; 这种设置的吸顶效果已经失去作用*/
        position: relative;
        z-index: 9;
    }

    .content {
        /* height: 300px; */
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
