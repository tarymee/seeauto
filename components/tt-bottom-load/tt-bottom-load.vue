<template>
    <view class="tt-bottom-load">
        <!-- <slot :ttBottomLoad_data="data"></slot> -->
        <slot></slot>
        <div class="tt-bottom-load__tip">
            <img src="/static/img/none.png" class="tt-bottom-load__tip-img" v-if="tip === '暂无数据'" />
            <div class="tt-bottom-load__tip-text" @click="load()">{{tip}}</div>
        </div>
    </view>
</template>

<script>
import u from '@/common/util'
// let pageindex = 1
// let pagesize = 10
// let pagetotal = 1
// let errorCount = 0
// let isInit = false
// let isLoad = true
let config = {
    api: '',
    isVerifyLogin: false,
    params: {},
    pageindex: 1,
    pagesize: 10,
    pagetotal: 1,
    errorCount: 0,
    isInit: false,
    isLoad: true,
    isUseMock: u.ISUSEMOCK,
}

export default {
    name: 'tt-bottom-load',
    components: {},
    data() {
        return {
            tip: '暂无数据',
            data: []
        }
    },
    props: {},
    // // 组件不支持 onReachBottom
    // onReachBottom: function (t) {
    //     let that = this
    //     console.log('触底执行')
    // },
    mounted() {
        // let that = this
        // that.load()
    },
    methods: {
        init({ api, isVerifyLogin = false, isUseMock = u.ISUSEMOCK, pagesize = 10, params = {} } = {}) {
            let that = this
            Object.assign(config, { api, isVerifyLogin, isUseMock, pagesize, params })
            if (!config.api) {
                console.error('api接口不能为空')
                return false
            }
			// console.log('config.hot='+config.hot);
			// console.log('config.api='+config.api)
            // 父组件可能会更改api和params
            // 滚动到顶部
            that.data = []
            that.$emit('sendData', that.data)
            config.pageindex = 1
            config.pagetotal = 1
            config.isLoad = true
            config.isInit = true
            config.errorCount = 0
            that.load()
        },
        reload() {
            let that = this
            that.init()
        },
        end() {
            config.isInit = false
        },
        load() {
            let that = this
            if (config.pageindex <= config.pagetotal && config.isLoad && config.isInit) {
                that.tip = '加载中...'
                config.isLoad = false
                let postData = {
                    pageSize: config.pagesize,
                    pageIndex: config.pageindex,
                    ...config.params
                }
                console.log('postData', postData)
                u.request({
                    url: config.api,
                    data: postData,
                    isVerifyLogin: config.isVerifyLogin,
                    isShowError: false,
                    isUseMock: config.isUseMock,
                    success(res, isUseMock) {
                        if (Array.isArray(res.data) && res.data.length) {
                            that.data = that.data.concat(res.data)
                            that.$emit('sendData', that.data)
                        }
                        config.pagetotal = Number(res.pageTotal)
                        config.pageindex++
                        config.errorCount = 0

                        if (config.pagetotal === 0) {
                            that.tip = '暂无数据'
                            config.isLoad = false
                        } else if (config.pageindex > config.pagetotal) {
                            that.tip = '———— 我是有底线的 ————'
                            config.isLoad = false
                        } else {
                            that.tip = ''
                            config.isLoad = true
                        }
                    },
                    fail(res, isUseMock) {
                        config.errorCount++
                        if (config.errorCount < 3) {
                            that.tip = '~~ 加载失败，点击重新加载 ~~'
                            config.isLoad = true
                        } else {
                            that.tip = '暂无数据'
                            config.isLoad = false
                        }
                    }
                })
            }
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
.tt-bottom-load__tip {
    padding: 20px 0;
}
.tt-bottom-load__tip-img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0px auto 10px;
}
.tt-bottom-load__tip-text {
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    height: 20px;
}
</style>