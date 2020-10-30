<template>
    <div class="pro">
        <div :class="grid === '2' ? 'pro__item' : 'pro__item2'" v-for="(item, index) in productArr" :key="index" @click="jump()">
            <image :class="grid === '2' ? 'pro__item-img' : 'pro__item2-img'" :src="item.img" lazy-load="true" mode="aspectFill"></image>
            <text class="pro__item-tit">{{item.title}}</text>
            <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.vipPrice}}万</div>
        </div>
    </div>
</template>

<script>
import u from "@/common/util"
export default {
    name: "product-list",
    components: {},
    data() {
        return {}
    },
    props: {
        productArr: {
            type: Array,
            default: []
        },
        grid: {
            type: String,
            default: '2'
        }
    },
    mounted() {
        console.log('product-list mounted')
        let that = this
        console.log(that.grid)
    },
    methods: {

    }
}
</script>

<style scope>
@charset "UTF-8";
/* 商品 */
/* .pro {
    overflow: hidden;
    margin: 15upx 15upx 0;
}

.pro__item {
    float: left;
    margin: 15upx;
} */

.pro {
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
}

.pro__item {
    width: 330upx;
    margin: 15upx 0 15upx 30upx;
    flex: none;
}

.pro__item-img {
    display: block;
    width: 330upx;
    height: 330upx;
    background: url('~@/static/img/loading.gif') center center no-repeat;
}

.pro__item2 {
    width: 210upx;
    margin: 15upx 0 15upx 30upx;
    flex: none;
}

.pro__item2-img {
    display: block;
    width: 210upx;
    height: 210upx;
    background: url('~@/static/img/loading.gif') center center no-repeat;
}

.pro__item-tit {
    display: block;
    font-size: 14px;
    color: #333;
    line-height: 25px;
}

.pro__item-price {
    display: block;
    font-size: 16px;
    color: #d1a178;
    font-weight: bold;
    line-height: 20px;
}

.pro__item-symbol {
    font-size: 12px;
}
</style>