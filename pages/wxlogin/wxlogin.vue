<template>
<view>
    <navbar :title="title"></navbar>
    <view class="auth">
        <view class="auth__th">
            <view class="auth__th-avt">
                <open-data class="" type="userAvatarUrl"></open-data>
            </view>
        </view>
        <view class="auth__title">看车网 申请以下权限</view>
        <view class="auth__subtitle">获得你的昵称、头像、地区及性别等公开信息</view>
        <div class="auth__btnwrap">
            <button type="default" @click="noLogin" class="auth__btnwrap-btn1">暂不登录</button>
            <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="wxLogin" class="auth__btnwrap-btn2">授权登录</button>
        </div>
    </view>
</view>
</template>
<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            title: '微信授权登录'
        }
    },
    methods: {
        wxLogin(e) {
            let that = this
            // console.log(e)
            if (e.detail.errMsg !== 'getUserInfo:ok') {
                uni.showToast({
                    title: '授权不成功 请重新授权',
                    mask: true,
                    icon: 'none'
                })
                return false
            }
            let detail = e.detail
            uni.showLoading({
                title: '正在授权登录...',
                mask: true
            })

            uni.login({
                success(result) {
                    // console.log(result)
                    let postData = {
                        code: result.code,
                        userInfo: detail.rawData,
                        // userInfo: detail.userInfo,
                        // encryptedData: detail.encryptedData,
                        // iv: detail.iv,
                        // signature: detail.signature
                    }
                    u.request({
                        url: u.API.MyLogin,
                        data: postData,
                        isVerifyLogin: false,
                        isShowLoading: false,
                        isSendToken: false,
                        isUseMock: false,
                        success(res, isUseMock) {
                            uni.hideLoading()

                            if (isUseMock) {
                                if (res.code === '1') {
                                    uni.showToast({
                                        title: '登录成功',
                                        mask: true,
                                        duration: 4000,
                                        success: function() {
                                            // 保存用户信息
                                            // uni.setStorageSync('code', result.code)
                                            uni.setStorageSync(
                                                'token',
                                                res.data.token
                                            )
                                            uni.setStorageSync(
                                                'userId',
                                                res.data.userId
                                            )
                                            uni.setStorageSync(
                                                'userInfo',
                                                detail.userInfo
                                            )
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
                            } else {
                                if (res.code == 1) {
                                    uni.showToast({
                                        title: '微信授权登录成功',
                                        mask: true,
                                        duration: 4000,
                                        success: function() {
                                            // 保存用户信息
                                            // uni.setStorageSync('code', result.code)
                                            uni.setStorageSync('token', res.data.token)
                                            uni.setStorageSync('userId', res.data.userId)
                                            uni.setStorageSync('userInfo', res.data.userInfo)
                                            // uni.setStorageSync('userInfo', detail.userInfo)
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
                            }
                        },
                        fail(res, isUseMock) {
                            uni.hideLoading()
                            console.error('错误')
                            console.error(res)
                        }
                    })
                }
            })
        },
        noLogin() {
            let that = this
            that.back()
        }
    },
    onLoad() {
        console.log('login onLoad')
        var that = this
    }
}
</script>


<style scoped>
.auth {
    padding: 30px 20px 0;
}
.auth__th {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1upx solid #e3e3e3;
    text-align: center;
}
.auth__th-avt {
    width: 90px;
    height: 90px;
    border: 2px solid #fff;
    margin: 0 auto 0;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
}
.auth__title {
    color: #585858;
    font-size: 18px;
    margin-bottom: 10px;
}
.auth__subtitle {
    font-size: 16px;
    color: #888;
    margin-bottom: 40px;
}
.auth__btnwrap {
    overflow: hidden;
}
.auth__btnwrap-btn1 {
    width: 48%;
    float: left;
}
.auth__btnwrap-btn2 {
    width: 48%;
    float: right;
}
</style>