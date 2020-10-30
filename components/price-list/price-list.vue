<template>
    <div class="price">
        <a class="price-item" @tap="jump(item.url)" v-for="(item, index) in priceData" :key="index">
            <text>{{item.name}}</text>
        </a>
    </div>
</template>

<script>
import u from "@/common/util"
export default {
    name: "brand-list",
    components: {},
    data() {
        return {}
    },
    props: {
        priceData: {
            type: Array,
            default: {}
        }
    },
    mounted() {
    },
    methods: {
        changeData(data) {
            this.priceData = data
        }
    }
}
</script>
<style scope>
/* 价格 新能源 */
.price {
    margin: 5px 20upx;
    overflow: hidden;
}
.price-item {
    width: 21%;
    /* padding: 5px 0; */
    margin: 5px 2%;
    border: 1upx solid #e3e3e3;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
}
.price-item text {
    display: block;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    color: #333;
}
</style>