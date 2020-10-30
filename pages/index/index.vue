<template>
    <div>
        <!-- <navbar :title="title" isShowLogo="true"></navbar> -->

        <!-- <div class="search" :style="{'top':navbarInfo.navHeight + 'px'}"> -->
        <div class="search">
            <a class="search-location" @tap="jump(`/pages/location/location`)">
                <uni-icon color="#10A2FF" class="" size="18" type="location-filled" />
                {{locationCity.name}}
            </a>
            <a class="search-input" @tap="jump(`/pages/search/search`)">
                <uni-icon color="#999999" class="" size="18" type="search" />
                搜索产品
            </a>
        </div>
        <div class="search-space"></div>

        <div class="cate">
            <div class="cate__item" :class="item.select ? 'cate__item--cur' : ''" v-for="(item, index) in cateArr" :key="index" @tap="selectCate(item.title)">
                <text>{{item.title}}</text>
            </div>
        </div>

        <div class="" style="height: 150px; overflow: hidden;" v-if="cateType == '按品牌'">
            <brandList :brandData="brand"></brandList>
        </div>

        <div class="" style="height: 150px; overflow: hidden;" v-if="cateType == '按价格'">
            <priceList :priceData="price"></priceList>
        </div>

        <div class="level" v-if="cateType == '按级别'">
            <div class="level-line" v-for="(item, index) in level" :key="index">
                <div class="level-line-tit">
                    <div class="level-line-tit-con">
                    <image :src="item.img" mode="aspectFill" v-if="item.img"></image>{{item.name}}
                    </div>
                </div>
                <a class="level-line-item" @tap="jump(`/pages/modellist/modellist?level_a=${item.id}&level_b=${item1.id}&title=${item.name}-${item1.name}`)" v-if="item.lower_level" v-for="(item1, index1) in item.lower_level" :key="index1">
                    {{item1.name}}
                </a>
            </div>
        </div>

        <div class="" style="height: 150px; overflow: hidden;" v-if="cateType == '新能源'">
            <priceList :priceData="newenergy"></priceList>
        </div>

        <swiper v-if="focus.length > 0" class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="300" circular>
            <block v-for="(item, index) in focus" :key="index">
                <swiper-item class="swiper__item">
                    <image class="swiper__img" lazy-load :src="item.img" mode="aspectFill" @tap="jump(item.url)"></image>
                </swiper-item>
            </block>
        </swiper>

        <div class="m-title">
            <div class="m-title__tit" @tap="jump(`/pages/search/search?search=奥迪`)">特价车</div>
            <a class="m-title__r" @tap="loadDiscountCar()">
                <uni-icon color="#10a2ff" class="" size="18" type="reload" /> 换一换
            </a>
        </div>
        <div class="proscroll">
            <scroll-view scroll-x :scroll-left="scrollLeft" @scroll="scroll" scroll-with-animation>
                <discarList :discarData="discarData"></discarList>
            </scroll-view>
        </div>

        <div class="space"></div>

        <ttBottomLoad class="" ref="ttBottomLoad" @sendData="getData">
            <div v-for="(item, index) in ttBottomLoad_data" :key="index">
                <list1 :list1Data="[item]" v-if="item.model == '1'"></list1>
                <list2 :list2Data="[item]" v-if="item.model == '2'"></list2>
                <list3 :list3Data="[item]" v-if="item.model == '3'"></list3>
                <list4 :list4Data="[item]" v-if="item.model == '4'"></list4>
                <list1 :list1Data="[item]" v-if="item.model == '5'"></list1>
            </div>
        </ttBottomLoad>

    </div>
</template>
<style scoped lang="scss">
.search {
    background-color: #ededed;
    padding: 10px 20upx;
    width: 710upx;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    vertical-align: top;
    font-size: 14px;
    position: fixed;
    left: 0px;
    top: 0px;
    // top: 64px;
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
    // text-align: center;
    padding: 0 5px;
}

// 分类
.cate {
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    border-top: 1upx solid #eee;
    border-bottom: 1upx solid #eee;
}
.cate__item {
    float: left;
    width: 20%;
    text-align: center;
    height: 45px;
    overflow: hidden;
    // background-color: #eee;
}
.cate__item text {
    display: inline-block;
    margin: 0px auto;
    font-size: 15px;
    color: #333;
    line-height: 42px;
    border-bottom: 3px solid transparent;
}
.cate__item--cur {
    color: #10a2ff;
}
.cate__item--cur text {
    border-bottom: 3px solid #10a2ff;
}

