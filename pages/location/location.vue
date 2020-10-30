<template>
<div class="">
    <div class="search">
        <uni-search-bar @confirm="search" @input="input" @focus="focus" @cancel="cancel" clearButton="always" />
    </div>
    <div class="result" v-if="isFocus">
        <div class="result__item" v-for="(item, index) in searchResult" :key="index" @click="selectCity(item)">{{item.name}}</div>
    </div>

    <view class="uni-indexed-list" ref="list" id="list" v-if="!isFocus">
        <scroll-view :scroll-into-view="scrollViewId" class="uni-indexed-list__scroll" scroll-y>
            <view v-for="(item, index) in indexedData" :key="index" :id="'uni-indexed-list-' + index">
                <view class="indexedList-letter" v-if="item.children && item.children.length && item.letter.mintitle != '定'">
                    {{item.letter.title}}
                </view>
                <view class="indexedList-city" v-if="item.children && item.children.length && item.letter.mintitle != '定'">
                    <view class="indexedList-city-item" v-for="(item1, index1) in item.children" :key="index1" @click="selectCity(item1)">
                        {{item1.name}}
                    </view>
                </view>

                <view class="indexedList-location" v-if="item.children && item.children.length && item.letter.mintitle == '定'">
                    <span class="indexedList-location-tit">{{item.letter.title}}：</span>
                    <span class="indexedList-location-item" @click="selectCity(item.children[0])">{{item.children[0].name}}</span>
                </view>
            </view>
        </scroll-view>
        <view :class="touchmove ? 'uni-indexed-list__menu--active' : ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd" class="uni-indexed-list__menu" :style="{height:barHeight + 'px',marginTop:barTop + 'px'}">
            <view v-for="(item, index) in indexedData" :key="index" class="uni-indexed-list__menu-item">
                <text class="uni-indexed-list__menu-text" :class="touchmoveIndex == index ? 'uni-indexed-list__menu-text--active' : ''">{{item.letter.mintitle}}</text>
            </view>
        </view>
        <view v-if="touchmove" class="uni-indexed-list__alert-wrapper">
            <text class="uni-indexed-list__alert">{{indexedData[touchmoveIndex].letter.mintitle}}</text>
        </view>
    </view>
</div>
</template>
<script>
import u from '@/common/util'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar'
export default {
    name: 'UniIndexedList',
    components: {
        uniSearchBar
    },
    props: {},
    data() {
        return {
            title: '位置选择',
            searchVal: '',
            isFocus: false,
            indexedData: [],
            locationCity: null,
            searchResult: [],
            titleHeight: 45,
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
        function getLocationCity(success, fail) {
            // 首页 定位信息优先用缓存
            // 定位页面 定位信息优先用真实当前城市信息
            u.getNowLocationCity({
                success: function (res) {
                    success && success(res)
                },
                fail: function (error) {
                    let locationCity = uni.getStorageSync('locationCity')
                    if (locationCity) {
                        success && success(locationCity)
                    } else {
                        fail && fail('接口和缓存都获取不到定位信息')
                    }
                }
            })
        }
        function init() {
            u.request({
                url: u.API.CityList,
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    // console.log(res.data)
                    let locationCity = uni.getStorageSync('locationCity')
                    console.error(locationCity)
                    if (locationCity) {
                        that.locationCity = locationCity
                        let a = {
                            letter: {
                                title: '定位城市',
                                mintitle: '定',
                                id: 'LOCATION'
                            },
                            children: [{
                                id: locationCity.id,
                                name: locationCity.name
                            }]
                        }
                        that.indexedData = [a, ...res.data]
                        console.log(that.indexedData)
                    } else {
                        that.indexedData = res.data
                    }

                    uni.createSelectorQuery()
                    .in(that)
                    .select('#list')
                    .boundingClientRect()
                    .exec(ret => {
                        console.log(ret)
                        that.indexedListHeight = ret[0].height
                        that.barHeight = that.indexedListHeight * 0.8
                        that.barTop = that.indexedListHeight * 0.1
                        that.barItemHeight = that.barHeight / that.indexedData.length
                    })
                }
            })
        }

        getLocationCity(function (res) {
            init()
        }, function (error) {
            init()
        })
    },
    methods: {
        selectCity(data) {
            let that = this
            console.log(data)
            uni.setStorageSync('locationCity', data)
            that.back()
            // that.jump('/pages/index/index')
        },
        searchText(text) {
            let that = this
            let searchResult = []
            // console.log(that.indexedData)
            // console.log(text)
            that.indexedData.forEach((item, i) => {
                item.children.forEach((item1, i) => {
                    if (item1.name.indexOf(text) != -1 && text != '') {
                        let isin = false
                        searchResult.forEach((item2, i) => {
                            if (item2.name === item1.name && item2.id === item1.id) {
                                isin = true
                            }
                        })
                        if (!isin) {
                            searchResult.push(item1)
                        }
                    }
                })
            })
            // console.log(searchResult)
            that.searchResult = searchResult
        },
        search(res) {
            console.log('搜索')
            let that = this
            that.searchText(that.searchVal)
        },
        input(res) {
            console.log('输入')
            let that = this
            that.searchVal = res.value
            that.searchText(that.searchVal)
        },
        focus(res) {
            let that = this
            console.log('聚焦')
            this.isFocus = true
        },
        cancel(res) {
            console.log('取消')
            this.isFocus = false
        },
        touchStart(e) {
            this.touchmove = true
            let pageY = e.touches[0].pageY
            let index = Math.floor(
                (pageY - this.titleHeight - this.barTop) / this.barItemHeight
            )
            let item = this.indexedData[index]
            if (item) {
                this.scrollViewId = 'uni-indexed-list-' + index
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
                this.scrollViewId = 'uni-indexed-list-' + index
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
    width: 100%;
    height: 45px;
    position: fixed;
    left: 0px;
    top: 0px;
}

.result {
    margin-top: 45px;
}
.result__item {
    font-size: 14px;
    margin-left: 20upx;
    line-height: 45px;
    border-bottom: 1upx solid #eee;
}


.uni-indexed-list {
    position: absolute;
    left: 0;
    top: 45px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
}

.uni-indexed-list__scroll {
    flex: 1;
}

.uni-indexed-list__menu {
    width: 20px;
    /* background-color: lightgrey; */
    display: flex;
    flex-direction: column;
}

.uni-indexed-list__menu-item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.uni-indexed-list__menu-text {
    line-height: 15px;
    font-size: 12px;
    text-align: center;
    color: #aaa;
}

.uni-indexed-list__menu--active {
    /* background-color: rgb(200, 200, 200); */
}

.uni-indexed-list__menu-text--active {
    color: #007aff;
}

.uni-indexed-list__alert-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.uni-indexed-list__alert {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
}

.indexedList-letter {
    padding: 0 20upx;
    font-size: 14px;
    line-height: 30px;
    /* font-weight: bold; */
}
.indexedList-city {
    padding: 0 20upx 5px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.indexedList-city-item {
    height: 30px;
    line-height: 30px;
    width: 33.3333%;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 1upx solid #c1c1c1;
    color: #343434;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: -1upx;
    margin-top: -1upx;
    text-align: center;
    font-size: 14px;
}

.indexedList-location {
    padding: 0 20upx;
    font-size: 14px;
    line-height: 30px;
}
.indexedList-location-tit {
}
.indexedList-location-item {
    color: #10a2ff;
}
</style>