<template>
    <div class="">
        <view class="indexed-list" ref="list" id="list">
            <scroll-view :scroll-into-view="scrollViewId" class="indexed-list__scroll" scroll-y>
                <div class="search" id="indexed-list-0">
                    <a class="search-location" @tap="jump(`/pages/location/location`)">
                        <uni-icon color="#10A2FF" class="" size="18" type="location-filled" />
                        {{locationCity.name}}
                    </a>
                    <a class="search-input" @tap="jump(`/pages/search/search`)">
                        <uni-icon color="#999999" class="" size="18" type="search" />
                        搜索产品
                    </a>
                </div>

                <view class="subNav" id="indexed-list-1">
                    <navigator url="/pages/select/select" class="btn">
                        <image src="/static/img/auto-icon1.png" lazy-load></image><text>条件选车</text>
                    </navigator>
                    <navigator url="/pages/special/special" class="btn">
                        <image src="/static/img/auto-icon2.png" lazy-load></image><text>特价车型</text>
                    </navigator>
                    <navigator url="/pages/nearbystore/nearbystore" class="btn">
                        <image src="/static/img/auto-icon3.png" lazy-load></image><text>附近商家</text>
                    </navigator>
                    <navigator url="/pages/activity/activity" class="btn">
                        <image src="/static/img/auto-icon4.png" lazy-load></image><text>促销活动</text>
                    </navigator>
                </view>

                <brandList :brandData="brandData"></brandList>

                <priceList :priceData="priceData"></priceList>

                <div class="m-title" v-if="discarData && discarData.length" id="indexed-list-2">
                    <div class="m-title__tit">特价车</div>
                </div>

                <discarList :discarData="discarData" :style2="true"></discarList>

                <view v-for="(item, index) in indexedData" :key="index" :id="'indexed-list-' + index" v-if="item.children && item.children.length" class="indexedList">
                    <view class="indexedList-letter">
                        {{item.letter.title}}
                    </view>
                    <uni-list>
                        <uni-list-item :title="item1.title" :thumb="item1.img" @click="jump(item1.url)" v-for="(item1, index1) in item.children" :key="index1" showArrow="false" style="font-size: 14px;"></uni-list-item>
                    </uni-list>
                </view>
            </scroll-view>
            <view :class="touchmove ? 'indexed-list__menu--active' : ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd" class="indexed-list__menu" :style="{height:barHeight + 'px',marginTop:barTop + 'px'}">
                <view v-for="(item, index) in indexedData" :key="index" class="indexed-list__menu-item">
                    <text class="indexed-list__menu-text" :class="touchmoveIndex == index ? 'indexed-list__menu-text--active' : ''">{{item.letter.mintitle || item.letter.title}}</text>
                </view>
            </view>
            <view v-if="touchmove" class="indexed-list__alert-wrapper">
                <text class="indexed-list__alert">{{indexedData[touchmoveIndex].letter.mintitle || indexedData[touchmoveIndex].letter.title}}</text>
            </view>
        </view>
    </div>
