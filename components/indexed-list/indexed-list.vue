<template>
    <view class="indexed-list" ref="list" id="list" :style="{'top': titleHeight + 'px'}">
        <scroll-view :scroll-into-view="scrollViewId" class="indexed-list__scroll" scroll-y>
            <slot></slot>

            <!-- <view v-for="(item, index) in indexedListData" :key="index" :id="'indexed-list-' + index">
                <view class="indexedList-letter">
                    {{item.title}}
                </view>
                <view class="indexedList-city" v-if="item.city && item.city.length > 0">
                    <view class="indexedList-city-item" v-for="(item1, index1) in item.city" :key="index1" @click="selectCity(item1)">
                        {{item1.title}}
                    </view>
                </view>
            </view> -->


        </scroll-view>
        <view :class="touchmove ? 'indexed-list__menu--active' : ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd" class="indexed-list__menu" :style="{height:barHeight + 'px',marginTop:barTop + 'px'}">
            <view v-for="(item, index) in indexedListData" :key="index" class="indexed-list__menu-item">
                <text class="indexed-list__menu-text" :class="touchmoveIndex == index ? 'indexed-list__menu-text--active' : ''">{{item.title}}</text>
            </view>
        </view>
        <view v-if="touchmove" class="indexed-list__alert-wrapper">
            <text class="indexed-list__alert">{{indexedListData[touchmoveIndex].title}}</text>
        </view>
    </view>
</template>

<script>
import u from '@/common/util'
export default {
    name: 'indexed-list',
    components: {},
    computed: {},
    data() {
        return {
            indexedListHeight: 0,
            barHeight: 0,
            barTop: 0,
            barItemHeight: 0,
            touchmove: false,
            touchmoveIndex: -1,
            scrollViewId: ''
        }
    },
    props: {
        titleHeight: {
            type: Number,
            default: 0
        },
        indexedListData: {
            type: Array,
            default: []
        },
        isShowLogo: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        let that = this
        uni.createSelectorQuery()
            .in(that)
            .select('#list')
            .boundingClientRect()
            .exec(ret => {
                console.log(ret)
                that.indexedListHeight = ret[0].height
                that.barHeight = that.indexedListHeight * 0.8
                that.barTop = that.indexedListHeight * 0.1
                // that.barItemHeight = that.barHeight / that.indexedListData.length
                // console.log(that.barItemHeight)
            })
    },
    methods: {
        touchStart(e) {
            let that = this
            that.barItemHeight = that.barHeight / that.indexedListData.length
            that.touchmove = true
            let pageY = e.touches[0].pageY
            let index = Math.floor(
                (pageY - that.titleHeight - that.barTop) / that.barItemHeight
            )
            // debugger
            console.log(index)
            let item = that.indexedListData[index]
            if (item) {
                that.scrollViewId = 'indexed-list-' + index
                that.touchmoveIndex = index
            }
        },
        touchMove(e) {
            let that = this
            let pageY = e.touches[0].pageY
            let index = Math.floor(
                (pageY - that.titleHeight - that.barTop) / that.barItemHeight
            )

            console.log(that.touchmoveIndex)
            if (that.touchmoveIndex === index) {
                return false
            }
            let item = that.indexedListData[index]
            if (item) {
                that.scrollViewId = 'indexed-list-' + index
                that.touchmoveIndex = index
            }
        },
        touchEnd() {
            let that = this
            that.touchmove = false
            that.touchmoveIndex = -1
        }
    }
}
</script>

<style scope>
.indexed-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
}

.indexed-list__scroll {
    flex: 1;
}

.indexed-list__menu {
    width: 20px;
    /* background-color: lightgrey; */
    display: flex;
    flex-direction: column;
}

.indexed-list__menu-item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.indexed-list__menu-text {
    line-height: 15px;
    font-size: 12px;
    text-align: center;
    color: #aaa;
}

.indexed-list__menu--active {
    /* background-color: rgb(200, 200, 200); */
}

.indexed-list__menu-text--active {
    color: #007aff;
}

.indexed-list__alert-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.indexed-list__alert {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
}


.indexedList-letter {
    line-height: 90px;
}
</style>