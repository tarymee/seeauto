<template>
    <view class="">
        <view class="nav" :style="{'height':navbarInfo.navHeight + 'px','background':bgColor}">
            <div class="nav-statusbar" :style="{'height':navbarInfo.statusBarHeight + 'px'}"></div>
            <view class="nav-title">
                <view class="nav-title-con" :style="{'width':navbarInfo.titleWidth + 'px','height':navbarInfo.titleHeight + 'px','line-height':navbarInfo.titleHeight + 'px','color':titleColor}"><image src="/static/img/logo2.png" mode="aspectFill" v-if="isShowLogo"></image>{{title}}</view>
            </view>
            <view class="nav-capsule" :style="{'height':navbarInfo.capsuleHeight + 'px','width':navbarInfo.capsuleWidth + 'px','top':navbarInfo.capsuleTop + 'px','left':navbarInfo.capsuleLeft + 'px'}" v-if="isShowCapsule">
                <image src="/static/img/icon-back.png" mode="aspectFill" class="nav-capsule-back" @click="back()"></image>
                <view class="nav-capsule-line"></view>
                <image src="/static/img/icon-home.png" mode="aspectFill" class="nav-capsule-home" @click="home()"></image>
            </view>
        </view>
        <view :style="{'height':navbarInfo.navHeight + 'px'}"></view>
    </view>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'navbar',
    components: {},
    computed: {
        bgColor() {
            if (this.styleType === 1) {
                return '#fff'
            } else if (this.styleType === 2) {
                return 'transparent'
            }
        },
        titleColor() {
            if (this.styleType === 1) {
                return '#333'
            } else if (this.styleType === 2) {
                return 'transparent'
            }
        }
    },
    data() {
        return {
            isShowCapsule: true,
            navbarInfo: {}
        }
    },
    props: {
        styleType: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: ''
        },
        isShowLogo: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        let that = this

        that.navbarInfo = u.getNavbarInfo()
        console.log(that.navbarInfo)

        // 4个tab页面不显示 capsule
        let pages = getCurrentPages()
        console.log('页面栈', pages)
        let currentPageRoute = pages[pages.length - 1].route
        if (currentPageRoute.indexOf('pages/index/index') != -1 || currentPageRoute.indexOf('pages/user/user') != -1 || currentPageRoute.indexOf('pages/auto/auto') != -1 || currentPageRoute.indexOf('pages/sale/sale') != -1) {
            that.isShowCapsule = false
        } else {
            that.isShowCapsule = true
        }
    },
    methods: {
        changeStyle(styleType) {
            this.styleType = styleType
        },
        home() {
            this.jump('/pages/index/index')
        }
    }
}
</script>

<style scope>
.nav {
    position: fixed;
    height: 64px;
    width: 100%;
    top: 0;
    z-index: 9999999;
}
.nav-statusbar {
    width: 100%;
    height: 20px;
    /* background: #05a; */
}
.nav-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    /* background: #f60; */
}
.nav-title-con {
    width: 180px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: auto;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    vertical-align: top;
}
.nav-title-con image {
    height: 22px;
    width: 66px;
    display: inline-block;
    vertical-align: top;
    margin-top: 11px;
    margin-right: 3px;
}
.nav-capsule {
    background-color: rgba(255,255,255,0.5);
    border: 1upx solid rgba(000,000,000,0.15);
    /* background-color: #fff; */
    /* border: 1px solid #ddd; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    width: 87px;
    height: 32px;
    left: 10px;
    top: 26px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-capsule-line {
    width: 1upx;
    height: 32upx;
    background-color: #ddd;
}

.nav-capsule-back {
    padding: 10px;
    width: 20px;
    height: 20px;
    margin-left: 5px;
}
.nav-capsule-home {
    padding: 10px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
</style>