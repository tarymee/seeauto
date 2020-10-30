<template>
    <div class="list1">
        <a class="list1__item" @click="jump(item.url)" v-for="(item, index) in list1Data" :key="index">
            <image class="list1__item-img" :src="item.img" lazy-load mode="aspectFill"></image>
            <div class="list1__item-con">
                <div class="list1__item-tit">{{item.title}}</div>
                <div class="list1__item-des">
                    <text v-if="item.type_name">{{item.type_name}}</text>
                    <div class="list1__item-des-r" v-if="item.des">{{item.des}}</div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'list1',
    components: {},
    data() {
        return {}
    },
    props: {
        list1Data: {
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
.list1 {
    padding: 0 20upx;
}
.list1__item {
    display: block;
    padding: 10px 0;
    border-bottom: 1upx solid #eee;
    overflow: hidden;
}
.list1__item-img {
    float: right;
    width: 225upx;
    height: 168upx;
    margin-left: 20upx;
    background-color: #eee;
}
.list1__item-con {
    overflow: hidden;
    display: flex;
    height: 168upx;
    flex-direction: column;
    justify-content: space-between;
}
.list1__item-tit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list1__item-des {
    font-size: 12px;
    color: #999;
}
.list1__item-des-r {
    float: right;
}
</style>