/* 价格 新能源 */
.level {
    margin: 5px 20upx;
    overflow: hidden;
    height: 140px;
}
.level-line {
    height: 35px;
    line-height: 35px;
    padding: 5px 0;
    overflow: hidden;
}
.level-line-tit {
    display: block;
    padding-right: 25upx;
    height: 35px;
    overflow: hidden;
    font-size: 12px;
    line-height: 15px;
    float: left;
    text-align: center;
}
.level-line-tit-con {
    border-right: 1upx solid #eee;
}
.level-line-tit image {
    display: block;
    width: 35px;
    height: 20px;
    padding: 0 20upx;
}
.level-line-item {
    display: block;
    padding-right: 25upx;
    height: 35px;
    overflow: hidden;
    font-size: 12px;
    float: left;
}


/* 特价车滚动 */
.proscroll {
    // margin: 0 20upx 0 0;
}
.proscroll scroll-view {
    white-space: nowrap;
}
</style>

<script>
import u from '@/common/util'
import bus from '@/common/bus'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import list1 from '@/components/list1/list1.vue'
import list2 from '@/components/list2/list2.vue'
import list3 from '@/components/list3/list3.vue'
import list4 from '@/components/list4/list4.vue'
import discarList from '@/components/discar-list/discar-list.vue'
import brandList from '@/components/brand-list/brand-list.vue'
import priceList from '@/components/price-list/price-list.vue'
export default {
    components: {
        list1,
        list2,
        list3,
        list4,
        uniIcon,
        ttBottomLoad,
        discarList,
        brandList,
        priceList
    },
    mixins: [],
    computed: {},
    data() {
        return {
            title: '首页',
            locationCity: {
                name: '',
                id: ''
            },
            cateType: '按品牌',
            cateArr: [
                {
                    title: '按品牌',
                    select: true
                },
                {
                    title: '按价格',
                    select: false
                },
                {
                    title: '按级别',
                    select: false
                },
                {
                    title: '新能源',
                    select: false
                },
                {
                    title: '销量排行',
                    select: false
                }
            ],
            navbarInfo: {},
            focus: [],
            scrollLeft: 0,
            discarData: [
                {
                    id: '',
                    thumbnail: '',
                    model_name: '',
                    style_name: '',
                    price: '',
                    special_price: ''
                },
                {
                    id: '',
                    thumbnail: '',
                    model_name: '',
                    style_name: '',
                    price: '',
                    special_price: ''
                },
                {
                    id: '',
                    thumbnail: '',
                    model_name: '',
                    style_name: '',
                    price: '',
                    special_price: ''
                }
            ],
            discarConfig: {
                pageIndex: 1,
                pageSize: 6,
                pageTotal: 1,
            },
            brand: [
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                },
                {
                    brand_logo: '',
                    brand_name: ''
                }
            ],
            price: [],
            level: [],
            power_type: '',
            newenergy: [],
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                // isUseMock: true,
                pageSize: 8,
                api: u.API.IndexList
            }
        }
    },
    methods: {
        scroll: function(e) {
            var that = this
            that.scrollLeft = e.detail.scrollLeft
        },
        getData(data) {
            let that = this
            if (!that.ttBottomLoad_config.isUseMock) {
                data.forEach((item, i) => {
                    if (item.model == '1') {
                        item.img = item.img_small
                        item.url = `/pages/article/article?id=${item.id}`
                    } else if (item.model == '2') {
                        item.img = [item.img_small, item.img_small2, item.img_small3]
                        item.url = `/pages/article/article?id=${item.id}`
                    } else if (item.model == '3') {
                        item.img = item.img_small
                        item.url = `/pages/article/article?id=${item.id}`
                    } else if (item.model == '4') {
                        item.title = item.company_name
                        item.img = item.company_logo
                        item.near = item.company_distance
                        item.type_name = item.city_name
                        item.company_brand.forEach((item1, i) => {
                            item1.img = item1.brand_logo
                            item1.name = item1.brand_name
                        })
                        item.sell = item.company_brand
                        item.url = `/pages/store/store?id=${item.company_id}`
                    } else if (item.model == '5') {
                        item.img = item.img
                        item.title = item.title
                        item.url = `/pages/activitydetail/activitydetail?id=${item.id}`
                    }
                })
            }
            that.ttBottomLoad_data = data
        },
        loadDiscountCar() {
            var that = this
            that.scrollLeft = 0
            u.request({
                url: u.API.DiscountCar,
                isVerifyLogin: false,
                isUseMock: false,
                data: {
                    type: 2,
                    pageIndex: that.discarConfig.pageIndex,
                    pageSize: that.discarConfig.pageSize
                },
                success(res, isUseMock) {
                    that.discarData = res.data

                    that.discarConfig.pageTotal = Number(res.pageTotal)
                    that.discarConfig.pageIndex++

                    if (that.discarConfig.pageTotal === 0) {
                        that.discarConfig.pageIndex = 1
                    } else if (that.discarConfig.pageIndex > that.discarConfig.pageTotal) {
                        that.discarConfig.pageIndex = 1
                    } else {
                        
                    }
                }
            })
        },
        selectCate(title) {
            let that = this
            console.log(title)
            if (title === '销量排行') {
                that.jump('/pages/rank/rank')
            } else {
                that.cateArr.forEach((item, i) => {
                    if (title === item.title) {
                        item.select = true
                    } else {
                        item.select = false
                    }
                })
                that.cateType = title
            }
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    onShow() {
        // console.log('onShow')
        var that = this

        // 首页 定位信息优先用缓存
        // 定位页面 定位信息优先用真实当前城市信息
        u.getCacheLocationCity({
            success: function (res) {
                that.locationCity = res
            }
        })

    },
    onShareAppMessage() {
        let that = this
        let obj = {
            title: '看车网',
            path: `/pages/index/index`
        }
        return obj
    },
    onLoad() {
        // console.log('onLoad')
        var that = this

        that.navbarInfo = u.getNavbarInfo()

        // 价格 等级
        u.request({
            url: u.API.Index,
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                if (isUseMock) {
                    that.focus = res.focus
                    that.price = res.price
                    that.level = res.level
                    that.newenergy = res.newenergy
                } else {
                    res.data.price.forEach((item, i) => {
                        item.url = `/pages/modellist/modellist?price=${item.id}&title=${item.name}`
                    })
                    that.price = res.data.price

                    res.data.level.forEach((item, i) => {
                        if (item.name === '轿车') {
                            item.img = '/static/img/auto01.png'
                        } else if (item.name === 'SUV') {
                            item.img = '/static/img/auto02.png'
                        } else if (item.name === 'MPV') {
                            item.img = '/static/img/auto03.png'
                        }
                    })
                    that.level = res.data.level

                    that.power_type = res.data.fuel[1].id
                    // 加载新能源
                    u.request({
                        url: u.API.IndexSeach,
                        isVerifyLogin: false,
                        isUseMock: false,
                        data: {
                            power_type: that.power_type,
                            pageIndex: 1,
                            pageSize: 12
                        },
                        success(res, isUseMock) {
                            res.data.forEach((item, i) => {
                                item.name = item.model_name
                                item.url = `/pages/model/model?id=${item.id}&title=${item.model_name}`
                            })
                            that.newenergy = res.data
                        }
                    })

                }
            }
        })

        // 品牌
        u.request({
            url: u.API.Brand,
            isVerifyLogin: false,
            isUseMock: false,
            data: {
                hot: 1,
                pageIndex: 1,
                pageSize: 8
            },
            success(res, isUseMock) {
                res.data.forEach((item, i) => {
                    item.url = `/pages/modellist/modellist?brand_id=${item.id}&title=${item.brand_name}`
                })
                that.brand = res.data
            }
        })

        

        // 广告 焦点图
        u.request({
            url: u.API.Ad,
            isVerifyLogin: false,
            isUseMock: false,
            data: {},
            success(res, isUseMock) {
                that.focus = res.data
            }
        })

        // 特价车
        that.loadDiscountCar()

        // 资讯数据
        u.getCacheLocationCity({
            success: function (res) {
                that.ttBottomLoad_config.params = {
                    city_id: res.id || '0',
                }
                that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
            }
        })


    }
}
</script>

