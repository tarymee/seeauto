<template>
<div class="">
    <picwall ref="picwall"></picwall>
    <div class="pic">
        <div class="pic__item" v-for="(item, index) in picData" :key="index" @click="picwall(picData, index)">
            <image class="pic__item-img" :src="item.img_small" lazy-load mode="aspectFill"></image>
        </div>
    </div>
</div>
</template>

<script>
import u from "@/common/util"
import picwall from '@/components/picwall/picwall.vue'
export default {
    name: "picture-list",
    components: {
        picwall
    },
    data() {
        return {}
    },
    props: {
        picData: {
            type: Array,
            default: []
        }
    },
    mounted() {

    },
    methods: {
        picwall(data, current) {
            this.$refs.picwall.show(data, current)
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
.pic {
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    padding: 10upx 0;
}

.pic__item {
    width: 345upx;
    margin: 10upx 0 10upx 20upx;
    flex: none;
}

.pic__item-img {
    display: block;
    width: 345upx;
    height: 258upx;
    background: url('~@/static/img/loading.gif') center center no-repeat;
}
</style>