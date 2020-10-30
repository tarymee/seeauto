<template>
    <view>
        <navbar :title="title"></navbar>
        <view class="banner">
            <image :src="company.company_logo ? company.company_logo : default_company_logo"></image>
        </view>
        <view class="logoTop">
            <image :src="company.company_logo_small ? company.company_logo_small : default_company_logo_small" class="logo"></image>
            <text class="title">{{company.name}}</text>
            <a class="logoTop-like" @tap="collect()">
                <uni-icon color="#999" class="" size="18" type="star" v-if="!isCollect" />
                <uni-icon color="#999" class="" size="18" type="star-filled" v-if="isCollect" />
            </a>
        </view>
        <div class="cate">
            <div class="cate__item" :class="item.select ? 'cate__item--cur' : ''" v-for="(item, index) in cateArr" :key="index" @tap="selectCate(item.title)">
                <text>{{item.title}}</text>
            </div>
        </div>
        <div v-if="cateType == '首页'">
            <view class="brand"><view class="brandTit"><icon></icon>代理品牌</view></view>
            <brandList :brandData="brands" v-if="brands && brands.length"></brandList>
            <div class="none" v-if="!(brands && brands.length)">
                <div class="none-text" @click="load()">暂无代理品牌</div>
            </div>
            <div class="space"></div>
            <view class="list1">
                <view class="title">
                    <icon></icon>特价车
                </view>
                <view class="con clearfix" v-if="discarData && discarData.length">
                    <view class="lit" v-for="(item, index) in discarData" :key="index">
                        <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                        <text class="tit">{{item.model_name}}{{item.style_name}}</text>
                        <text class="pay"><text class="nub1">￥{{item.price}}万</text><text class="nub2">￥{{item.special_price}}万</text></text>
                        <navigator @tap="jump(`/pages/specialdetail/specialdetail?id=${item.id}`)" class="btn">获取底价</navigator>
                        <!-- <navigator @tap="jump(`/pages/getprice/getprice?company_id=${this.id}&company_name=${this.company.name}&company_style_id=${item.id}&style_id=${item.style_id}&name=${item.model_name}${item.style_name}&img=${item.thumbnail}&price=${item.special_price}`)" class="btn">获取底价</navigator> -->
                    </view>
                </view>
                <div class="none" v-if="!(discarData && discarData.length)">
                    <img src="/static/img/none.png" class="none-img" />
                    <div class="none-text" @click="load()">暂无数据</div>
                </div>
            </view>
            <view class="list2">
                <div class="cate">
                    <div class="cate__item" style="width:25%" :class="item.select ? 'cate__item--cur' : ''" v-for="(item, index) in saleArr" :key="index" @tap="selectSale(item.orderType)">
                        <text>{{item.title}}</text>
                    </div>
                </div>
                <view class="con" v-if="salecarData && salecarData.length">
                    <!-- <view class="saleList"> -->
                        <!--  @tap="jump(`/pages/specialdetail/specialdetail?id=${item.id}`)" -->
                        <view class="lit" v-for="(item, index) in salecarData" :key="index">
                            <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                            <text class="tit">{{item.model_name}}{{item.style_name}}</text>
                            <text class="pay">￥{{item.price}}万</text>
                            <navigator @tap="jump(`/pages/getprice/getprice?company_id=${this.id}&company_name=${this.company.name}&company_style_id=${item.id}&style_id=${item.style_id}&name=${item.model_name}${item.style_name}&img=${item.thumbnail}&price=${item.special_price}`)" class="btn">获取底价</navigator>
                        </view>
                    <!-- </view> -->
                </view>
                <div class="none" v-if="!(salecarData && salecarData.length)">
                    <img src="/static/img/none.png" class="none-img" />
                    <div class="none-text" @click="load()">暂无数据</div>
                </div>
            </view>
        </div>
        <div v-if="cateType == '商家介绍'">
            <view class="introduce">
                <view class="inTxt"><text>商家名称：</text>{{company.name}}</view>
                <view class="inTxt"><text>联系人：</text>{{company.contacts}}</view>
                <view class="inTxt"><text>联系地址：</text>{{company.address}}</view>
                <view class="inTxt"><text>经营范围：</text>{{company.province_name}}{{company.city_name}}</view>
                <view class="inTit">商家简介</view>
                <view class="inCon">{{company.company_profile}}</view>
            </view>
        </div>
        <div v-if="cateType == '促销活动'">
            <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
                <list1 :list1Data="ttBottomLoad_data"></list1>
            </ttBottomLoad>
        </div>
        <div v-if="cateType == '预约试驾'">
            <div class="tt-form">
                <div class="tt-form__item">
                    <div class="tt-form__item-l">姓名</div>
                    <div class="tt-form__item-r"><input type="number" v-model="drive.name" placeholder="姓名" /></div>
                </div>
                <div class="tt-form__item">
                    <div class="tt-form__item-l">性别</div>
                    <div class="tt-form__item-r" @tap="handleTap('picker')">
                        <view class="tt-form__item-r-text" v-if="drive.gender_name">{{drive.gender_name}}</view>
                        <view class="tt-form__item-r-text--placeholder" v-else>性别</view>
                    </div>
                </div>
                <lb-picker ref="picker" v-model="drive.gender" mode="multiSelector" :list="lbPickerData" @confirm="handleConfirm"></lb-picker>
                <div class="tt-form__item">
                    <div class="tt-form__item-l">手机号码</div>
                    <div class="tt-form__item-r"><input type="number" v-model="drive.mobile" placeholder="11位手机号" /></div>
                </div>
                <div class="tt-form__item">
                    <div class="tt-form__item-l">验证码</div>
                    <div class="tt-form__item-r"><input type="text" v-model="drive.mobile_code" placeholder="请输入验证码" /></div>
                    <div class="tt-form__item-btn" :class="waitting ? 'tt-form__item-btn--disable' : ''" @tap="getVerifyCode">{{vmsg}}</div>
                </div>
                <div class="tt-form__item">
                    <div class="tt-form__item-l">试驾日期</div>
                    <div class="tt-form__item-r">
                        <picker mode="date" :value="drive.user_drive_time" @change="bindDateChange">
                            <view class="tt-form__item-r-text" v-if="drive.user_drive_time">{{drive.user_drive_time}}</view>
                            <view class="tt-form__item-r-text--placeholder" v-else>选择日期</view>
                        </picker>
                    </div>
                </div>
                <button type="primary" @tap="save" class="tt-form__btn">提交</button>
            </div>
        </div>
        <div v-if="cateType == '联系方式'">
            <view class="information">
                <view class="li">商家：{{company.name}}</view>
                <view class="li">联系：{{company.contacts}}</view>
                <view class="li">售前：{{company.phone_presale}}</view>
                <view class="li">售后：{{company.phone_postsale}}</view>
                <view class="li">手机：{{company.mobile}}</view>
                <view class="li">地区：{{company.province_name}}{{company.city_name}}</view>
                <view class="li">地址：{{company.address}}</view>
            </view>
        </div>
    </view>
