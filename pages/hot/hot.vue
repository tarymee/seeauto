<template>
<view>
    <!-- <navbar :title="title"></navbar> -->
    <view class="subNav">
    	<navigator url="" class="btn" @tap="changeCurrentType(0)"><image src="../../static/img/hot-icon1.png"></image><text>导购</text></navigator>
    	<navigator url="" class="btn" @tap="changeCurrentType(1)"><image src="../../static/img/hot-icon2.png"></image><text>车讯</text></navigator>
    	<navigator url="" class="btn" @tap="changeCurrentType(2)"><image src="../../static/img/hot-icon3.png"></image><text>评测</text></navigator>
    	<navigator url="" class="btn" @tap="changeCurrentType(3)"><image src="../../static/img/hot-icon4.png"></image><text>行情</text></navigator>
    	<navigator url="" class="btn" @tap="changeCurrentType(4)"><image src="../../static/img/hot-icon5.png"></image><text>用车</text></navigator>
    	<navigator url="" class="btn" @tap="changeCurrentType(5)"><image src="../../static/img/hot-icon6.png"></image><text>技术</text></navigator>
    </view>
	
	<ttBottomLoad class="" ref="ttBottomLoad" @sendData="getData">
	    <div v-for="(item, index) in ttBottomLoad_data" :key="index">
	        <list1 :list1Data="[item]" v-if="item.model == '1' && item.type == type[currentType]"></list1>
	        <list2 :list2Data="[item]" v-if="item.model == '2' && item.type == type[currentType]"></list2>
	        <list3 :list3Data="[item]" v-if="item.model == '3' && item.type == type[currentType]"></list3>
	        <list4 :list4Data="[item]" v-if="item.model == '4' && item.type == type[currentType]"></list4>
	        <list1 :list1Data="[item]" v-if="item.model == '5' && item.type == type[currentType]"></list1>
	    </div>
	</ttBottomLoad>
</view>
</template>

<script>
import u from '@/common/util'
import bus from '@/common/bus'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import list1 from '@/components/list1/list1.vue'
import list2 from '@/components/list2/list2.vue'
import list3 from '@/components/list3/list3.vue'
import list4 from '@/components/list4/list4.vue'
export default {
    components: {
		list1,
        list2,
        list3,
        list4,
        uniIcon,
        ttBottomLoad,
    },
    data() {
        return {
            title: '热门推荐',
			ttBottomLoad_data: [],
			ttBottomLoad_config: {
				isUseMock: false,
				pageSize: 10,
				api: u.API.hot,
				params: {
					hot: 1,
				}
			},
			// “type”=>资讯类别，默认为0，33导购，34车讯，35行情，36用车，37评测，38技术
			type: ['33', '34', '37', '35', '36', '38'],
			currentType: 0,
        }
    },
    methods: {
		getData(data) {
		    // console.log(9988888)
			let that = this;
			if (!that.ttBottomLoad_config.isUseMock) {
			    data.forEach((item) => {
			        if (item.model == '1') {
			            item.img = item.img_small
			            item.url = `/pages/article/article?id=${item.id}`
			        } else if (item.model == '2') {
			            item.img = [item.img_small, item.img_small2, item.img_small3]
			            item.url = `/pages/article/article?id=${item.id}`
			        } else if (item.model == '3') {
			            item.img = item.img_small
			            item.url = `/pages/article/article?id=${item.id}`
			        }
				})
			}
		    that.ttBottomLoad_data = data;
		},
		changeCurrentType(currentType){
			this.currentType = currentType;
		},
    },
	onReachBottom: function(t) {
	    this.$refs.ttBottomLoad.load()
	},
    onLoad() {
    },
    onShow() {
		let that = this;
		that.$refs.ttBottomLoad.init(that.ttBottomLoad_config);
    }
}
</script>

<style scoped>

.subNav{ height: 100upx; border-top: 14upx solid #f5f5f5;}
.subNav .btn{ width:125upx; height: 80upx; padding-top: 20upx; float: left; text-align: center;}
.subNav .btn image{ width: 35upx; height: 35upx;}
.subNav .btn text{ display: block; line-height: 35upx; font-size: 24upx;}
</style>
