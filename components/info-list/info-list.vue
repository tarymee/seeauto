<template>
    <div class="info">
        <a class="info__item" @tap="jump(item.url)" v-for="(item, index) in infoData" :key="index">
            <div class="info__item-tit">{{item.title}}</div>
            <div class="info__item-time">{{item.add_time}}</div>
        </a>
    </div>
</template>

<script>
import u from "@/common/util"
export default {
    name: "info-list",
    components: {},
    data() {
        return {}
    },
    props: {
        infoData: {
            type: Array,
            default: {}
        }
    },
    mounted() {
    },
    methods: {
        changeData(data) {
            this.infoData = data
        }
    }
}
</script>
<style scope>
.info {
    /* padding: 10px 0; */
}
.info__item {
    display: block;
    line-height: 30px;
    height: 30px;
    margin: 0 20upx;
    overflow: hidden;
}
.info__item:nth-child(2n) {
    background-color: #f5f5f5;
}
.info__item-tit {
    float: left;
    /* width: 80%; */
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
}
.info__item-time {
    float: right;
    /* width: 20%; */
    color: #999;
    font-size: 12px;
}
</style>