</template>

<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import brandList from '@/components/brand-list/brand-list.vue'
import list1 from '@/components/list1/list1.vue'
import lbPicker from '@/components/lb-picker' // https://ext.dcloud.net.cn/plugin?id=1111
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        ttBottomLoad,
        brandList,
        list1,
        lbPicker,
        uniIcon
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    data() {
        return {
            title: '商家首页',
            id: '',
            cateType: '首页',
            isCollect: false,
            vmsg: '获取验证码',
            vcode: '',
            waitting: false,
            drive: {
                company_id: '',
                name: '',
                mobile: '',
                gender: '',
                gender_name: '',
                user_drive_time: '',
                // style_id: '',
            },
            lbPickerData: [
                {
                    label: '男',
                    value: '1'
                },
                {
                    label: '女',
                    value: '2'
                }
            ],
            cateArr: [
                {
                    title: '首页',
                    select: true
                },
                {
                    title: '商家介绍',
                    select: false
                },
                {
                    title: '促销活动',
                    select: false
                },
                {
                    title: '预约试驾',
                    select: false
                },
                {
                    title: '联系方式',
                    select: false
                }
            ],
            default_company_logo: `${u.API.HOST}/Uploads/defaultPic/company_logo.jpg`,
            default_company_logo_small: `${u.API.HOST}/Uploads/defaultPic/company_logo_small.jpg`,
            company: {
                // 'name': '商户名字',
                // 'portrait_img' : '头像',
                // 'company_logo': '商户LOGO',
                // 'company_logo_small': '公司logo小图',
                // 'contacts': '联系人',
                // 'mobile': '手机',
                // 'phone_presale': '售前电话',
                // 'phone_postsale': '售后电话',
                // 'wechat': '微信号码',
                // 'fax': '传真号码',
                // 'email': '电子邮箱',
                // 'province': '省份',
                // 'province_name' : '省份名',
                // 'city': '城市',
                // 'city_name' : '城市名',
                // 'location_x' : '经纬度x',
                // 'location_y': '经纬度y',
                // 'address': '地址',
                // 'business_scope': '经营范围',
                // 'company_profile': '公司简介',
            },
            brands: [],
            discarData: [],
            saleArr: [
                {
                    title: '在售车型',
                    orderType: '1',
                    select: true
                },
                {
                    title: '价格从低到高',
                    orderType: '2',
                    select: false
                }
            ],
            salecarData: [],
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.ActivityList,
                params: {}
            },
        }
    },
    methods: {
        getVerifyCode() {
            let that = this
            if (!u.checkphone(that.drive.mobile)) {
                return false
            }
            u.request({
                url: u.API.MobileCodeCheck,
                data: {
                    mobile: that.drive.mobile
                },
                isVerifyLogin: false,
                isShowLoading: false,
                // isUseMock: false,
                success(res, isUseMock) {
                    if (res.code === 1) {
                        uni.showToast({
                            title: '验证码已发送到您的手机',
                            mask: true,
                            icon: 'none'
                        })
                        that.vcode = res.data
                        let count = 60
                        let IntervalFn = setInterval(() => {
                            if (count <= 0) {
                                that.waitting = false
                                that.vmsg = '获取验证码'
                                clearInterval(IntervalFn)
                            } else {
                                that.waitting = true
                                that.vmsg = count + '秒后重新发送'
                                count--
                            }
                        }, 1000)
                    } else {
                        uni.showToast({
                            title: res.msg,
                            mask: true,
                            icon: 'none'
                        })
                    }
                }
            })
        },
        handleTap (picker) {
            this.$refs[picker].show()
        },
        handleConfirm (e) {
            console.log(e)
            this.drive.gender_name = e.item[0].label
        },
        bindDateChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.drive.user_drive_time = e.detail.value
        },
        getData(data) {
            let that = this
            if (!that.ttBottomLoad_config.isUseMock) {
                data.forEach((item, i) => {
                    item.img = item.img_small
                    item.title = item.title
                    item.typename = item.cityName
                    item.des = item.add_time
                    item.url = `/pages/activitydetail/activitydetail?id=${item.id}`
                })
            }
            that.ttBottomLoad_data = data
        },
        save() {
            let that = this
            // console.log(that.lbPickerValue)
            // return false
            if (!that.drive.name) {
                uni.showToast({
                    title: '请输入您的姓名',
                    icon: 'none'
                })
                return false
            } else if (!that.drive.gender) {
                uni.showToast({
                    title: '请输入您的性别',
                    icon: 'none'
                })
                return false
            } else if (!u.checkphone(that.drive.mobile)) {
                return false
            } else if (!that.drive.mobile_code) {
                uni.showToast({
                    title: '请输入手机验证码',
                    icon: 'none'
                })
                return false
            } else if (!that.drive.user_drive_time) {
                uni.showToast({
                    title: '请输入您的试驾时间',
                    icon: 'none'
                })
                return false
            }

            // if (that.drive.mobile_code.toString() != that.vcode.toString()) {
            //     uni.showToast({
            //         title: '验证码不正确',
            //         icon: 'none'
            //     })
            //     return false
            // }


            let postData = that.drive

            u.request({
                url: u.API.MyDriveAdd,
                data: postData,
                isVerifyLogin: true,
                // isShowLoading: true,
                isUseMock: false,
                success(res, isUseMock) {
                    if (res.code == 1) {
                        uni.showToast({
                            title: '预约成功',
                            mask: true,
                            duration: 4000,
                            success: function() {
                                that.selectCate('首页')
                            }
                        })
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                    }
                }
            })
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
                                type: 2,
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
                            type: 2,
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
        },
        selectCate(title) {
            let that = this
            console.log(title)
            if (title === '促销活动') {
                that.ttBottomLoad_data = []
                setTimeout(function () {
                    that.ttBottomLoad_config.params = {
                        company_id: that.id
                    }
                    that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
                }, 100)
            }
            that.cateArr.forEach((item, i) => {
                if (title === item.title) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.cateType = title
        },
        selectSale(orderType) {
            let that = this
            that.saleArr.forEach((item, i) => {
                if (orderType === item.orderType) {
                    item.select = true
                    that.loadSaleCar(orderType)
                } else {
                    item.select = false
                }
            })
        },
        loadSaleCar(orderType) {
            let that = this
            u.request({
                url: u.API.DiscountCar,
                isVerifyLogin: false,
                data: {
                    company_id: that.id,
                    orderType: orderType, // 2为价格从低到高
                    type: 1,
                    pageSize: 6,
                    pageIndex: 1
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.salecarData = res.data
                }
            })
        }
    },
    onLoad(e) {
        let that = this
        console.log(e)
        that.id = e.id

        that.drive.company_id = that.id

        that.collectCheck()


        // 详情
        u.request({
            url: u.API.Company,
            data: {
                company_id: that.id
            },
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                that.company = res
                that.$forceUpdate()
            }
        })
        // 品牌
        u.request({
            url: u.API.CompanyBrand,
            data: {
                company_id: that.id
            },
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                res.data.forEach((item, i) => {
                    item.url = `/pages/modellist/modellist?brand_id=${item.id}&title=${item.brand_name}`
                })
                that.brands = res.data
            }
        })

        // 特价车
        u.request({
            url: u.API.DiscountCar,
            isVerifyLogin: false,
            data: {
                company_id: that.id,
                type: 2,
                pageSize: 6,
                pageIndex: 1
            },
            isUseMock: false,
            success(res, isUseMock) {
                that.discarData = res.data
            }
        })

        that.loadSaleCar(1)

    }
}
</script>

