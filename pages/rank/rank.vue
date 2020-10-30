<template>
    <view class="rankPage">
        <!-- <navbar :title="title" ref="navbar" styleType="1"></navbar> -->
        <div class="rankBanner">
            <image src="/static/img/rank-bg.png" mode="aspectFill"></image>
            <div class="rankBanner-time" @tap="toggleTime()">{{selectTimeText}}</div>
        </div>

        <div class="cate__place" :class="cateFixed ? 'cate__place--holder' : ''"></div>
        <div class="cate" :class="cateFixed ? 'cate--fixed' : ''">

            <div class="cate1">
                <a class="cate1__item" :class="item.select ? 'cate1__item--cur' : ''" v-for="(item, index) in cateData" :key="index" @tap="selectCate1(index)">
                    <text>{{item.name}}</text>
                </a>
                <div class="cate1__time" @tap="toggleTime()" v-if="cateFixed">{{selectTimeText}}</div>
            </div>

            <div class="cate2">
                <scroll-view scroll-x>
                    <a class="cate2__item" :class="item.select ? 'cate2__item--cur' : ''" v-for="(item, index) in cateData[selectCate1Index].children" :key="index" @tap="selectCate2(index)" v-if="cateData[selectCate1Index].children && cateData[selectCate1Index].children.length">
                        <text>{{item.name}}</text>
                    </a>
                </scroll-view>
            </div>

            <div class="timeMod" v-if="isShowTime" :class="cateFixed ? 'timeMod--fixed' : ''">
                <a class="timeMod-item" :class="item.select ? 'timeMod-item--cur' : ''" @tap="selectTime(index)" v-for="(item, index) in timeData" :key="index">
                    <text>{{item.time}}</text>
                </a>
            </div>
        </div>
        <ttBottomLoad class="" ref="ttBottomLoad" @sendData="getData">
            <div class="rank">
                <a class="rank__item" v-for="(item, index) in ttBottomLoad_data" :key="index" @tap="jump(`/pages/model/model?id=${item.id}`)">
                    <div class="rank__item-rank">
                        <div class="rank__item-rank-numImg" v-if="item.order_num == '1' || item.order_num == '2' || item.order_num == '3'">
                            <image src="/static/img/rank-1.png" mode="aspectFill" v-if="item.order_num == '1'"></image>
                            <image src="/static/img/rank-2.png" mode="aspectFill" v-if="item.order_num == '2'"></image>
                            <image src="/static/img/rank-3.png" mode="aspectFill" v-if="item.order_num == '3'"></image>
                        </div>
                        <div class="rank__item-rank-num" v-if="item.order_num != '1' && item.order_num != '2' && item.order_num != '3'">
                            <text v-if="item.order_num != '1' && item.order_num != '2' && item.order_num != '3'">{{item.order_num}}</text>
                        </div>
                        <div class="rank__item-rank-status" v-if="item.order_num != '1' && item.order_num != '2' && item.order_num != '3'">
                            <text v-if="Number(item.statuscount) > 0" style="color: red">&uarr;{{Math.abs(item.statuscount)}}</text>
                            <text v-if="Number(item.statuscount) < 0" style="color: green">&darr;{{Math.abs(item.statuscount)}}</text>
                            <text v-if="Number(item.statuscount) == 0" style="color: gray">--</text>
                        </div>
                    </div>
                    <image class="rank__item-img" :src="item.thumbnail" mode="aspectFill"></image>
                    <div class="rank__item-r">
                        <div class="rank__item-count">{{item.sale_num}}</div>
                        <div class="rank__item-des">{{item.city}}</div>
                    </div>
                    <div class="rank__item-con">
                        <div class="rank__item-tit">{{item.name}}</div>
                        <div class="rank__item-price">{{item.price_range}}</div>
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
        ttBottomLoad
    },
    data() {
        return {
            title: '排行榜',
            cateData: [],
            isShowTime: false,
            selectTimeText: '',
            timeData: [],
            cateFixedHeight: 125,
            cateFixed: false,
            selectCate1Index: 0,
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.RankList,
                params: {}
            }
        }
    },
    methods: {
        getData(data) {
            // console.log(data)
            this.ttBottomLoad_data = data
        },
        toggleTime() {
            this.isShowTime = !this.isShowTime
        },
        selectTime(index) {
            let that = this
            that.isShowTime = false
            that.timeData.forEach((item, i) => {
                if (index === i) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.selectTimeText = that.timeData[index].time
            // 重新请求数据
            if (that.cateFixed) {
                uni.pageScrollTo({
                    scrollTop: that.cateFixedHeight,
                    duration: 300
                })
            }
            that.ttBottomLoad_config.params.time = that.selectTimeText
            that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
        },
        selectCate1(index) {
            let that = this
            let data = that.cateData[index]
            that.cateData.forEach((item, i) => {
                if (data.name === item.name) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.selectCate1Index = index
            that.selectCate2(0)
        },
        selectCate2(index) {
            let that = this
            that.cateData[that.selectCate1Index].children.forEach((item, i) => {
                if (index === i) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            if (that.cateFixed) {
                uni.pageScrollTo({
                    scrollTop: that.cateFixedHeight,
                    duration: 300
                })
            }
            console.log(that.selectTimeText)
            that.ttBottomLoad_config.params.level_a = that.cateData[that.selectCate1Index].id
            that.ttBottomLoad_config.params.level_b = that.cateData[that.selectCate1Index].children[index].id
            that.ttBottomLoad_config.params.year = that.selectTimeText.split('-')[0]
            that.ttBottomLoad_config.params.month = that.selectTimeText.split('-')[1]
            // that.ttBottomLoad_config.params.time = that.selectTimeText
            that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
        },
        test() {
            this.$refs.navbar.changeStyle(2)
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    onPageScroll(e) {
        // console.log('页面滚动', e)
        let that = this
        let view = uni.createSelectorQuery().select('.cate__place')
        view.boundingClientRect(data => {
            // console.log("得到布局位置信息" + JSON.stringify(data))
            // console.log("节点离页面顶部的距离为" + data.top)
            if (data.top <= 0) {
                that.cateFixed = true
            } else {
                that.cateFixed = false
            }
        }).exec()
    },
    onLoad() {
        var that = this
        // that.navbarInfo = u.getNavbarInfo()

        // 加载导航数据 之后选中导航第一个 加载子导航排行
        u.request({
            url: u.API.RankData,
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                // console.log(res.data)
                that.cateData = res.cateData
                that.timeData = res.timeData
                that.selectTimeText = that.timeData[0].time
                that.timeData[0].select = true
                that.selectCate1(0)
            }
        })



    },
    onShow() {}
}
</script>

<style scoped>
.rankPage {
    min-height: calc(100vh + 195px);
}
.rankBanner {
    width: 100%;
    height: 115px;
    position: relative;
}
.rankBanner image {
    display: block;
    width: 100%;
    height: 115px;
}
.rankBanner-time {
    background-color: #fff;
    height: 20px;
    line-height: 20px;
    color: #333;
    font-size: 12px;
    width: 90px;
    position: absolute;
    top: 75px;
    left: 150upx;
    border-radius: 10px;
    text-align: center;
}




.cate {
    width: 100%;
    position: relative;
}
.cate__place {
    height: 0;
}
.cate__place--holder {
    height: 80px;
}
.cate--fixed {
    position: fixed;
    top: 0px;
}

.cate1 {
    /* background-color: #fff; */
    width: 100%;
    overflow: hidden;
    background-color: #eee;
    /* border-bottom: 1upx solid #eee; */
}
.cate1__item {
    float: left;
    margin: 0 15px;
    text-align: center;
    height: 40px;
    overflow: hidden;
}
.cate1__item text {
    display: inline-block;
    font-size: 16px;
    color: #333;
    line-height: 30px;
    margin-top: 5px;
    border-bottom: 3px solid transparent;
}
.cate1__item--cur {
    color: #10a2ff;
}
.cate1__item--cur text {
    border-bottom: 3px solid #10a2ff;
}
.cate1__time {
    float: right;
    background-color: #fff;
    height: 20px;
    line-height: 20px;
    color: #333;
    font-size: 12px;
    width: 90px;
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 15px;
    text-align: center;
}



.cate2 {
    background-color: #fff;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px #fef4f3;
}
.cate2 scroll-view {
    white-space: nowrap;
}
.cate2__item {
    display: inline-block;
    margin: 10px 0px 10px 15px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
}
.cate2__item text {
    display: inline-block;
    color: #333;
    background-color: #e6e6e6;
    border-radius: 10px;
    padding: 0 10px;
}
.cate2__item--cur text {
    background-color: #10a2ff;
    color: #ffffff;
}


/* 时间模块 */
.timeMod {
    width: 100%;
    padding: 10px 20upx;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    border-bottom: 1px solid #eee;
}
.timeMod--fixed {
    top: 40px;
}
.timeMod-item {
    width: 28.33%;
    /* padding: 5px 0; */
    margin: 7px 2.5%;
    background-color: #e6e6e6;
    color: #333;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
}
.timeMod-item--cur {
    background-color: #10a2ff;
    color: #fff;
}
.timeMod-item text {
    display: block;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
}






/* .rank {
    min-height: 0px;
} */
.rank__item {
    display: block;
    padding: 10px 0;
    margin: 0 20upx;
    overflow: hidden;
    border-bottom: 1upx solid #e7e7e7;
}
.rank__item-rank {
    float: left;
    width: 40px;
    text-align: center;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.rank__item-rank-num {
    font-weight: bold;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
}
.rank__item-rank-numImg {
    display: block;
    width: 25px;
    height: 25px;
    margin: 0px auto;
}
.rank__item-rank-numImg image {
    display: block;
    width: 25px;
    height: 25px;
}

.rank__item-rank-status {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    overflow: hidden;
}

.rank__item-img {
    float: left;
    margin: 0 10px;
    width: 80px;
    height: 60px;
}
.rank__item-con {
    overflow: hidden;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.rank__item-tit {
    font-size: 16px;
    font-weight: bold;
}
.rank__item-price {
    color: #f60;
    font-size: 12px;
}
.rank__item-r {
    float: right;
    font-size: 12px;
    text-align: center;
    width: 55px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.rank__item-count {
    font-weight: bold;
    font-size: 14px;
}
.rank__item-des {
    color: #999;
    font-size: 12px;
}
</style>
