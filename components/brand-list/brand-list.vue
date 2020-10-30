<template>
    <div class="brand">
        <a class="brand__item" @tap="jump(item.url)" v-for="(item, index) in brandData" :key="index">
            <image :src="item.brand_logo" lazy-load mode="aspectFill"></image>
            <text>{{item.brand_name}}</text>
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
        brandData: {
            type: Array,
            default: []
        }
    },
    mounted() {
    },
    methods: {
        changeData(data) {
            this.brandData = data
        }
    }
}
</script>
<style scope>
/* 品牌 */
.brand {
    margin: 5px 20upx;
    overflow: hidden;
    /* height: 140px; */
}
.brand__item {
    width: 20%;
    margin: 5px 0;
    float: left;
}
.brand__item image {
    width: 40px;
    height: 40px;
    /* border-radius: 50%; */
    overflow: hidden;
    display: block;
    margin: 0px auto;
    background-color: #eee;
}
.brand__item text {
    display: block;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #333;
}
</style>