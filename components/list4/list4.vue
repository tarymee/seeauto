<template>
    <div class="list4">
        <a class="list4__item" @click="jump(item.url)" v-for="(item, index) in list4Data" :key="index">
            <div class="list4__item-body">
                <image class="list4__item-img" :src="item.img ? item.img : defaultPic" lazy-load mode="aspectFill"></image>
                <div class="list4__item-con">
                    <div class="list4__item-tit">{{item.title}}</div>
                    <div class="list4__item-brand" v-if="item.sell && item.sell.length">
                        <div class="list4__item-brand__item" v-for="(item1, index1) in item.sell" :key="index1" v-if="index1 < 4">
                            <image :src="item1.img" lazy-load mode="aspectFill"></image>
                            <text>{{item1.name}}</text>
                        </div>
                    </div>
                </div>
            </div>

            <div class="list4__item-des">
                <!-- {{item.type_name}} -->
                <!-- <div class="list4__item-des-r">距离{{item.near}}米</div> -->
            </div>
        </a>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'list4',
    components: {},
    data() {
        return {
            defaultPic: `${u.API.HOST}/Uploads/defaultPic/portrait_img.jpg`,
        }
    },
    props: {
        list4Data: {
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
.list4 {
    padding: 0 20upx;
}
.list4__item {
    display: block;
    padding: 10px 0;
    border-bottom: 1upx solid #eee;
    overflow: hidden;
}
.list4__item-body {
    overflow: hidden;
    margin-bottom: 5px;
}
.list4__item-img {
    float: right;
    width: 225upx;
    height: 168upx;
    background-color: #eee;
    margin-left: 20upx;
}
.list4__item-con {
    overflow: hidden;
    display: flex;
    height: 168upx;
    flex-direction: column;
    justify-content: space-between;
}
.list4__item-tit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.list4__item-brand {
    overflow: hidden;
}
.list4__item-brand__item {
    width: 25%;
    float: left;
}
.list4__item-brand__item image {
    width: 60upx;
    height: 60upx;
    display: block;
    margin: 0px auto;
    background-color: #eee;
}
.list4__item-brand__item text {
    display: block;
    font-size: 12px;
    overflow: hidden;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #333;
}
.list4__item-des {
    overflow: hidden;
    font-size: 12px;
    color: #999;
}
.list4__item-des-r {
    float: right;
    color: #10a2ff;
}
</style>