<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计: {{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算({{checkLength}})
      </div>
    </div>
  </template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        mounted() {
            //错误修改中，cartList报错未定义
            // console.log(this.cartList)
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                // return '￥' + this.$store.state.cartList.filter(item => {
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll() {
                // return !(this.cartList.filter(item => !item.checked).length)
                if (this.cartList.length === 0) return false
                    // return !this.cartList.find(item => !item.checked)
                for (let i = 0; i < this.cartList.length; i++) { //自己添加的判断代码
                    if (cartList[i] === false) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        },
        methods: {
            checkClick() {
                if (this.isSelectAll) {
                    this.cartList.forEach(item => item.checked = false)
                } else {
                    this.cartList.forEach(item => item.checked = true)
                }
            },
            calcClick() {
                if (!this.isSelectAll) {
                    this.$toast.show('请选择购买的商品', 2000)
                }
            }
        }
    }
</script>
<style scoped>
    .bottom-bar {
        position: fixed;
        width: 100%;
        z-index: 10;
        bottom: 49px;
        background-color: #ffffff;
        height: 40px;
        display: flex;
        text-align: center;
        line-height: 40px;
    }

    .check-content {
        margin-left: 7px;
        display: flex;
        width: 80px;
        align-items: center;
        line-height: 20px;
    }

    .check-content span {
        margin-left: 5px;
    }

    .check-button {
        width: 20px;
        height: 20px;
    }

    .price {
        flex: 1;
    }

    .calculate {
        width: 100px;
        background-color: red;
        color: #ffffff;
    }
</style>
