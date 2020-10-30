<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="modeltop">
            <div class="modeltop-img">
                <image :src="img" lazy-load mode="widthFix"></image>
            </div>
            <a class="modeltop-pic" @tap="toPic()">
                <uni-icon color="#fff" class="" size="14" type="image" />
                <text style="margin-left: 4px;">{{imgnum}}张</text>
            </a>
        </div>
        <div class="modelcon">
            <div class="modelmain">
                <div class="modelmain-line">
                    <div class="modelmain-tit">{{title}}<text style="color: #f00;font-size: 12px;" v-if="des">{{des}}</text></div>
                    <a class="modelmain-like" @tap="collect()">
                        <uni-icon color="#999" class="" size="18" type="star" v-if="!isCollect" />
                        <uni-icon color="#999" class="" size="18" type="star-filled" v-if="isCollect" />
                    </a>
                </div>
                <div class="modelmain-price">{{price_range}}</div>
                <div class="modelmain-line">
                    <a class="modelmain-btn" @tap="toSell()">在售</a>
                    <a class="modelmain-config" @tap="toConfig()">参数配置 <uni-icon color="#999" class="" size="18" type="gear" /></a>
                </div>
            </div>
            <div class="space"></div>

            <div class="modelstyle">
                <div class="modelstyle-item" v-for="(item, index) in styles" :key="index">
                    <div class="modelstyle-tit" @tap="toStyle(item)">{{item.name}}</div>
                    <div class="modelstyle-des">排量：{{item.displacement}}；变速箱：{{item.gearbox}}；座位数：{{item.seat_num}}</div>
                    <div class="modelstyle-line">
                        <div class="modelstyle-price">{{item.range_price}}</div>
                        <a class="modelstyle-store" @tap="toStore(item)">共{{item.company_num}}个商户报价</a>
                    </div>
                </div>
            </div>

            <div class="space"></div>

            <div class="m-title" v-if="alsolikeData && alsolikeData.length">
                <div class="m-title__tit">关注本车的用户还喜欢</div>
            </div>
            <discarList :discarData="alsolikeData"></discarList>
        </div>
    </view>
