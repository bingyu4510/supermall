<template>
    <div class="show" v-show='isShow'>
        <div>{{message}}</div>
    </div>
</template>
<script>
    export default {
        name: 'Toast',
        /* props: {
            message: String,
            show: {
                type: Boolean,
                default: false
            }
        } */
        data() {
            return {
                /* isShow: {
                    type: Boolean,
                    default: false
                }, */
                isShow: false,
                message: ''
            }
        },
        methods: {
            show(message, time = 2000) {
                this.isShow = true
                this.message = message
                setTimeout(() => {
                    this.isShow = false
                    this.message = ''
                }, 2000)
            }
        },
    }
</script>
<style scoped>
    .show {
        position: fixed;
        top: 50%;
        left: 50%;
        color: #ffffff;
        padding: 5px 10px;
        border-radius: 20px;
        transform: translate(-50%, -50%);
        font-size: 15px;
        transition: all 1000 linear 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
</style>