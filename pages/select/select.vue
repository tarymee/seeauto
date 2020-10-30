<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="" v-for="(item, index) in selectData" :key="index">
            <div class="title">
                <div class="title__tit">{{item.name}}</div>
                <a class="title__r" v-if="item.ismultiple == '1'">多选</a>
            </div>
            <div class="sel">
                <div :class="{'sel-item--cur': item2.select,'sel-item--tit': !item2.id,'sel-item': item2.id}" @click="selectCar(item2, item)" v-for="(item2, index2) in item.children" :key="index2">
                    <text>{{item2.name}}</text>
                </div>
            </div>
            <div class="space"></div>
        </div>

        <div class="space"></div>
        <div class="space"></div>
        <div class="space"></div>

        <div class="result">
            <div class="result-reset" @tap="reset()">重置</div>
            <div class="result-count" @tap="toResult()">符合条件的车型有{{resultcount}}台</div>
        </div>
    </view>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            title: '条件选车',
            resultcount: '0',
            selectData: []
        }
    },
    methods: {
        reset() {
            let that = this
            that.selectData.forEach((item, i) => {
                item.children.forEach((item2, i) => {
                    item2.select = false
                })
            })
            that.$forceUpdate()
            that.init()
        },
        toResult() {
            let that = this
            if (that.resultcount === '0') {
                return false
            }
            let postData = that.dealPostData()
            postData = JSON.stringify(postData)
            that.jump('/pages/selectresult/selectresult?params=' + postData)
        },
        init() {
            let that = this
            u.request({
                url: u.API.SelectConfig,
                // data: postData,
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    // that.resultcount = res.resultcount
                    res.forEach((item, i) => {
                        item.type = item.name_en
                        if (item.name === '级别') {
                            item.children_backup = JSON.parse(JSON.stringify(item.children))
                            item.children = []
                            item.children_backup.forEach((item2, i) => {
                                item.children.push({
                                    name: item2.name
                                })
                                item2.children.forEach((item3, i) => {
                                    item.children.push({
                                        name: item3.name,
                                        id: item3.id
                                    })
                                })
                            })
                        }
                        // if (item.name === '价格') {
                        //     item.type = 'price_range'
                        // } else if (item.name === '级别') {
                        //     item.type = 'level'
                        // } else if (item.name === '排量') {
                        //     item.type = 'displacement'
                        // } else if (item.name === '国别') {
                        //     item.type = 'country'
                        // } else if (item.name === '变速箱') {
                        //     item.type = 'gearbox'
                        // } else if (item.name === '车身类型') {
                        //     item.type = 'body_type'
                        // } else if (item.name === '驱动方式') {
                        //     item.type = 'driving_mode'
                        // } else if (item.name === '产地') {
                        //     item.type = 'production_place'
                        // } else if (item.name === '燃料') {
                        //     item.type = 'fuel'
                        // } else if (item.name === '座位数') {
                        //     item.type = 'seat_num'
                        // } else if (item.name === '排放标准') {
                        //     item.type = 'emission_standard'
                        // } else if (item.name === '气缸数') {
                        //     item.type = 'cylinder_num'
                        // }
                    })
                    that.selectData = res
                    that.load()
                    that.$forceUpdate()
                }
            })
        },
        dealPostData() {
            let that = this
            let postData = {}
            // debugger
            that.selectData.forEach((item, i) => {
                // postData[item.type]
                let ids = []
                item.children.forEach((item2, i) => {
                    if (item2.select) {
                        ids.push(item2.id)
                    }
                })
                postData[item.type] = ids.join(',')
            })
            return postData
        },
        load() {
            let that = this
            let postData = that.dealPostData()
            u.request({
                url: u.API.Select,
                data: postData,
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    that.resultcount = res
                }
            })
        },
        selectCar(obj, parent) {
            // console.log(obj)
            // console.log(parent)
            let that = this

            if (!obj.id) {
                return false
            }
            if (parent.ismultiple == '1') {
                // 多选
                parent.children.forEach((item, i) => {
                    if (obj.id === item.id) {
                        item.select = !item.select
                    }
                })
            } else {
                // 单选
                parent.children.forEach((item, i) => {
                    if (obj.id === item.id) {
                        item.select = !item.select
                    } else {
                        item.select = false
                    }
                })
            }
            that.$forceUpdate()
            that.load()
        }
    },
    onLoad() {
        let that = this
        that.init()
    },
    onShow() {}
}
</script>

<style scoped>
.result {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: #f5f5f5;
}
.result-reset {
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    text-align: center;
    line-height: 24px;
    height: 24px;
    margin-top: 7px;
    padding: 0 10px;
    margin-left: 20upx;
    float: left;
}
.result-count {
    background-color: #10a2ff;
    border: 1px solid #10a2ff;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 24px;
    height: 24px;
    margin-top: 7px;
    padding: 0 10px;
    margin-right: 20upx;
    float: right;
}

/* 标题 */
.title {
    margin: 0px 20upx;
    height: 25px;
    border-bottom: 1upx solid #e7e7e7;
}
.title__tit {
    float: left;
    line-height: 25px;
    color: #333;
    border-bottom: 4upx solid #10a2ff;
}
.title__r {
    line-height: 25px;
    float: right;
    color: #777;
    font-size: 12px;
}
.sel {
    margin: 10px 20upx 10px 0;
    overflow: hidden;
}
.sel-level-tit {
    margin: 10px 20upx;
}

.sel-level-con{
    overflow: hidden;
}
.sel-item {
    width: 223upx;
    margin: 5px 0 5px 20upx;
    border: 1upx solid #e3e3e3;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #333;
    float: left;
}
.sel-item--tit {
    width: 100%;
    margin: 5px 0 5px 20upx;
    float: left;
}
.sel-item--cur {
    color: #10a2ff!important;
    border: 1upx solid #10a2ff!important;
}
.sel-item--disable {
    color: #777;
    border: 1upx solid #e4e4e4;
    color: #e3e3e3;
}
.sel-item text {
    display: block;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
}
</style>
