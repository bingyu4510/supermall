<template>
    <swiper>
        <swiper-item v-for="item in banner">
            <a v-bind:href="item.link"> 
                <img v-bind:src="item.image" @load="imageLoad"/>
            </a>
        </swiper-item>
    </swiper>
</template>
<script>
    import {
        Swiper,
        SwiperItem
    } from "components/common/swiper/index"

    export default {
        name: "HomeSwiper",
        props: {
            banner: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        data() {
            return {
                isLoad: false,
            }
        },
        methods: {
            imageLoad() {
                // console.log('img')
                if (!this.isLoad) {
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        },

    }
</script>
<style scoped>

</style>