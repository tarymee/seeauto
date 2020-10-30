<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="cate">
            <div class="cate__item" :class="item.select ? 'cate__item--cur' : ''" v-for="(item, index) in cateArr" :key="index" @tap="select(index)">
                <text>{{item.title}}</text>
            </div>
            <div class="cate__item-r" @tap="delAll"><uni-icon color="#999" class="" size="18" type="trash" />全部删除</div>
        </div>
        <div class="" style="height: 40px;"></div>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <div class="model" v-if="selectCate.title == '车型'">
                <div class="model-item" v-for="(item, index) in ttBottomLoad_data" :key="index">
                    <div class="model-item-img" @tap="jump(item.url)">
                        <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                    </div>
                    <div class="model-item-con" @tap="jump(item.url)">
                        <div class="model-item-tit">{{item.name}}</div>
                        <div class="model-item-des" style="color: #f00">价格：{{item.price_range}}</div>
                    </div>
                    <div class="model-item-btn" @tap="del(item, index)">删除</div>
                </div>
            </div>
            <div class="model" v-if="selectCate.title == '商铺'">
                <div class="model-item" v-for="(item, index) in ttBottomLoad_data" :key="index">
                    <div class="model-item-img" @tap="jump(item.url)">
                        <image :src="item.img" lazy-load mode="aspectFill"></image>
                    </div>
                    <div class="model-item-con" @tap="jump(item.url)">
                        <div class="model-item-tit">{{item.name}}</div>
                        <div class="model-item-des">地址：{{item.address}}</div>
                    </div>
                    <div class="model-item-btn" @tap="del(item, index)">删除</div>
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
            title: '我的收藏',
            cateArr: [
                {
                    title: '车型',
                    api: u.API.MyCollectCar,
                    delApi: u.API.MyCollectDel
                },
                {
                    title: '商铺',
                    api: u.API.MyCollectStore,
                    delApi: u.API.MyCollectDel
                }
            ],
            selectCate: {},
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false
            },
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    methods: {
        getData(data) {
            let that = this
            if (that.selectCate.title === '车型') {
                data.forEach((item, i) => {
                    item.name = item.model_name
                    item.url = `/pages/model/model?id=${item.model_id}`
                })
            } else if (that.selectCate.title === '商铺') {
                data.forEach((item, i) => {
                    item.name = item.company_name
                    item.url = `/pages/store/store?id=${item.company_id}`
                })
            }

            this.ttBottomLoad_data = data
        },
        select(index) {
            let that = this
            that.cateArr.forEach((item, i) => {
                if (index === i) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.selectCate = that.cateArr[index]

            // 重新加载
            that.ttBottomLoad_config.api = that.selectCate.api
            that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
        },
        del(item, index) {
            let that = this
            uni.showModal({
                title: '确认删除',
                content: item.name + '？',
                success(e) {
                    if (e.confirm) {
                        u.request({
                            url: that.selectCate.delApi,
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
        delAll() {
            let that = this
            uni.showModal({
                title: '确认删除',
                content: '全部' + (that.selectCate.title) + '？',
                success(e) {
                    if (e.confirm) {
                        u.request({
                            url: that.selectCate.delApi,
                            // isShowLoading: false,
                            isVerifyLogin: true,
                            data: {
                                id: that.selectCate.title == '车型' ? 'allModel' : 'allStore'
                            },
                            isUseMock: false,
                            success(res, isUseMock) {
                                if (res.code === 1) {
                                    uni.showToast({
                                        title: '全部删除成功',
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
        that.select(0)
    }
}
</script>

<style scoped>
.cate {
    width: 710upx;
    overflow: hidden;
    margin: 0 20upx;
    height: 40px;
    border-bottom: 1upx solid #e7e7e7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    /* top: 0px; */
    left: 0px;
    background-color: #fff;
    z-index: 1;
}
.cate__item {
    float: left;
    margin-right: 20upx;
}
.cate__item text {
    display: inline-block;
    margin: 0px auto;
    padding: 0 10upx;
    font-size: 15px;
    color: #333;
    line-height: 37px;
    border-bottom: 3px solid transparent;
}
.cate__item--cur {
    color: #10a2ff;
}
.cate__item--cur text {
    border-bottom: 3px solid #10a2ff;
}
.cate__item-r {
    float: right;
    line-height: 40px;
    font-size: 14px;
}



.model {
    margin: 0px 20upx;
}
.model-item {
    padding: 10px 0;
    border-bottom: 1upx solid #e7e7e7;
    position: relative;
    overflow: hidden;
}
.model-item-img {
    float: left;
    width: 100px;
    height: 75px;
    margin-right: 10px;
}
.model-item-img image {
    display: block;
    width: 100px;
    height: 75px;
    background-color: #eee;
}
.model-item-con {
    overflow: hidden;
}
.model-item-tit {
    font-size: 14px;
    height: 56px;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.model-item-des {
    font-size: 12px;
    line-height: 20px;
    color: #999;
}
.model-item-btn {
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
