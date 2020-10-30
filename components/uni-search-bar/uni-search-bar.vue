<template>
    <view class="uni-searchbar">
        <view class="uni-searchbar__box" @click="searchClick">
            <uni-icon class="uni-searchbar__box-icon-search" color="#999999" size="18" type="search" />

            <input class="uni-searchbar__box-search-input" v-if="show" :focus="showSync" :placeholder="placeholder" :maxlength="maxlength" @confirm="confirm" confirm-type="search" type="text" v-model="searchVal" />
            <text v-else class="uni-searchbar__text-placeholder">{{ placeholder }}</text>

            <view class="uni-searchbar__box-icon-clear" v-if="show && (clearButton === 'always' || clearButton === 'auto' && searchVal !== '')" @click="clear">
                <uni-icon color="#999999" class="" size="20" type="clear" />
            </view>
        </view>
        <text @click="cancel" class="uni-searchbar__cancel" v-if="cancelButton ==='always' || show && cancelButton ==='auto'">取消</text>
    </view>
</template>

<script>
import uniIcon from '../uni-icon/uni-icon.vue'

/**
 * SearchBar 搜索栏
 * @description 评分组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=866
 * @property {Number} maxlength 输入最大长度
 * @property {String} placeholder 搜索栏Placeholder
 * @property {String} clearButton = [always|auto|none] 是否显示清除按钮
 * 	@value always 一直显示
 * 	@value auto 输入框不为空时显示
 * 	@value none 一直不显示
 * @property {String} cancelButton = [always|auto|none] 是否显示取消按钮
 * 	@value always 一直显示
 * 	@value auto 输入框不为空时显示
 * 	@value none 一直不显示
 * @event {Function} confirm uniSearchBar 的输入框 confirm 事件，返回参数为uniSearchBar的value，e={value:Number}
 * @event {Function} input uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value，e={value:Number}
 * @event {Function} cancel 点击取消按钮时触发事件，返回参数为uniSearchBar的value，e={value:Number}
 */

export default {
    name: 'UniSearchBar',
    components: {
        uniIcon
    },
    props: {
        placeholder: {
            type: String,
            default: '请输入搜索内容'
        },
        clearButton: {
            type: String,
            default: 'auto'
        },
        cancelButton: {
            type: String,
            default: 'auto'
        },
        maxlength: {
            type: [Number, String],
            default: 100
        }
    },
    data() {
        return {
            show: false,
            showSync: false,
            searchVal: ''
        }
    },
    watch: {
        searchVal() {
            this.$emit('input', {
                value: this.searchVal
            })
        }
    },
    mounted() {
        let that = this
    },
    methods: {
        searchClick() {
            let that = this
            if (that.show && that.showSync) {
                return
            }
            that.$emit('focus')
            that.show = true
            that.$nextTick(() => {
                that.showSync = true
            })
        },
        setSearchVal(str) {
            let that = this
            that.searchVal = str
            if (!that.show) {
                that.show = true
            }
        },
        clear() {
            let that = this
            that.searchVal = ''
            that.showSync = false
            that.$nextTick(() => {
                that.showSync = true
            })
        },
        cancel() {
            let that = this
            that.$emit('cancel', {
                value: that.searchVal
            })
            that.searchVal = ''
            that.show = false
            that.showSync = false
            uni.hideKeyboard()
        },
        confirm() {
            let that = this
            uni.hideKeyboard()
            that.$emit('confirm', {
                value: that.searchVal
            })
        }
    }
}
</script>

<style scoped>
.uni-searchbar {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 10px 10px;
    background-color: #f1f1f1;
}

.uni-searchbar__box {
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    flex: 1;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    height: 25px;
    background-color: #fff;
    /* padding: 5px 8px 5px 8px; */
    /* border-width: 1upx;
		border-style: solid;
		border-color: #e5e5e5; */
}

.uni-searchbar__box-icon-search {
    display: flex;
    flex-direction: row;
    width: 30px;
    justify-content: center;
    align-items: center;
    color: #808080;
}

.uni-searchbar__box-search-input {
    flex: 1;
    font-size: 14px;
    color: #333;
}

.uni-searchbar__box-icon-clear {
    align-items: center;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
}

.uni-searchbar__text-placeholder {
    font-size: 14px;
    color: #808080;
    margin-left: 5px;
}

.uni-searchbar__cancel {
    padding-left: 10px;
    line-height: 25px;
    font-size: 14px;
    color: #333;
}
</style>