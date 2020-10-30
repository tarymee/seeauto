<template>
    <div class="list3">
        <a class="list3__item" @click="jump(item.url)" v-for="(item, index) in list3Data" :key="index">
            <div class="list3__item-tit">{{item.title}}</div>
            <image class="list3__item-img" :src="item.img" lazy-load mode="aspectFill"></image>
            <div class="list3__item-des">{{item.type_name}}</div>
        </a>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'list3',
    components: {},
    data() {
        return {}
    },
    props: {
        list3Data: {
            type: Array,
            default: []
        }
    },
    mounted() {
        let that = this
        // console.log(that)
    },
    methods: {

    }
}
</script>

<style scope>
.list3 {
    padding: 0 20upx;
}
.list3__item {
    display: block;
    padding: 10px 0;
    border-bottom: 1upx solid #eee;
    overflow: hidden;
}
.list3__item-tit {
    /* font-size: 16px; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list3__item-img {
    display: block;
    background-color: #eee;
    margin: 10px 0;
    width: 710upx;
    height: 355upx;
}
.list3__item-des {
    font-size: 12px;
    color: #999;
}
</style>