<template>
<view>
    <navbar :title="title"></navbar>
    <div class="tt-form">
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="phone" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">验证码</div>
            <div class="tt-form__item-r"><input type="text" v-model="verifyCode" placeholder="请输入验证码" /></div>
            <div class="tt-form__item-btn" :class="waitting ? 'tt-form__item-btn--disable' : ''" @tap="getVerifyCode">{{vmsg}}</div>
        </div>
        <button type="primary" @tap="login" class="tt-form__btn">登录</button>
    </div>
</view>
</template>
<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            title: '登录',
            vmsg: '获取验证码',
            waitting: false,
            phone: '',
            verifyCode: ''
        }
    },
    methods: {
        getVerifyCode() {
            let that = this
            if (!u.checkphone(that.phone)) {
                return false
            }
            u.request({
                url: u.API.getVerifyCode,
                data: {
                    phone: that.phone
                },
                isVerifyLogin: false,
                isShowLoading: false,
                // isUseMock: false,
                success(res, isUseMock) {
                    uni.showToast({
                        title: '验证码已发送到您的手机',
                        mask: true,
                        icon: 'none'
                    })
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
                }
            })
        },
        login() {
            let that = this
            if (!u.checkphone(that.phone)) {
                return false
            } else if (!that.verifyCode) {
                uni.showToast({
                    title: '请输入验证码',
                    icon: 'none'
                })
                return false
            }

            uni.showLoading({
                title: '正在登录...',
                mask: true
            })

            let postData = {
                phone: that.phone,
                verifyCode: that.verifyCode
            }
            u.request({
                url: u.API.MyLogin,
                data: postData,
                isVerifyLogin: false,
                isShowLoading: false,
                // isUseMock: false,
                success(res, isUseMock) {
                    uni.hideLoading()
                    if (res.code === '1') {
                        uni.showToast({
                            title: '登录成功',
                            mask: true,
                            duration: 4000,
                            success: function() {
                                // 保存用户信息
                                // uni.setStorageSync('code', result.code)
                                uni.setStorageSync('token', res.data.token)
                                uni.setStorageSync('userId', res.data.userId)
                                uni.setStorageSync('userInfo', res.data.userInfo)
                                // 返回
                                that.back()
                            }
                        })
                    } else {
                        uni.showToast({
                            title: '登录不成功 请重新登录',
                            mask: true,
                            icon: 'none'
                        })
                    }

                    if (isUseMock) {
                        
                    } else {
                        
                    }
                },
                fail(res, isUseMock) {
                    uni.hideLoading()
                    console.error('错误')
                    console.error(res)
                }
            })
        }
    },
    onLoad() {
        var that = this
    }
}
</script>


<style scoped>

</style>