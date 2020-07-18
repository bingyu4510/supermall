<template>
  <!-- 最外层的组件swiper就可以i当作根元素，不用在外面再写一个<div> 轮播图不转的话，可以到swiper组件中的
    settimeout中时间在增加一些，原来设置为100-->
    <swiper class="head">
      <swiper-item v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>
<script>
    import {
        Swiper,
        SwiperItem
    }
    from 'components/common/swiper'

    export default {
        name: 'DetailSwiper',
        props: {
            topImages: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperItem
        }
    }
</script>
<style scoped>
    .head {
        height: 300px;
        overflow: hidden;
    }
</style>
