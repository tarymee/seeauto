<template>
    <div class="discar">
        <a class="discar-item" @tap="jump(`/pages/specialdetail/specialdetail?id=${item.id}`)" v-for="(item, index) in discarData" :key="index" :class="style2 ? 'discar-item2' : ''">
            <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
            <div class="discar-item-tit">{{item.model_name}}{{item.style_name}}</div>
            <div class="discar-item-des">
                <text class="discar-item-price">￥{{item.price}}万</text>
                <text class="discar-item-discountprice">￥{{item.special_price}}万</text>
            </div>
        </a>
    </div>
</template>

<script>
import u from "@/common/util"
export default {
    name: "discar-list",
    components: {},
    data() {
        return {}
    },
    props: {
        discarData: {
            type: Array,
            default: {}
        },
        // 用于看车页 右边需求留出空间给导航条
        style2: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
    },
    methods: {
        changeData(data) {
            this.discarData = data
        }
    }
}
</script>

<style scope>
/* 特价车组件 */
.discar {
    margin: 5px 0;
    /* overflow: hidden; */
    font-size: 0px;
}
.discar-item {
    display: inline-block;
    width: 223upx;
    margin: 5px 0 5px 20upx;
    position: relative;
}
.discar-item2 {
    margin: 5px 0 5px 15upx;
}
.discar-item image {
    display: block;
    width: 223upx;
    height: 167upx;
    background-color: #eee;
}
.discar-item-tit {
    display: block;
    font-size: 12px;
    color: #333;
    line-height: 25px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}
.discar-item-des {
    font-size: 22upx;
    line-height: 20px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.discar-item-price {
    color: #999;
    text-decoration: line-through;
    /* float: left; */
}
.discar-item-discountprice {
    color: #f00;
    /* float: right; */
}
</style>