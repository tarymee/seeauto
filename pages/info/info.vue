<template>
<view>
    <navbar :title="title"></navbar>

    <div class="tt-form">
        <div class="tt-form__item">
            <div class="tt-form__item-l">用户名</div>
            <div class="tt-form__item-r"><input type="text" v-model="user.login_name" placeholder="用户名" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">姓名</div>
            <div class="tt-form__item-r"><input type="text" v-model="user.name" placeholder="姓名" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">性别</div>
            <div class="tt-form__item-r">
                <picker @change="bindPickerChange" v-model="sex" :range="sexArr">
                    <view class="tt-form__item-r-text">{{sexArr[sex]}}</view>
                </picker>

            </div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="user.mobile" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">城市</div>
            <div class="tt-form__item-r" @tap="handleTap('picker')">
                <view class="tt-form__item-r-text" v-if="lbPickerText && lbPickerText.length">{{lbPickerText.join('-')}}</view>
                <view class="tt-form__item-r-text--placeholder" v-else>选择省 市</view>
            </div>
        </div>
        <lb-picker ref="picker" v-model="lbPickerValue" mode="multiSelector" :list="lbPickerData" :level="2" @change="handleChange" @confirm="handleConfirm" @cancle="handleCancle"></lb-picker>

        <button type="primary" @tap="save" class="tt-form__btn">保存</button>
    </div>
</view>
</template>

<script>
import u from '@/common/util'
import lbPicker from '@/components/lb-picker' // https://ext.dcloud.net.cn/plugin?id=1111
export default {
    components: {
        lbPicker
    },
    computed: {
        gender () {
            let that = this
            if (that.sex === '0') {
                return '1'
            } else if (that.sex === '1') {
                return '2'
            } else {
                return ''
            }
        }
    },
    data() {
        return {
            lbPickerText: '',
            lbPickerValue: [],
            lbPickerData: [],
            title: '我的信息',
            sexArr: ['男', '女', '未知'],
            sex: '2',
            user: {
                // city_name: null,
                // gender: "1",
                // login_name: "tarymee",
                // mobile: null,
                // name: null,
                // province_name: null,
            }
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
            this.lbPickerText = e.item.map(item => item.label)
        },
        handleCancle (e) {
            console.log('cancle::', e)
        },
        bindPickerChange(e) {
            console.log(e)
            this.sex = e.target.value
        },
        load() {
            let that = this
            u.request({
                url: u.API.MyInfo,
                isShowLoading: true,
                isVerifyLogin: true,
                isUseMock: false,
                success(res, isUseMock) {
                    that.user = res || {}
                    if (that.user.gender === '1') {
                        that.sex = '0'
                    } else if (that.sex === '2') {
                        that.sex = '1'
                    } else {
                        that.sex = '2'
                    }

                    if (that.user.province_name && that.user.city_name) {
                        that.lbPickerText = [that.user.province_name, that.user.city_name]
                        that.lbPickerValue = [that.user.province, that.user.city]
                    }

                }
            })
        },
        save() {
            let that = this
            that.user.gender = that.gender
            console.log(that.user)
            // return false
            if (!that.user.login_name) {
                uni.showToast({
                    title: '请先填写用户名',
                    icon: 'none'
                })
                return false
            } else if (!that.user.name) {
                uni.showToast({
                    title: '请先填写姓名',
                    icon: 'none'
                })
                return false
            } else if (!that.user.gender) {
                uni.showToast({
                    title: '请先填写性别',
                    icon: 'none'
                })
                return false
            } else if (!u.checkphone(that.user.mobile)) {
                return false
            } else if (!that.lbPickerValue.length) {
                uni.showToast({
                    title: '请选择城市',
                    icon: 'none'
                })
                return false
            }
            that.user.province = that.lbPickerValue[0]
            that.user.city = that.lbPickerValue[1]
            that.user.province_name = that.lbPickerText[0]
            that.user.city_name = that.lbPickerText[1]
            u.request({
                url: u.API.MyInfoEdit,
                data: {
                    ...that.user
                },
                isShowLoading: true,
                isVerifyLogin: true,
                isUseMock: false,
                success(res) {
                    console.log(res)
                    if (res.code === 1) {
                        uni.showToast({
                            title: '操作成功',
                            mask: true,
                            duration: 4000,
                            success: function() {
                                that.back()
                            }
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
    },
    onLoad() {
        let that = this
        this.load()


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
    },
    onShow() {
        let that = this
    }
}
</script>

<style scoped>


</style>
