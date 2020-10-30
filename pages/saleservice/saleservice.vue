<template>
<view>
    <!-- <navbar :title="title"></navbar> -->

    <view class="pic">
		<image :src="sale_01"></image>
		<image :src="sale_02"></image>
		<image :src="sale_03"></image>
		<image :src="sale_04"></image>
		<image :src="sale_05"></image>
	</view>

</view>
</template>

<script>
import u from '@/common/util'
export default {
    components: {
    },
    data() {
        return {
            title: '导购服务',
            sale_01: `${u.API.HOST}/Uploads/sale/sale_01.jpg`,
            sale_02: `${u.API.HOST}/Uploads/sale/sale_02.jpg`,
            sale_03: `${u.API.HOST}/Uploads/sale/sale_03.jpg`,
            sale_04: `${u.API.HOST}/Uploads/sale/sale_04.jpg`,
            sale_05: `${u.API.HOST}/Uploads/sale/sale_05.jpg`,
        }
    },
    methods: {
        test() {

        }
    },
    onLoad() {
    },
    onShow() {
    }
}
</script>

<style scoped>

.pic image{ width: 100%; float: left;}
</style>
