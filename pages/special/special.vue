<template>
    <view>
        <navbar :title="title"></navbar>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <div class="result">
                <a class="result__item" v-for="(item, index) in ttBottomLoad_data" :key="index" @tap="jump(`/pages/specialdetail/specialdetail?id=${item.id}`)">
                    <image class="result__item-img" :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                    <!-- <div class="result__item-r">
                        {{item.model_name}}
                    </div> -->
                    <div class="result__item-con">
                        <div class="result__item-tit">{{item.model_name}}{{item.style_name}}</div>
                        <div class="result__item-price">
                            <span style="color: #999;text-decoration: line-through;">￥{{item.price}}万</span>
                            <span>￥{{item.special_price}}万</span>
                        </div>
                    </div>
                </a>
            </div>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
export default {
    components: {
        ttBottomLoad,
    },
    computed: {},
    data() {
        return {
            title: '特价车',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.DiscountCar,
            },
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    methods: {
        getData(data) {
            this.ttBottomLoad_data = data
        }
    },
    onLoad(event) {
        let that = this
        that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
    },
    onShow() {},
}
</script>

<style scoped>

.result__item {
    display: block;
    padding: 10px 0;
    margin: 0 20upx;
    overflow: hidden;
    border-bottom: 1upx solid #e7e7e7;
}
.result__item-img {
    float: left;
    margin: 0 10px 0 0;
    width: 60px;
    height: 45px;
    background-color: #eee;
}
.result__item-con {
    overflow: hidden;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.result__item-tit {
    font-size: 14px;
    font-weight: bold;
}
.result__item-price {
    color: #f00;
    font-size: 12px;
}
.result__item-r {
    float: right;
    font-size: 12px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border: 1upx solid #d0d0d0;
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 10px;
}
.result__item-r span {
    color: #f00;
}
</style>
