<template>
    <div class="list2">
        <a class="list2__item" @click="jump(item.url)" v-for="(item, index) in list2Data" :key="index">
            <div class="list2__item-tit">{{item.title}}</div>
            <div class="list2__item-imgs">
                <image :src="item1" lazy-load mode="aspectFill" v-for="(item1, index1) in item.img" :key="index1"></image>
            </div>
            <div class="list2__item-des">{{item.type_name}}</div>
        </a>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'list2',
    components: {},
    data() {
        return {}
    },
    props: {
        list2Data: {
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
.list2 {
    padding: 0 20upx;
}
.list2__item {
    display: block;
    padding: 10px 0;
    border-bottom: 1upx solid #eee;
    overflow: hidden;
}
.list2__item-tit {
    /* font-size: 16px; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list2__item-imgs {
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.list2__item-imgs image {
    display: block;
    width: 225upx;
    height: 168upx;
    background-color: #eee;
}
.list2__item-des {
    font-size: 12px;
    color: #999;
}
</style>