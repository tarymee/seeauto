<template>
    <view>
        <navbar :title="title"></navbar>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <div class="result">
                <a class="result__item" v-for="(item, index) in ttBottomLoad_data" :key="index" @tap="jump(`/pages/model/model?id=${item.id}`)">
                    <image class="result__item-img" :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                    <div class="result__item-r">
                        共<span>{{item.dealer_num}}</span>个商户在售
                    </div>
                    <div class="result__item-con">
                        <div class="result__item-tit">{{item.model_name}}</div>
                        <div class="result__item-price">{{item.price_range}}</div>
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
            title: '车型列表页',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.IndexSeach,
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
        console.log(event)

        // 按品牌
        if (event.brand_id) {
            that.ttBottomLoad_config.params = {
                brand_id: event.brand_id
            }
        }

        // 按价格
        if (event.price) {
            that.ttBottomLoad_config.params = {
                price: event.price
            }
        }

        // 按级别
        // level_a"=>轿车、mpv "level_b"=>紧凑型
        if (event.level_a && event.level_b) {
            that.ttBottomLoad_config.params = {
                level_a: event.level_a,
                level_b: event.level_b
            }
        }

        that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)

        if (event.title) {
            that.title = event.title
            uni.setNavigationBarTitle({
                title: that.title
            })
        }
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
