<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="space"></div>
        <div class="cancelAll">
            <div class="cancelAll-r" @tap="cancelAll">
                <uni-icon color="#999" class="" size="18" type="trash" /> 全部取消</div>
        </div>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <div class="ask">
                <div class="ask-item" v-for="(item, index) in ttBottomLoad_data" :key="index">
                    <div class="ask-item-img" @tap="jump(`/pages/style/style?id=${item.style_id}`)">
                        <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                    </div>
                    <div class="ask-item-con">
                        <div class="ask-item-tit" @tap="jump(`/pages/style/style?id=${item.style_id}`)">{{item.model_name}}{{item.style_name}}</div>
                        <div class="ask-item-des">指导价：{{item.price}}万<text style="color: #f00;margin-left: 10px;float: right">商家底价：{{item.company_price}}万</text></div>
                        <div class="ask-item-des" @tap="jump(`/pages/store/store?id=${item.company_id}`)">
                            <uni-icon color="#999" class="" size="18" type="person" />{{item.company_name}}
                        </div>
                    </div>
                    <div class="ask-item-btn" @tap="cancel(item, index)">取消</div>
                </div>
            </div>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        ttBottomLoad,
        uniIcon
    },
    computed: {},
    data() {
        return {
            title: '我的询价',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.MyPrice,
                params: {}
            }
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    methods: {
        getData(data) {
            this.ttBottomLoad_data = data
        },
        cancel(item, index) {
            let that = this
            uni.showModal({
                title: '确认取消',
                content: item.company_name + '的询价？',
                success(e) {
                    // console.log(e)
                    if (e.confirm) {
                        u.request({
                            url: u.API.MyPriceDel,
                            // isShowLoading: false,
                            isVerifyLogin: true,
                            data: {
                                id: item.id
                            },
                            isUseMock: false,
                            success(res, isUseMock) {
                                if (res.code === 1) {
                                    uni.showToast({
                                        title: '操作成功',
                                        duration: 2000
                                    })
                                    that.ttBottomLoad_data.splice(index, 1)
                                } else {
                                    uni.showToast({
                                        title: '操作失败，请重新操作！',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
        cancelAll() {
            let that = this
            uni.showModal({
                title: '确认取消',
                content: '全部询价？',
                success(e) {
                    // console.log(e)
                    if (e.confirm) {
                        u.request({
                            url: u.API.MyPriceDel,
                            // isShowLoading: false,
                            isVerifyLogin: true,
                            data: {
                                id: 'all'
                            },
                            isUseMock: false,
                            success(res, isUseMock) {
                                if (res.code === 1) {
                                    uni.showToast({
                                        title: '操作成功',
                                        duration: 2000
                                    })
                                    // that.ttBottomLoad_data = []
                                    that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
                                } else {
                                    uni.showToast({
                                        title: '操作失败，请重新操作！',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    },
    onLoad() {
        let that = this
        that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
    }
}
</script>

<style scoped>
.cancelAll {
    overflow: hidden;
    margin: 0 20upx;
}
.cancelAll-r {
    line-height: 30px;
    float: right;
    color: #999;
}
.ask {
    margin: 0px 20upx;
}
.ask-item {
    padding: 10px 0;
    border-bottom: 1upx solid #e7e7e7;
    position: relative;
    overflow: hidden;
}
.ask-item-img {
    float: left;
    width: 100px;
    height: 75px;
    margin-right: 10px;
}
.ask-item-img image {
    display: block;
    width: 100px;
    height: 75px;
    background-color: #eee;
}
.ask-item-con {
    overflow: hidden;
}
.ask-item-tit {
    font-size: 14px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.ask-item-des {
    font-size: 12px;
    color: #999;
    overflow: hidden;
}
.ask-item-btn {
    padding: 0 10px;
    border: 1upx solid #e7e7e7;
    line-height: 18px;
    height: 18px;
    font-size: 12px;
    color: #adadad;
    position: absolute;
    right: 0px;
    bottom: 10px;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
