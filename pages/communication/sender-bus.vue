<template>
<view class="sender-container">
    <button type="primary" @click="send">EventBus发送消息</button>
</view>
</template>

<script>
import bus from '@/common/bus'
export default {
    methods: {
        send() {
            let num = parseInt(Math.random() * 10000)
            bus.$emit('cc', {
                msg: 'From event bus -> ' + num
            })
        }
    }
}
</script>

<style>
.sender-container{
    padding: 20px;
}
</style>