</template>
<script>
import u from '@/common/util'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import discarList from '@/components/discar-list/discar-list.vue'
import brandList from '@/components/brand-list/brand-list.vue'
import priceList from '@/components/price-list/price-list.vue'
export default {
    name: 'UniIndexedList',
    components: {
        uniSearchBar,
        uniIcon,
        uniList,
        uniListItem,
        discarList,
        brandList,
        priceList
    },
    props: {},
    data() {
        return {
            title: '看车',
            locationCity: {
                name: '',
                id: ''
            },
            indexedData: [],
            discarData: [],
            brandData: [],
            priceData: [
                {
                    id: '43',
                    name: '8-10万',
                    url: '/pages/modellist/modellist?price=43&title=8-10万',
                },
                {
                    id: '44',
                    name: '10-15万',
                    url: '/pages/modellist/modellist?price=44&title=10-15万',
                },
                {
                    id: '45',
                    name: '15-20万',
                    url: '/pages/modellist/modellist?price=45&title=15-20万',
                },
                {
                    id: '94',
                    name: '20-25万',
                    url: '/pages/modellist/modellist?price=94&title=20-25万',
                }
            ],
            titleHeight: 0,
            indexedListHeight: 0,
            barHeight: 0,
            barTop: 0,
            barItemHeight: 0,
            touchmove: false,
            touchmoveIndex: -1,
            scrollViewId: ''
        }
    },
    onLoad() {
        let that = this
        function init() {
            u.request({
                url: u.API.BrandList,
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    if (!isUseMock) {
                        res.data.forEach((item, i) => {
                            item.letter.title = item.letter.initials
                            item.letter.mintitle = item.letter.initials
                            if (item.children && item.children.length) {
                                item.children.forEach((item2, i) => {
                                    item2.img = item2.brand_logo
                                    item2.title = item2.brand_name
                                    item2.id = item2.id
                                    item2.url = `/pages/modellist/modellist?brand_id=${item2.id}&title=${item2.title}`
                                })
                            }
                        })
                    }
                    let a = [
                        {
                            letter: {
                                title: '搜',
                                mintitle: '搜'
                            }
                        },
                        {
                            letter: {
                                title: '选',
                                mintitle: '选'
                            }
                        },
                        {
                            letter: {
                                title: '热',
                                mintitle: '热'
                            }
                        }
                    ]
                    that.indexedData = [...a, ...res.data]
                    console.log(that.indexedData)

                    uni.createSelectorQuery()
                        .in(that)
                        .select('#list')
                        .boundingClientRect()
                        .exec(ret => {
                            console.log(ret)
                            that.indexedListHeight = ret[0].height
                            that.barHeight = that.indexedListHeight * 0.8
                            that.barTop = that.indexedListHeight * 0.1
                            that.barItemHeight =
                                that.barHeight / that.indexedData.length
                        })

                    that.loadDiscar()
                    that.loadBrand()
                    that.loadPrice()

                }
            })
        }
        u.getCacheLocationCity({
            success: function (res) {
                that.locationCity = res
                init()
            }
        })
    },
    onShow() {
        var that = this

        // 首页 定位信息优先用缓存
        // 定位页面 定位信息优先用真实当前城市信息
        u.getCacheLocationCity({
            success: function (res) {
                that.locationCity = res
            }
        })

    },
    methods: {
        loadDiscar() {
            let that = this
            u.request({
                url: u.API.DiscountCar,
                isVerifyLogin: false,
                isUseMock: false,
                data: {
                    type: 2,
                    pageIndex: 1,
                    pageSize: 6
                },
                success(res, isUseMock) {
                    that.discarData = res.data
                }
            })
        },
        loadBrand() {
            let that = this
            u.request({
                url: u.API.Brand,
                isVerifyLogin: false,
                data: {
                    hot: 1,
                    pageIndex: 1,
                    pageSize: 5
                },
                isUseMock: false,
                success(res, isUseMock) {
                    if (res.data.length > 5) {
                        res.data.length = 5
                    }
                    res.data.forEach((item, i) => {
                        item.url = `/pages/modellist/modellist?brand_id=${item.id}&title=${item.brand_name}`
                    })
                    that.brandData = res.data
                }
            })
        },
        loadPrice() {
            let that = this
            u.request({
                url: u.API.Index,
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    res.data.price.forEach((item, i) => {
                        item.url = `/pages/modellist/modellist?price=${item.id}&title=${item.name}`
                    })
                    // that.priceData = res.data.price
                }
            })
        },
        touchStart(e) {
            this.touchmove = true
            let pageY = e.touches[0].pageY
            let index = Math.floor(
                (pageY - this.titleHeight - this.barTop) / this.barItemHeight
            )
            let item = this.indexedData[index]
            if (item) {
                this.scrollViewId = 'indexed-list-' + index
                this.touchmoveIndex = index
            }
        },
        touchMove(e) {
            let pageY = e.touches[0].pageY
            let index = Math.floor(
                (pageY - this.titleHeight - this.barTop) / this.barItemHeight
            )
            if (this.touchmoveIndex === index) {
                return false
            }
            let item = this.indexedData[index]
            if (item) {
                this.scrollViewId = 'indexed-list-' + index
                this.touchmoveIndex = index
            }
        },
        touchEnd() {
            this.touchmove = false
            this.touchmoveIndex = -1
        }
    }
}
</script>
<style scoped>
.search {
    background-color: #ededed;
    padding: 10px 20upx;
    /* width: 710upx; */
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    vertical-align: top;
    font-size: 14px;
    /* position: fixed; */
    /* left: 0px; */
    /* top: 0px; */
    z-index: 1;
}
.search-space {
    height: 45px;
}
.search image {
    width: 15px;
    height: 25px;
    vertical-align: top;
}
.search-location {
    float: left;
    color: #10a2ff;
    margin-right: 10px;
    max-width: 80px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}
.search-input {
    overflow: hidden;
    border-radius: 3px;
    background-color: #fff;
    color: #ccc;
    padding: 0 5px;
}

.subNav {
    overflow: hidden;
    /* border-left: 1upx solid #e7e7e7;
    border-right: 1upx solid #e7e7e7; */
}
.subNav .btn {
    width: 25%;
    float: left;
    text-align: center;
    padding: 10px 0;
    border: 1upx solid #e7e7e7;
    border-left: 0upx solid #e7e7e7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.subNav .btn:last-child {
    border-right: 0;
}
.subNav .btn image {
    display: block;
    width: 40upx;
    height: 40upx;
    margin: 0px auto;
}
.subNav .btn text {
    display: block;
    font-size: 12px;
}




.indexed-list {
    position: absolute;
    left: 0;
    top: 0px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
}

.indexed-list__scroll {
    flex: 1;
}

.indexed-list__menu {
    width: 20px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0px;
}

.indexed-list__menu-item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.indexed-list__menu-text {
    line-height: 15px;
    font-size: 12px;
    text-align: center;
    color: #aaa;
}

.indexed-list__menu--active {
    /* background-color: rgb(200, 200, 200); */
}

.indexed-list__menu-text--active {
    color: #007aff;
}

.indexed-list__alert-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.indexed-list__alert {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
}
.indexedList {
    margin-right: 20px;
}
.indexedList-letter {
    padding: 0 20upx;
    font-size: 14px;
    line-height: 30px;
    /* font-weight: bold; */
}
</style>
<style>
.indexedList .uni-list-item__content-title {
    font-size: 14px!important;
}
</style>