</template>
<script>
import u from '@/common/util'
import discarList from '@/components/discar-list/discar-list.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        discarList,
        uniIcon
    },
    data() {
        return {
            id: '',
            title: '车型详情',
            isCollect: false,
            des: '',
            img: '',
            imgnum: '',
            price_range: '',
            styles: [],
            alsolikeData: []
        }
    },
    methods: {
        setHistoryModel(data) {
            let that = this
            let historyModel = uni.getStorageSync('historyModel') ? uni.getStorageSync('historyModel') : []
            let historyModelMax = 6
            let isin = false
            let isinindex = null
            historyModel.forEach((item, i) => {
                if (item.id === data.id) {
                    isin = true
                    isinindex = i
                }
            })
            if (isin) {
                historyModel.splice(isinindex, 1)
            }
            historyModel = [data, ...historyModel]
            if (historyModel.length > historyModelMax) {
                historyModel.length = historyModelMax
            }
            uni.setStorageSync('historyModel', historyModel)
        },
        loadDetail() {
            let that = this
            u.request({
                url: u.API.ModelDeatil,
                isVerifyLogin: false,
                data: {
                    id: that.id
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.title = res.name
                    that.img = res.thumbnail_big
                    that.imgnum = res.imgnum
                    that.price_range = res.price_range
                    that.des = res.des
                    res.styles.forEach((item, i) => {
                        if (item.lower_price || item.height_price) {
                            if (item.lower_price === item.height_price) {
                                item.range_price = `${item.lower_price}万`
                            } else {
                                item.range_price = `${item.lower_price}万-${item.height_price}万`
                            }
                        } else {
                            // item.range_price = '暂无报价'
                            item.range_price = `${item.price}万`
                        }
                    })
                    that.styles = res.styles

                    // 记录访问过的车型 在个人中心可以看到
                    that.setHistoryModel({
                        id: that.id,
                        model_name: that.title,
                        special_price: that.price_range,
                        thumbnail: that.img
                    })
                }
            })
        },
        loadAlsolike() {
            let that = this
            u.request({
                url: u.API.DiscountCar,
                isVerifyLogin: false,
                data: {
                    // id: that.id,
                    type: 2,
                    pageSize: 6,
                    pageIndex: 1
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.alsolikeData = res.data
                }
            })
        },
        toPic() {
            this.jump(`/pages/picture/picture?id=${this.id}`)
        },
        toConfig() {
            this.jump(`/pages/config/config?model_id=${this.id}`)
        },
        toSell() {
            // this.jump(`/pages/config/config?id=${this.id}`)
        },
        toStyle(obj) {
            this.jump(`/pages/style/style?id=${obj.id}`)
        },
        toStore(obj) {
            // this.jump(`/pages/config/config?id=${obj.id}`)
        },
        collect() {
            let that = this
            u.checkLogin({
                // isAutoJumpToLogin: false,
                success(token, userId, userInfo) {
                    if (that.isCollect) {
                        u.request({
                            url: u.API.MyCollectDel,
                            data: {
                                id: that.id
                            },
                            isShowLoading: false,
                            isUseMock: false,
                            success(res, isUseMock) {
                                if (res.code === 1) {
                                    that.isCollect = false
                                    uni.showToast({
                                        title: '操作成功',
                                        duration: 2000
                                    })
                                } else {
                                    uni.showToast({
                                        title: '操作失败，请重新操作！',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else {
                        u.request({
                            url: u.API.MyCollectAdd,
                            data: {
                                id: that.id,
                                type: 1, // "type"=>1,收藏类型，1为车型
                                // type: that.isCollect ? '2' : '1'
                            },
                            isShowLoading: false,
                            isUseMock: false,
                            success(res, isUseMock) {
                                if (res.code === 1) {
                                    that.isCollect = true
                                    uni.showToast({
                                        title: '收藏成功',
                                        duration: 2000
                                    })
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
        collectCheck() {
            let that = this
            u.checkLogin({
                isAutoJumpToLogin: false,
                success(token, userId, userInfo) {
                    u.request({
                        url: u.API.MyCollectCheck,
                        data: {
                            type: 1,
                            id: that.id
                        },
                        isShowLoading: false,
                        // isVerifyLogin: false,
                        isUseMock: false,
                        success(res, isUseMock) {
                            if (res.code === 1) {
                                that.isCollect = true
                            } else {
                                that.isCollect = false
                            }
                        }
                    })
                }
            })
        }
    },
    onLoad(e) {
        let that = this
        that.id = e.id

        that.loadDetail()
        that.loadAlsolike()
        that.collectCheck()
    },
    onShow() {}
}
</script>
<style scoped>
.modeltop{
    overflow: hidden;
    position: relative;
}
.modeltop-img{
    width: 750upx;
}
.modeltop-img image{
    display: block;
    width: 750upx;
    background-color: #eee;
}
.modeltop-pic{
    position: absolute;
    left: 20px;
    bottom: 40px;
    font-size: 12px;
    color: #fff;
    line-height: 25px;
    height: 25px;
    padding: 0 15px;
    border-radius: 13px;
    background-color: #0f7bcf;
}



.modelcon {
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    position: relative;
    width: 100%;
    /* top: -20px; */
    margin-top: -20px;
    z-index: 1;
}
.modelmain {
    padding: 10px 20upx;
}
.modelmain-line {
    overflow: hidden;
}
.modelmain-tit {
    float: left;
    font-size: 16px;
}
.modelmain-like {
    float: right;
}
.modelmain-btn {
    float: left;
    padding: 0 20px;
    border: 1upx solid #e0e0e0;
    line-height: 25px;
    border-radius: 13px;
    font-size: 12px;
}
.modelmain-price {
    color: #f00;
    font-size: 14px;
    margin: 5px 0;
}
.modelmain-config {
    float: right;
    color: #999;
    font-size: 12px;
}



.modelstyle {
    padding: 0px 20upx;
}
.modelstyle-item {
    padding: 10px 0px;
    border-bottom: 1upx solid #e0e0e0;
}
.modelstyle-tit {
    font-size: 16px;
}
.modelstyle-des {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
}
.modelstyle-line {
    overflow: hidden;
    margin-top: 5px;
}
.modelstyle-price {
    float: left;
    line-height: 25px;
    color: #f00;
}
.modelstyle-store {
    float: right;
    padding: 0 10px;
    border: 1upx solid #e0e0e0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 25px;
    border-radius: 3px;
    font-size: 12px;
}
</style>