<style scoped>
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
    /* // background-color: #eee; */
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




.clearfix:after {
    content: '\20';
    clear: both;
    height: 0;
    display: block;
    overflow: hidden;
}
.clearfix {
    zoom: 1;
}

.banner image {
    width: 100%;
    height: 300upx;
}

.logoTop {
    height: 130upx;
    padding: 0 30upx 0 50upx;
    /* margin-top: -40upx; */
    border-bottom: 14upx solid #fafafa;
}
.logoTop .logo {
    width: 120upx;
    height: 120upx;
    margin-right: 30upx;
    float: left;
    border-radius: 60upx;
}
.logoTop .title {
    line-height: 40upx;
    margin-top: 50upx;
    float: left;
}
.logoTop-like {
    float: right;
    margin-top: 28px;
}


.brand {
    padding: 0 20upx;
}
.brandTit {
    height: 90upx;
    line-height: 90upx;
    font-size: 14px;
}
.brandTit icon {
    width: 10upx;
    height: 30upx;
    background: #0f7bcf;
    border-radius: 5upx;
    float: left;
    margin: 30upx 10upx 0 0;
}

.space {
    height: 14upx;
    background-color: #f5f5f5;
}

.list1 {
    padding: 0 20upx;
    border-bottom: 14upx solid #f5f5f5;
}
.list1 .title {
    height: 100upx;
    line-height: 100upx;
    font-size: 14px;
}
.list1 .title icon {
    width: 10upx;
    height: 30upx;
    background: #0f7bcf;
    border-radius: 5upx;
    float: left;
    margin: 35upx 10upx 0 0;
}
.list1 .lit {
    width: 100%;
    height: 140upx;
    margin-bottom: 20upx;
    border-bottom: 1px solid #e7e7e7;
    float: left;
}
.list1 .lit:last-child {
    border: 0;
}
.list1 .lit image {
    width: 160upx;
    height: 120upx;
    float: left;
    margin-right: 20upx;
}
.list1 .lit .tit {
    height: 60upx;
    font-size: 14px;
    line-height: 60upx;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.list1 .lit .pay {
    line-height: 60upx;
    font-size: 14px;
}
.list1 .lit .nub1 {
    margin-right: 20upx;
    text-decoration: line-through;
    color: #666;
}
.list1 .lit .nub2 {
    color: #ff0000;
}
.list1 .lit .btn {
    width: 150upx;
    height: 50upx;
    margin-bottom: -10upx;
    line-height: 50upx;
    border-radius: 10upx;
    text-align: center;
    float: right;
    background: #0f7bcf;
    color: #fff;
}


.list2 .con {
    padding: 0 20upx;
}
.list2 .lit {
    width: 100%;
    height: 120upx;
    /* margin-bottom: 20upx; */
    padding: 20upx 0;
    border-bottom: 1px solid #e7e7e7;
    float: left;
}
.list2 .lit:last-child {
    border: 0;
}
.list2 .lit image {
    width: 160upx;
    height: 120upx;
    float: left;
    margin-right: 20upx;
}
.list2 .lit .tit {
    height: 60upx;
    font-size: 14px;
    line-height: 60upx;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.list2 .lit .pay {
    line-height: 60upx;
    font-size: 14px;
    color: #ff0000;
}
.list2 .lit .btn {
    width: 150upx;
    height: 50upx;
    margin-bottom: -10upx;
    line-height: 50upx;
    border-radius: 10upx;
    text-align: center;
    float: right;
    background: #0f7bcf;
    color: #fff;
}













.saleList .lit {
    width: 100%;
    float: left;
    padding-bottom: 20upx;
    margin-bottom: 20upx;
    border-bottom: 1px solid #e7e7e7;
}
.saleList .lit .pic {
    width: 200upx;
    height: 150upx;
    float: right;
}
.saleList .lit .tit {
    height: 100upx;
    line-height: 50upx;
    padding: 0 50upx 0 10upx;
    display: block;
    overflow: hidden;
}
.saleList .lit .time {
    padding-top: 20upx;
    line-height: 30upx;
}
.saleList .lit .time image {
    width: 35upx;
    height: 27upx;
    margin: 0 10upx 0 0;
    float: left;
}









.information {
    padding: 20upx;
}
.information .li {
    border-bottom: 1px solid #e7e7e7;
    padding: 0 20upx;
    line-height: 80upx;
}






.introduce {
    padding: 20upx;
}
.introduce .inTxt {
    line-height: 60upx;
    padding-left: 150upx;
    color: #666;
}
.introduce .inTxt text {
    margin-left: -150upx;
    display: inline-block;
    width: 150upx;
    text-align: right;
    color: #333;
}
.introduce .inTit {
    line-height: 60upx;
    margin-bottom: 10upx;
    padding-left: 20upx;
    border-bottom: 1px solid #e7e7e7;
}
.introduce .inCon {
    line-height: 60upx;
    text-indent: 2em;
    color: #666;
}
</style>
