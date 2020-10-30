<template>
    <div class="">
        <navbar :title="title"></navbar>
        <div class="lowp">
            <image class="lowp-img" src="/static/img/price.jpg" mode="aspectFill"></image>
            <div class="lowp__bd">
                <image class="lowp__bd-img" :src="img" mode="aspectFill"></image>
                <div class="lowp__bd-con">
                    <div class="lowp__bd-tit">{{name}}</div>
                    <div class="lowp__bd-des">
                        <text style="color: #F00;margin-right: 10px;">￥{{price}}万</text>
                        <!-- 原价：<text style="text-decoration: line-through;">￥{{price}}万</text> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="tt-form">
            <div class="tt-form__item">
                <div class="tt-form__item-l">底价商家</div>
                <div class="tt-form__item-r"><input type="number" disabled v-model="company_name" placeholder="底价商家" /></div>
            </div>

            <div class="tt-form__item">
                <div class="tt-form__item-l">购车城市</div>
                <div class="tt-form__item-r" @tap="handleTap('picker')">
                    <view class="tt-form__item-r-text" v-if="lbPickerText">{{lbPickerText}}</view>
                    <view class="tt-form__item-r-text--placeholder" v-else>选择省 市 区</view>
                </div>
            </div>
            <lb-picker ref="picker" v-model="lbPickerValue" mode="multiSelector" :list="lbPickerData" :level="2" @change="handleChange" @confirm="handleConfirm" @cancle="handleCancle"></lb-picker>


            <div class="tt-form__item">
                <div class="tt-form__item-l">手机号码</div>
                <div class="tt-form__item-r"><input type="number" v-model="phone" placeholder="11位手机号" /></div>
            </div>
            <button type="primary" @tap="getPrice" class="tt-form__btn">获取底价</button>
        </div>
    </div>
</template>
<script>
import u from '@/common/util'
import lbPicker from '@/components/lb-picker' // https://ext.dcloud.net.cn/plugin?id=1111

export default {
    components: {
        lbPicker
    },
    data() {
        return {
            lbPickerText: '',
            lbPickerValue: [],
            lbPickerData: [],
            title: '获取底价',
            company_id: '',
            company_name: '',
            style_id: '',
            company_style_id: '',
            name: '',
            img: '',
            price: '',
            phone: ''
        }
    },
    methods: {
        handleTap (picker) {
            this.$refs[picker].show()
        },
        handleChange (e) {
            console.log('change::', e)
        },
        handleConfirm (e) {
            this.lbPickerText = e.item.map(item => item.label).join('-')
        },
        handleCancle (e) {
            console.log('cancle::', e)
        },
        getPrice() {
            let that = this
            // console.log(that.lbPickerValue)
            // return false
            if (!that.lbPickerValue.length) {
                uni.showToast({
                    title: '请选择购车城市',
                    icon: 'none'
                })
                return false
            } else if (!u.checkphone(that.phone)) {
                return false
            }
            let postData = {
                company_id: that.company_id,
                province: that.lbPickerValue[0],
                province_name: that.lbPickerText[0],
                city: that.lbPickerValue[1],
                city_name: that.lbPickerText[1],
                phone: that.phone
            }

            if (that.style_id) {
                postData.style_id = that.style_id
            } else if (that.company_style_id) {
                postData.company_style_id = that.company_style_id
            }
            u.request({
                url: u.API.MyPriceAdd,
                data: postData,
                isVerifyLogin: true,
                // isShowLoading: true,
                isUseMock: false,
                success(res, isUseMock) {
                    if (res.code == 1) {
                        uni.showToast({
                            title: '询价成功',
                            mask: true,
                            duration: 4000,
                            success: function() {
                                // 返回
                                that.back()
                            }
                        })
                    }
                }
            })
        }
    },
    onLoad(e) {
        var that = this
        console.log(e)
        that.company_id = e.company_id
        that.company_name = e.company_name
        that.name = e.name
        that.img = e.img
        that.price = e.price
        that.style_id = e.style_id
        that.company_style_id = e.company_style_id


        // 获取省市区数据
        u.request({
            url: u.API.ProvinceList,
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                function totree(data, parId) {
                    let obj = {};
                    let result = [];
                    //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
                    data.map(el => {
                        obj[el.value] = el;
                    })
                    for (let i = 0, len = data.length; i < len; i++) {
                        let value = data[i].pid;
                        if (value == parId) {
                            result.push(data[i]);
                            continue;
                        }
                        if (obj[value].children) {
                            obj[value].children.push(data[i]);
                        } else {
                            obj[value].children = [data[i]];
                        }
                    }
                    return result;
                }
                res.data.forEach((item, i) => {
                    item.label = item.name
                    item.value = item.id
                    item.pid = item.pid
                    delete item.name
                    delete item.id
                })
                let res1 = totree(res.data, 'null')
                that.lbPickerData = res1[0].children
                that.$forceUpdate()
            }
        })


    }
}
</script>


<style scoped>
.lowp {
    width: 750upx;
    height: 450upx;
    background-color: #fff;
}
.lowp-img {
    display: block;
    width: 750upx;
    height: 350upx;
}
.lowp__bd {
    overflow: hidden;
    padding: 20upx;
    background-color: #fff;
    border-radius: 5px;
    margin: -80upx 20upx 0;
    box-shadow: 0px 5px 5px #eee;
}
.lowp__bd-img {
    float: left;
    width: 60px;
    height: 45px;
    margin-right: 10px;
}
.lowp__bd-con {
    overflow: hidden;
}
.lowp__bd-des {
    font-size: 12px;
    color: #999;
}
.lowp__bd-tit {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>