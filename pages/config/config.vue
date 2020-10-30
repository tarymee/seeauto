<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="config-table">
            <div class="config-th">
                <div class="config-item" :class="{'config-item-tit': item.isModTitle, 'config-item-top': item.isTop}" v-for="(item, index) in configSortB" :key="index" v-if="!item.isHidden" @tap="tapClick(item, -1, index - 1)">{{item.name}}</div>
            </div>
            <scroll-view class="config-tb" scroll-x scroll-with-animation>
                <div class="config-tr" v-for="(item1, index1) in configData" :key="index1">
                    <div class="config-item" :class="{'config-item-tit': item.isModTitle, 'config-item-top': item.isTop}" v-for="(item, index) in configSortB" :key="index" v-if="!item.isHidden" @tap="tapClick(item, index1, index - 1)">
                        <div class="" v-if="item1[item.key]">
                            {{item1[item.key]}}
                            <!-- <uni-icon v-if="item.isTop" color="#f00" class="config-item-del" size="18" type="clear" @tap="delConfig(item, index1, index - 1)" /> -->
                        </div>
                        <div class="config-item-add" v-if="item.isTop && !item1[item.key]" @tap="addConfig(item, index1, index - 1)">
                            <!-- <div style="font-size: 14px;color: #10a2ff">+</div>
                            <div style="font-size: 12px;color: #10a2ff">添加</div>
                            <div style="font-size: 10px;color: #999">(最多添加4项)</div> -->
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>

    </view>
</template>
<script>
import u from '@/common/util'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        uniIcon
    },
    data() {
        return {
            title: '参数配置页',
            model_id: '',
            style_id: '',
            configData: [],
            configSort: [],
            configSortB: [],
        }
    },
    methods: {
        getConfig() {
            let that = this
            let postData = {}
            if (that.model_id) {
                postData.model_id = that.model_id
            }
            if (that.style_id) {
                postData.style_id = that.style_id
            }
            u.request({
                url: u.API.StyleParaDeatil,
                isVerifyLogin: false,
                data: postData,
                isUseMock: false,
                success(res, isUseMock) {
                    if (isUseMock) {
                        that.configSort = res.sort
                        that.configData = that.fixColumn(res.data)
                        // 把接口格式转化成页面格式
                        let configSortB = [
                            {
                                name: '车型',
                                key: 'name',
                                isTop: true,
                                isModTitle: false,
                                isHidden: false,
                                isSame: false,
                                modTitleIndex: -1,
                            }
                        ]
                        that.configSort.forEach((item, i) => {
                            configSortB.push({
                                name: item.name,
                                key: '',
                                isModTitle: true,
                                isHidden: false,
                                isSame: false,
                                modTitleIndex: i
                            })
                            if (item.children) {
                                item.children.forEach((item2, j) => {
                                    let obj = {
                                        name: item2.name,
                                        key: item2.key,
                                        isModTitle: false,
                                        isHidden: false,
                                        isSame: false,
                                        modTitleIndex: i
                                    }
                                    // if (i !== 0) {
                                    //     obj.isHidden = true
                                    // }
                                    configSortB.push(obj)
                                })
                            }
                        })
                        that.configSortB = configSortB

                        // console.log(that.configSort)
                        // console.log(JSON.stringify(that.configData))
                        // console.log(JSON.stringify(that.configSortB))
                    } else {
                        console.log(res)
                        // that.configData = that.fixColumn(res.data)
                        let configData = []
                        let configSortB = [
                            {
                                name: '车款',
                                key: 'name',
                                isTop: true,
                                isModTitle: false,
                                isHidden: false,
                                isSame: false,
                                modTitleIndex: -1,
                            }
                        ]
                        if (res.data && res.data.length) {
                            res.data.forEach((item, i) => {
                                let data = {
                                    'name': item.model_name + item.style_name,
                                    'style_id': item.style_id,
                                    'style_name': item.style_name,
                                    'model_id': item.model_id,
                                    'model_name': item.model_name,
                                }
                                if (item.children && item.children.length) {
                                    item.children.forEach((item2, i) => {
                                        if (item2.children && item2.children.length) {
                                            item2.children.forEach((item3, i) => {
                                                if (item3.parameter_name === '价格') {
                                                    item3.parameter_value = item3.parameter_value + '万'
                                                }
                                                data[item3.parameter_name] = item3.parameter_value
                                            })
                                        }
                                    })
                                }
                                configData.push(data)
                            })


                            res.data[0].children.forEach((item, i) => {
                                configSortB.push({
                                    name: item.name,
                                    key: '',
                                    isModTitle: true,
                                    isHidden: false,
                                    isSame: false,
                                    modTitleIndex: i
                                })
                                if (item.children && item.children.length) {
                                    item.children.forEach((item2, j) => {
                                        let obj = {
                                            name: item2.parameter_name,
                                            key: item2.parameter_name,
                                            isModTitle: false,
                                            isHidden: false,
                                            isSame: false,
                                            modTitleIndex: i
                                        }
                                        configSortB.push(obj)
                                    })
                                }
                            })


                        }
                        that.configData = that.fixColumn(configData)
                        that.configSortB = configSortB
                        console.log(that.configData)
                    }
                    // that.$forceUpdate()
                }
            })
        },
        fixColumn(data) {
            // 至少3个才能占满
            let that = this
            if (data.length == 0) {
                data.push({})
                data.push({})
                data.push({})
            } else if (data.length == 1) {
                data.push({})
                data.push({})
            } else if (data.length == 2) {
                data.push({})
            } else if (data.length == 3) {
                // data.push({})
            }
            return data
        },
        tapClick(obj, columnindex, rowindex) {
            let that = this
            console.log(obj, columnindex, rowindex)

            // 隐藏显示模块
            if (obj.isModTitle) {
                that.configSortB.forEach((item, i) => {
                    if (item.modTitleIndex === obj.modTitleIndex && !item.isModTitle) {
                        item.isHidden = !item.isHidden
                    }
                })
            }

            console.log(that.configSortB)
            that.$forceUpdate()
        },
        delConfig(obj, columnindex, rowindex) {
            let that = this
            if (that.configData.length === 1) {
                uni.showToast({
                    title: '至少存在一个',
                    icon: 'none'
                })
                return false
            }
            that.configData.splice(columnindex, 1)
            that.configData = that.fixColumn(that.configData)
        },
        addConfig() {

        }
    },
    onLoad(e) {
        let that = this
        if (e.model_id) {
            that.model_id = e.model_id
        }
        if (e.style_id) {
            that.style_id = e.style_id
        }
        that.getConfig()
    },
    onShow() {}
}
</script>
<style scoped>
.config-table {
    border-top: 1upx solid #e7e7e7;
    border-bottom: 1upx solid #e7e7e7;
    overflow: hidden;
    display: flex;
    font-size: 11px;
}
.config-th {
    width: 180upx;
}
.config-th .config-item {
    width: 180upx;
    background-color: #f3f3f3;
}
.config-tb {
    white-space: nowrap;
    width: 600upx;
}
.config-tr {
    display: inline-block;
    vertical-align: top;
}
.config-item {
    border-right: 1upx solid #e7e7e7;
    border-bottom: 1upx solid #e7e7e7;
    width: 190upx;
    height: 50px;
    padding: 0 10px;
    white-space: normal;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.config-item-tit {
    /* font-size: 14px; */
    background-color: #fff!important;
    border-right: 1upx solid transparent;
    height: 30px;
    justify-content: flex-start;
}
.config-item-top {
    height: 70px;
}
.config-item-del {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
}
.config-item-add {
    text-align: center;
}
</style>
