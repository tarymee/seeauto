<template>
    <div>
        <!-- <navbar :title="title"></navbar> -->
        <div class="avt">
            <image class="avt-img" src="/static/img/my.jpg" mode="aspectFill"></image>
            <div class="avt__bd" @tap="login()">
                <image class="avt__bd-img" :src="userInfo.avatarUrl" mode="aspectFill"></image>
                <div class="avt__bd-name">{{userInfo.nickName}}</div>
            </div>
        </div>

        <!-- <uni-list> -->
            <uni-list-item title="我的收藏" thumb="/static/img/my-icon1.png" show-badge="true" :badge-text="Collection" badge-type="default" badge-inverted="true" @tap="verifyLoginJump('/pages/collect/collect')"></uni-list-item>
            <uni-list-item title="我的询价" show-badge="true" :badge-text="AskPrice" badge-type="default" badge-inverted="true" thumb="/static/img/my-icon2.png" @tap="verifyLoginJump('/pages/ask/ask')"></uni-list-item>
            <uni-list-item title="我的预约" show-badge="true" :badge-text="AskDrive" badge-type="default" badge-inverted="true" thumb="/static/img/my-icon3.png" @tap="verifyLoginJump('/pages/reservation/reservation')"></uni-list-item>
            <uni-list-item title="我的信息" thumb="/static/img/my-icon4.png" @tap="verifyLoginJump('/pages/info/info')"></uni-list-item>
            <uni-list-item title="退出登录" thumb="/static/img/my-icon5.png" @tap="loginout()" v-if="isLogin"></uni-list-item>
        <!-- </uni-list> -->

        <div class="m-title" v-if="historyModel && historyModel.length">
            <div class="m-title__tit">最近访问</div>
        </div>
        <div class="hismodel">
            <a class="hismodel-item" @tap="jump(`/pages/model/model?id=${item.id}`)" v-for="(item, index) in historyModel" :key="index">
                <image :src="item.thumbnail" lazy-load mode="aspectFill"></image>
                <div class="hismodel-item-tit">{{item.model_name}}</div>
                <div class="hismodel-item-des">
                    <text class="hismodel-item-price">￥{{item.special_price}}</text>
                </div>
            </a>
        </div>

    </div>
</template>

<script>
import u from '@/common/util'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import discarList from '@/components/discar-list/discar-list.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        uniList,
        uniListItem,
        discarList,
        uniIcon
    },
    data() {
        return {
            isLogin: false,
            userInfo: {
                avatarUrl: '/static/img/avatar.png',
                nickName: '登录/注册'
            },
            Collection: '',
            AskPrice: '',
            AskDrive: '',
            historyModel: [],
        }
    },
    methods: {
        loadHistory() {
            let that = this
            that.historyModel = uni.getStorageSync('historyModel') ? uni.getStorageSync('historyModel') : []
        },
        loadCounts() {
            let that = this
            u.request({
                url: u.API.My,
                isShowLoading: false,
                isVerifyLogin: true,
                isUseMock: false,
                success(res, isUseMock) {
                    that.Collection = res.Collection
                    that.AskPrice = res.AskPrice
                    that.AskDrive = res.AskDrive
                }
            })
        },
        loadInfo() {
            let that = this
            u.request({
                url: u.API.MyInfo,
                isShowLoading: false,
                isVerifyLogin: true,
                isUseMock: false,
                success(res, isUseMock) {

                }
            })
        },
        verifyLoginJump(url) {
            let that = this
            if (that.isLogin) {
                that.jump(url)
            } else {
                u.checkLogin()
                // uni.showToast({
                //     title: '请先登录后再操作',
                //     icon: 'none',
                //     // duration: 1500
                // })
            }
        },
        login() {
            let that = this
            if (that.isLogin) {
                return false
            }
            u.checkLogin()
        },
        loginout() {
            let that = this
            uni.showModal({
                // title: '提示',
                content: '您确定退出登录？',
                success(e) {
                    if (e.confirm) {
                        uni.removeStorageSync('code')
                        uni.removeStorageSync('token')
                        uni.removeStorageSync('userId')
                        uni.removeStorageSync('userInfo')
                        that.isLogin = false
                        that.Collection = ''
                        that.AskPrice = ''
                        that.AskDrive = ''
                        that.userInfo.avatarUrl = '/static/img/avatar.png'
                        that.userInfo.nickName = '登录/注册'
                    }
                }
            })
        }
    },
    onShow() {
        let that = this
        that.loadHistory()

        u.checkLogin({
            isAutoJumpToLogin: false,
            success(token, userId, userInfo) {
                // let userInfo = uni.getStorageSync('userInfo')
                if (userInfo) {
                    that.userInfo.avatarUrl = userInfo.avatarUrl
                    that.userInfo.nickName = userInfo.nickName
                }
                that.isLogin = true
                that.loadCounts()
            },
            fail() {
                console.log('您未登录')
            }
        })

    },
    onLoad(event) {
        let that = this
    }
}
</script>

<style scoped>
.avt {
    width: 750upx;
    height: 500upx;
    background-color: #fff;
}
.avt-img {
    display: block;
    width: 750upx;
    height: 400upx;
}
.avt__bd {
    overflow: hidden;
    width: 200upx;
    margin: -100upx auto 0;
}
.avt__bd-img {
    display: block;
    width: 120upx;
    height: 120upx;
    border: 10upx solid #ffffff;
    border-radius: 50%;
    overflow: hidden;
    margin: 0px auto;
}
.avt__bd-name {
    text-align: center;
    overflow: hidden;
    line-height: 50upx;
    padding-bottom: 10upx;
    color: #333;
    font-size: 16px;
}



/* 历史车型 */
.hismodel {
    margin: 5px 0;
    overflow: hidden;
    font-size: 0px;
}
.hismodel-item {
    display: inline-block;
    width: 223upx;
    margin: 5px 0 5px 20upx;
    position: relative;
}
.hismodel-item image {
    display: block;
    width: 223upx;
    height: 167upx;
    background-color: #eee;
}
.hismodel-item-tit {
    display: block;
    font-size: 12px;
    color: #333;
    line-height: 25px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}
.hismodel-item-des {
    font-size: 12px;
    line-height: 20px;
}
.hismodel-item-price {
    color: #f00;
}
</style>
