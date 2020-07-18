<template>
    <div id="detail">
        <detail-nav-bar class="navbar" ref="content" @titleClick='titleClick' />
        <scroll class="content" ref="scroll" :probeType='3' @scroll='contentScroll'>
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop='shop'/>
            <detail-comment-info :commentInfo='commentInfo' ref="comment"/>
            <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
            <detail-param-info :paramInfo='paramInfo' ref="param"/>
            <goods-list :goods='recommend' ref="goods"/>
        </scroll>
        <detail-bottom-bar @addToCart='addToCart'/>
        <back-top  @click.native="backtop" v-show='isShowBackTop'/>
        <!-- <toast :message='message' :show="show" 没有封装为组件之前的写法/> -->
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import Scroll from 'components/common/scroll/Scroll'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList'
    import DetailBottomBar from './childComps/DetailBottomBar'
    import BackTop from '../../components/content/backTop/BackTop'
    import Toast from 'components/common/toast/Toast'

    import {
        getDetail,
        Goods,
        Shop,
        GoodsParam,
        getRecommend,
    } from 'network/detail'
    import {
        mapActions
    } from 'vuex'
    import {
        debounce
    } from 'common/utils'
    import {
        itemListenerMixin
    } from 'common/mixin'
    export default {
        name: 'Detail',
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {
                    type: Object,
                    default () {
                        return {}
                    }
                },
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommend: [],
                themeTopY: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: false,
                tabOffsetTop: 0,
                message: '',
                show: false
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            BackTop,
            Toast
        },
        mixins: [itemListenerMixin],
        created() {
            //保存传入的iid
            this.iid = this.$route.params.id;

            //初始化获取数据
            getDetail(this.iid).then(res => {
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                // console.log(this.topImages)
                // console.log(res)
                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //获取商品详细信息
                this.shop = new Shop(data.shopInfo);
                this.detailInfo = data.detailInfo;
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                this.commentInfo = data.rate.list[0];
            })

            this.getThemeTopY = debounce(() => {
                this.themeTopY = [];
                this.themeTopY.push(0);
                //后面需要加上narbar的高度，才可以滚动到正常位置
                this.themeTopY.push(-this.$refs.comment.$el.offsetTop + (this.$refs.content.$el.offsetHeight))
                this.themeTopY.push(-this.$refs.param.$el.offsetTop + (this.$refs.content.$el.offsetHeight))
                this.themeTopY.push(-this.$refs.goods.$el.offsetTop + (this.$refs.content.$el.offsetHeight))
                this.themeTopY.push(Number.MAX_VALUE)

            }, 200);

        },
        mounted() {


            getRecommend().then(res => {
                this.recommend = res.data.list;
                // console.log(res)
                // console.log(this.recommend)
            })

        },
        methods: {
            ...mapActions(['addCart']),
            imageLoad() {
                this.newRefresh();
                this.getThemeTopY();

            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, this.themeTopY[index], 500)
            },
            contentScroll(position) { //跟随navbar的下标值，滚动到相应元素位置，但是没有作用，待补充修改
                // console.log(position.y)
                const positionY = -position.y //获取的都是负值，转为正值有利于判断
                let length = this.themeTopY.length
                for (let i = 0; i < length - 1; i++) {
                    /* if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]) ||
                            (i === length - 1 && positionY >= this.themeTopY[i]))) {
                        this.currentIndex = i;
                        // console.log(this.currentIndex);
                        this.$refs.content.currentIndex = this.currentIndex

                    } */
                    if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])) {
                        this.currentIndex = i;
                        this.$refs.content.currentIndex = this.currentIndex
                    }
                }
                //返回顶部是否可显示
                this.isShowBackTop = (-position.y) > 1000;
            },
            backtop() {
                this.$refs.scroll.scrollTo(0, 0);
            },
            addToCart() {
                const product = {}
                product.img = this.topImages[0]
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid
                this.addCart(product).then(res => { //相当于直接调用actions里面的addCart方法
                        // console.log(res)
                        /* this.message = res //没有封装为组件之前的写法
                        this.show = true
                        setTimeout(() => {
                            this.show = false
                            this.message = null
                        }, 1500) */
                        this.$toast.show(res, 3000);
                    })
                    /* this.$store.dispatch('addCart', product).then(res => {
                        this.message = res
                    }) */
            }
        },
        destroyed() {
            //关闭防抖函数，前面是发射过来的事件名，后面是需要关闭的回调函数
            this.$bus.$off("itemImageLoad", this.itemImgListence);
            // console.log('是否调用防抖')
        },
    }
</script>
<style scoped>
    #detail {
        /* 这里设置定位是为了盖住下面的四个导航按键， */
        position: relative;
        background-color: #ffffff;
        z-index: 9;
    }
    /* .navbar {
        position: relative;
        z-index: 9;
        background-color: #ffffff;
        这里的样式直接在父组件中定义，所有子组件都有相同css设置
    } */
    /* .content {
        /* 注意间隔，这里是设置视口高度，视口高度减去上面的navbar导航高度，navbar不脱标，不用加margin-top
        height: calc(100vh - 44px - 58px);
    } */
    /* 上面和下面两种定位方式都可以 */

    .content {
        position: fixed;
        top: 44px;
        bottom: 58px;
    }
</style>
