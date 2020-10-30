<template>
    <view>
        <!-- <navbar :title="title"></navbar> -->
        <view class="subNav">
            <navigator url="/pages/hot/hot" class="btn">
                <image src="../../static/img/sale-icon1.png"></image><text>热门推荐</text>
            </navigator>
            <navigator url="/pages/calculate/calculate" class="btn">
                <image src="../../static/img/sale-icon2.png"></image><text>购车计算器</text>
            </navigator>
            <navigator url="/pages/saleservice/saleservice" class="btn">
                <image src="../../static/img/sale-icon3.png"></image><text>导购服务</text>
            </navigator>
            <navigator url="/pages/rank/rank" class="btn">
                <image src="../../static/img/sale-icon4.png"></image><text>销量排行</text>
            </navigator>
        </view>

        <ttBottomLoad class="" ref="ttBottomLoad" @sendData="getData">
            <div v-for="(item, index) in ttBottomLoad_data" :key="index">
                <list1 :list1Data="[item]" v-if="item.model == '1'"></list1>
                <list2 :list2Data="[item]" v-if="item.model == '2'"></list2>
                <list3 :list3Data="[item]" v-if="item.model == '3'"></list3>
                <list4 :list4Data="[item]" v-if="item.model == '4'"></list4>
                <list1 :list1Data="[item]" v-if="item.model == '5'"></list1>
            </div>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import bus from '@/common/bus'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import list1 from '@/components/list1/list1.vue'
import list2 from '@/components/list2/list2.vue'
import list3 from '@/components/list3/list3.vue'
import list4 from '@/components/list4/list4.vue'
export default {
    components: {
        list1,
        list2,
        list3,
        list4,
        uniIcon,
        ttBottomLoad
    },
    computed: {},
    data() {
        return {
            title: '导购',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                pageSize: 10,
                api: u.API.sale
            }
        }
    },
    methods: {
        getData(data) {
            // console.log(9988888)
            if (!this.ttBottomLoad_config.isUseMock) {
                data.forEach((item, i) => {
                    if (item.model == '1') {
                        item.img = item.img_small
                        item.url = `/pages/article/article?id=${item.id}`
                    } else if (item.model == '2') {
                        item.img = [
                            item.img_small,
                            item.img_small2,
                            item.img_small3
                        ]
                        item.url = `/pages/article/article?id=${item.id}`
                    } else if (item.model == '3') {
                        item.img = item.img_small
                        item.url = `/pages/article/article?id=${item.id}`
                    }
                })
            }
            this.ttBottomLoad_data = data
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    onLoad() {
        let that = this
        that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
    },
    onShow() {}
}
</script>

<style scoped>
.subNav {
    height: 120upx;
    border-bottom: 2upx solid #e7e7e7;
    border-top: 14upx solid #f5f5f5;
}
.subNav .btn {
    width: 186upx;
    height: 100upx;
    padding-top: 20upx;
    float: left;
    text-align: center;
    border-right: 2upx solid #e7e7e7;
}
.subNav .btn:last-child {
    border-right: 0;
}
.subNav .btn image {
    width: 40upx;
    height: 40upx;
}
.subNav .btn text {
    display: block;
    line-height: 35upx;
    font-size: 24upx;
}
</style>
