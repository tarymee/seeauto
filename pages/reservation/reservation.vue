<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="space"></div>
        <div class="cancelAll">
            <div class="cancelAll-r" @tap="cancelAll"><uni-icon color="#999" class="" size="18" type="trash" />全部取消</div>
        </div>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <div class="reservation">
                <div class="reservation-item" v-for="(item, index) in ttBottomLoad_data" :key="index">
                    <div class="reservation-item-img" @tap="jump(`/pages/store/store?id=${item.company_id}`)">
                        <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                    </div>
                    <div class="reservation-item-con">
                        <div class="reservation-item-tit" @tap="jump(`/pages/store/store?id=${item.company_id}`)">{{item.company_name}}</div>
                        <div class="reservation-item-des" style="color: #f00">
                            预约状态：
                            <span v-if="item.state == '0'">未安排</span>
                            <span v-if="item.state == '1'">已安排</span>
                            <span v-if="item.state == '2'">已完成</span>
                        </div>
                        <div class="reservation-item-des">售前电话：{{item.phone}}</div>
                        <div class="reservation-item-des">预约时间：{{item.time}}</div>
                    </div>
                    <div class="reservation-item-btn" @tap="cancel(item, index)">取消</div>
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
            title: '我的预约',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.MyDrive,
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
                content: item.company_name + '的预约？',
                success(e) {
                    // console.log(e)
                    if (e.confirm) {
                        u.request({
                            url: u.API.MyDriveDel,
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
                content: '全部预约？',
                success(e) {
                    // console.log(e)
                    if (e.confirm) {
                        u.request({
                            url: u.API.MyDriveDel,
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
.reservation {
    margin: 0px 20upx;
}
.reservation-item {
    padding: 10px 0;
    border-bottom: 1upx solid #e7e7e7;
    position: relative;
    overflow: hidden;
}
.reservation-item-img {
    float: left;
    width: 100px;
    height: 75px;
    margin-right: 10px;
}
.reservation-item-img image {
    display: block;
    width: 100px;
    height: 75px;
    background-color: #eee;
}
.reservation-item-con {
    overflow: hidden;
}
.reservation-item-tit {
    font-size: 14px;
}
.reservation-item-des {
    font-size: 12px;
    color: #999;
}
.reservation-item-btn {
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
