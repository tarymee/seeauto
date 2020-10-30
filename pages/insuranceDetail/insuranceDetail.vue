<template>
<view>
    <navbar :title="title"></navbar>
	<!-- 保险详情内容区 -->
	<view class="container">
		<!-- 保险详情价格面板 -->
		<view class="insuranceMessage">
			<view class="insurancePrice">
				保险总价: {{insurance}} (元)
			</view>
			<view class="insuranceExplain">
				价格仅供参考，通常新车的保险会比上面的计算结果高，尤其是豪车会高很多。
			</view>
		</view>
		<!-- 保险详情价格列表 -->
		<view class="insurancePriceList">
			<!-- <uni-list class="insurancePriceItem">
				<uni-list-item>
					<uni-list class="twoItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'compulsoryInsurance') ">交强险</uni-list-item>
						<uni-list-item>
							<picker :range="compulsoryInsuranceItem" @change="getCompulsoryInsuranceIndex" :value="compulsoryInsuranceIndex">
								<view>{{compulsoryInsurancePrice[compulsoryInsuranceIndex]}}</view>
								<view>{{compulsoryInsurance}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="twoItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'thirdInsurance')">第三者责任险</uni-list-item>
						<uni-list-item>
							<picker :range="thirdInsuranceItem" @change="getThirdInsuranceIndex" :value="thirdInsuranceIndex">
								<view>{{thirdInsurancePrice[thirdInsuranceIndex]}}</view>
								<view>{{thirdInsurance}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="threeItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'vehicleLossInsurance')">车辆损失险</uni-list-item>
						<uni-list-item v-bind:class="[isVehicleLossInsurance ? '' : 'gray']">{{vehicleLossInsurance}}</uni-list-item>
						<uni-list-item>
							<image :src="vehicleLossInsuranceIcon" @tap="setVehicleLossInsurance"></image>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="threeItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'wholeCarTheftRescue')">全车盗抢险</uni-list-item>
						<uni-list-item v-bind:class="[isWholeCarTheftRescue ? '' : 'gray']">{{wholeCarTheftRescue}}</uni-list-item>
						<uni-list-item>
							<image :src="wholeCarTheftRescueIcon" @tap="setWholeCarTheftRescue"></image>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="twoItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'glassBreakageRisk')">玻璃单独破碎险</uni-list-item>
						<uni-list-item>
							<picker :range="glassBreakageRiskItem" @change="getGlassBreakageRiskIndex" :value="glassBreakageRiskIndex">
								<view>{{glassBreakageRiskItem[glassBreakageRiskIndex]}}</view>
								<view>{{glassBreakageRisk}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="threeItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'spontaneousCombustionLoss')">自然损失险</uni-list-item>
						<uni-list-item v-bind:class="[isSpontaneousCombustionLoss ? '' : 'gray']">{{spontaneousCombustionLoss}}</uni-list-item>
						<uni-list-item>
							<image :src="spontaneousCombustionLossIcon" @tap="setSpontaneousCombustionLoss"></image>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="threeItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'exclusiveCoverage')">不计免赔特约险</uni-list-item>
						<uni-list-item v-bind:class="[isExclusiveCoverage ? '' : 'gray']">{{exclusiveCoverage}}</uni-list-item>
						<uni-list-item>
							<image :src="exclusiveCoverageIcon" @tap="setExclusiveCoverage"></image>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="threeItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'noLiability')">无过责任险</uni-list-item>
						<uni-list-item v-bind:class="[isNoLiability ? '' : 'gray']">{{noLiabilityPrice[thirdInsuranceIndex]}}</uni-list-item>
						<uni-list-item v-bind:class="[isNoLiability ? '' : 'gray']">{{noLiability}}</uni-list-item>
						<uni-list-item>
							<image :src="noLiabilityIcon" @tap="setNoLiability"></image>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="twoItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'onBoardLiability')">车上人员责任险</uni-list-item>
						<uni-list-item>
							<picker :range="onBoardLiabilityItem" @change="getOnBoardLiabilityIndex" :value="onBoardLiabilityIndex">
								<view>{{onBoardLiabilityPrice[onBoardLiabilityIndex]}}</view>
								<view>{{onBoardLiability}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
				<uni-list-item>
					<uni-list class="twoItems">
						<uni-list-item class="blue" @tap="goToInfo('保险解释', 'bodyScratch')">车身划痕险</uni-list-item>
						<uni-list-item>
							<picker :range="bodyScratchItem" @change="getBodyScratchIndex" :value="bodyScratchIndex">
								<view>{{bodyScratchPrice[bodyScratchIndex]}}</view>
								<view>{{bodyScratch}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</uni-list-item>
					</uni-list>
				</uni-list-item>
			</uni-list> -->
			<view class="twoItems">
				<view class="blue" @tap="goToInfo('保险解释', 'compulsoryInsurance') ">交强险</view>
				<view>
					<picker :range="compulsoryInsuranceItem" @change="getCompulsoryInsuranceIndex" :value="compulsoryInsuranceIndex">
						<view>{{compulsoryInsurance}}</view>
						<image src="../../static/tabs/enter.png"></image>
					</picker>
				</view>
			</view>
			<view class="twoItems">
				<view class="blue" @tap="goToInfo('保险解释', 'thirdInsurance')">第三者责任险</view>
				<view>
					<picker :range="thirdInsuranceItem" @change="getThirdInsuranceIndex" :value="thirdInsuranceIndex">
						<view>{{thirdInsurance}}</view>
						<image src="../../static/tabs/enter.png"></image>
					</picker>
				</view>
			</view>
			<view class="threeItems">
				<view class="blue" @tap="goToInfo('保险解释', 'vehicleLossInsurance')">车辆损失险</view>
				<view v-bind:class="[isVehicleLossInsurance ? '' : 'gray']">{{vehicleLossInsurance}}</view>
				<view>
					<image :src="vehicleLossInsuranceIcon" @tap="setVehicleLossInsurance"></image>
				</view>
			</view>
			<view class="threeItems">
				<view class="blue" @tap="goToInfo('保险解释', 'wholeCarTheftRescue')">全车盗抢险</view>
				<view v-bind:class="[isWholeCarTheftRescue ? '' : 'gray']">{{wholeCarTheftRescue}}</view>
				<view>
					<image :src="wholeCarTheftRescueIcon" @tap="setWholeCarTheftRescue"></image>
				</view>
			</view>
			<view class="twoItems">
				<view class="blue" @tap="goToInfo('保险解释', 'glassBreakageRisk')">玻璃单独破碎险</view>
				<view>
					<picker :range="glassBreakageRiskItem" @change="getGlassBreakageRiskIndex" :value="glassBreakageRiskIndex">
						<view>{{glassBreakageRisk}}</view>
						<image src="../../static/tabs/enter.png"></image>
					</picker>
				</view>
			</view>
			<view class="threeItems">
				<view class="blue" @tap="goToInfo('保险解释', 'spontaneousCombustionLoss')">自然损失险</view>
				<view v-bind:class="[isSpontaneousCombustionLoss ? '' : 'gray']">{{spontaneousCombustionLoss}}</view>
				<view>
					<image :src="spontaneousCombustionLossIcon" @tap="setSpontaneousCombustionLoss"></image>
				</view>
			</view>
			<view class="threeItems">
				<view class="blue" @tap="goToInfo('保险解释', 'exclusiveCoverage')">不计免赔特约险</view>
				<view v-bind:class="[isExclusiveCoverage ? '' : 'gray']">{{exclusiveCoverage}}</view>
				<view>
					<image :src="exclusiveCoverageIcon" @tap="setExclusiveCoverage"></image>
				</view>
			</view>
			<view class="threeItems">
				<view class="blue" @tap="goToInfo('保险解释', 'noLiability')">无过责任险</view>
				<view v-bind:class="[isNoLiability ? '' : 'gray']">{{noLiability}}</view>
				<view>
					<image :src="noLiabilityIcon" @tap="setNoLiability"></image>
				</view>
			</view>
			<view class="twoItems">
				<view class="blue" @tap="goToInfo('保险解释', 'onBoardLiability')">车上人员责任险</view>
				<view>
					<picker :range="onBoardLiabilityItem" @change="getOnBoardLiabilityIndex" :value="onBoardLiabilityIndex">
						<view>{{onBoardLiability}}</view>
						<image src="../../static/tabs/enter.png"></image>
					</picker>
				</view>
			</view>
			<view class="twoItems">
				<view class="blue" @tap="goToInfo('保险解释', 'bodyScratch')">车身划痕险</view>
				<view>
					<picker :range="bodyScratchItem" @change="getBodyScratchIndex" :value="bodyScratchIndex">
						<view>{{bodyScratch}}</view>
						<image src="../../static/tabs/enter.png"></image>
					</picker>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
import u from '@/common/util'
import navbar from '@/components/navbar/navbar.vue'
export default {
    components: {
        navbar
    },
    data() {
        return {
            title: '保险详情',
			vehiclePrice: 0, // 车价
			insurance: 0, // 保险总价
			compulsoryInsurance: 950, // 交强险
			thirdInsurance: 0, // 第三者责任险
			vehicleLossInsurance: 0, // 车辆损失险
			wholeCarTheftRescue: 0, // 全车盗抢险
			glassBreakageRisk: 0, // 玻璃单独破碎险
			spontaneousCombustionLoss: 0, // 自然损失险
			exclusiveCoverage: 0, // 不计免赔特约险
			noLiability: 0, // 无过责任险
			onBoardLiability: 0, // 车上人员责任险
			bodyScratch: 0, // 车身划痕险
			compulsoryInsuranceItem: ['6座以下车','6座以上车'],
			compulsoryInsuranceIndex: 0,
			compulsoryInsurancePrice: [950,1100],
			thirdInsuranceItem: ['不投保','5万','10万','20万','50万','100万'],
			thirdInsuranceIndex: 4,
			thirdInsurancePrice: [0,801,971,1120,1293,1412],
			glassBreakageRiskItem: ['不投保','国产车','进口车'],
			glassBreakageRiskIndex: 0,
			onBoardLiabilityItem: ['不投保','2座','5座','6座','7座'],
			onBoardLiabilityIndex: 0,
			onBoardLiabilityPrice: [0,100,250,300,350],
			bodyScratchItem: ['不投保','2千','5千','1万','2万'],
			bodyScratchIndex: 0,
			bodyScratchPrice: [0,585,900,1170,1780],
			noLiabilityPrice: [0,160,194,224,258,282],
			icons: ['../../static/tabs/calc-unchecked.png', '../../static/tabs/calc-pass-line.png'],
			isVehicleLossInsurance: true,
			vehicleLossInsuranceIcon: '../../static/tabs/calc-pass-line.png',
			isWholeCarTheftRescue: true,
			wholeCarTheftRescueIcon: '../../static/tabs/calc-pass-line.png',
			isSpontaneousCombustionLoss: true,
			spontaneousCombustionLossIcon: '../../static/tabs/calc-pass-line.png',
			isExclusiveCoverage: true,
			exclusiveCoverageIcon: '../../static/tabs/calc-pass-line.png',
			isNoLiability: true,
			noLiabilityIcon: '../../static/tabs/calc-pass-line.png',
			/* 
			 玻璃单独破碎险 glassBreakageRisk
			 国产车 车价 * 0.0015
			 进口车 车价 * 0.0025
			 
			 车辆损失险 vehicleLossInsurance
			 车价 * 0.012
			 
			 全车盗抢险 wholeCarTheftRescue
			 车价 * 0.01
			 
			 自然损失险 spontaneousCombustionLoss
			 车价 * 0.0015
			 
			 不计免赔特约险 exclusiveCoverage
			 车价 10万
			 第三者责任险1 5万 10万 20万 50万 100万
			 第三者责任险2 801 971  1120 1293 1412
			              400 434  464  498  522
			 车价 20万
			 第三者责任险1 5万 10万 20万 50万 100万
			 第三者责任险2 801 971  1120 1293 1412
			              640 674  704  738  762
			 猜想1 车价 * 0.0024 + 第三者责任险1 * 0.00068 验证错误
			 猜想2 车价 * 0.0024 + 第三者责任险2 * 0.2 验证正确
			 */
        }
    },
    methods: {
        jump(url) {
            u.jump(url)
        },
		// 保险总价
		getInsurance: function(){
			this.insurance = this.compulsoryInsurance + this.thirdInsurance + this.glassBreakageRisk + this.onBoardLiability + this.bodyScratch;
			if (this.isVehicleLossInsurance){
				this.insurance += this.vehicleLossInsurance;
			}
			if (this.isWholeCarTheftRescue){
				this.insurance += this.wholeCarTheftRescue;
			}
			if (this.isSpontaneousCombustionLoss){
				this.insurance += this.spontaneousCombustionLoss;
			}
			if (this.isExclusiveCoverage){
				this.insurance += this.exclusiveCoverage;
			}
			if (this.isNoLiability){
				this.insurance += this.noLiability;
			}
		},
		// 交强险
		getCompulsoryInsuranceIndex: function(e){
			this.compulsoryInsuranceIndex = e.detail.value;
			this.compulsoryInsurance = this.compulsoryInsurancePrice[this.compulsoryInsuranceIndex];
			// uni.setStorage({key: 'compulsoryInsurance', data: this.compulsoryInsurance});
			try {
			    uni.setStorageSync('compulsoryInsuranceIndex', this.compulsoryInsuranceIndex);
				uni.setStorageSync('compulsoryInsurance', this.compulsoryInsurance);
			} catch (e) {
			    // error
				console.log(e);
			}
			this.getInsurance();
		},
		// 第三者责任险下标 不计免赔特约险 和 无过责任险下标
		getThirdInsuranceIndex: function(e){
			this.thirdInsuranceIndex = e.detail.value;
			this.thirdInsurance = this.thirdInsurancePrice[this.thirdInsuranceIndex];
			this.noLiability = this.noLiabilityPrice[this.thirdInsuranceIndex];
			if (this.thirdInsuranceIndex == 0){
				this.exclusiveCoverage = 0;
			}
			else{
				this.exclusiveCoverage = parseInt(this.vehiclePrice * 0.0024 + this.thirdInsurancePrice[this.thirdInsuranceIndex] * 0.2);
			}
			// uni.setStorage({key: 'thirdInsurance', data: this.thirdInsurance});
			// uni.setStorage({key: 'noLiability', data: this.noLiability});
			try{
				uni.setStorageSync('thirdInsuranceIndex', this.thirdInsuranceIndex);
				uni.setStorageSync('thirdInsurance', this.thirdInsurance);
				uni.setStorageSync('noLiability', this.noLiability);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 玻璃单独破碎险
		getGlassBreakageRiskIndex: function(e){
			this.glassBreakageRiskIndex = e.detail.value;
			if (this.glassBreakageRiskIndex == 0){
				this.glassBreakageRisk = 0;
			}
			else {
				this.isVehicleLossInsurance = true;
				this.vehicleLossInsuranceIcon = this.icons[1];
				if (this.glassBreakageRiskIndex == 1){
					this.glassBreakageRisk = this.vehiclePrice * 0.0015;
				}
				else if (this.glassBreakageRiskIndex == 2){
					this.glassBreakageRisk = this.vehiclePrice * 0.0025;
				}
			}
			// uni.setStorage({key: 'glassBreakageRiskIndex', data: this.glassBreakageRiskIndex});
			try{
				uni.setStorageSync('glassBreakageRiskIndex', this.glassBreakageRiskIndex);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 车上人员责任险
		getOnBoardLiabilityIndex: function(e){
			this.onBoardLiabilityIndex = e.detail.value;
			this.onBoardLiability = this.onBoardLiabilityPrice[this.onBoardLiabilityIndex];
			// uni.setStorage({key: 'onBoardLiability', data: this.onBoardLiability});
			try{
				uni.setStorageSync('onBoardLiabilityIndex', this.onBoardLiabilityIndex);
				uni.setStorageSync('onBoardLiability', this.onBoardLiability);
			}catch(e){
				//TODO handle the exception
			}
			this.getInsurance();
		},
		// 车身划痕险
		getBodyScratchIndex: function(e){
			this.bodyScratchIndex = e.detail.value;
			this.bodyScratch = this.bodyScratchPrice[this.bodyScratchIndex];
			// uni.setStorage({key: 'bodyScratch', data: this.bodyScratch});
			try{
				uni.setStorageSync('bodyScratchIndex', this.bodyScratchIndex);
				uni.setStorageSync('bodyScratch', this.bodyScratch);
			}catch(e){
				//TODO handle the exception
			}
			this.getInsurance();
		},
		// 车辆损失险
		setVehicleLossInsurance: function(e){
			if(this.isVehicleLossInsurance){
				this.isVehicleLossInsurance = false;
				this.vehicleLossInsuranceIcon = this.icons[0];
				this.isWholeCarTheftRescue = false;
				this.wholeCarTheftRescueIcon = this.icons[0];
				this.isExclusiveCoverage = false;
				this.exclusiveCoverageIcon = this.icons[0];
				this.glassBreakageRiskIndex = 0;
				this.glassBreakageRisk = 0;
			}
			else{
				this.isVehicleLossInsurance = true;
				this.vehicleLossInsuranceIcon = this.icons[1];
			}
			// uni.setStorage({key: 'isVehicleLossInsurance', data: this.isVehicleLossInsurance});
			try{
				uni.setStorageSync('isVehicleLossInsurance', this.isVehicleLossInsurance);
				uni.setStorageSync('isWholeCarTheftRescue', this.isWholeCarTheftRescue);
				uni.setStorageSync('isExclusiveCoverage', this.isExclusiveCoverage);
				uni.setStorageSync('glassBreakageRiskIndex', this.glassBreakageRiskIndex);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 全车盗抢险
		setWholeCarTheftRescue: function(e){
			if(this.isWholeCarTheftRescue){
				this.isWholeCarTheftRescue = false;
				this.wholeCarTheftRescueIcon = this.icons[0];
			}
			else{
				this.isWholeCarTheftRescue = true;
				this.wholeCarTheftRescueIcon = this.icons[1];
				this.isVehicleLossInsurance = true;
				this.vehicleLossInsuranceIcon = this.icons[1];
			}
			// uni.setStorage({key: 'isWholeCarTheftRescue', data: this.isWholeCarTheftRescue});
			try{
				uni.setStorageSync('isWholeCarTheftRescue', this.isWholeCarTheftRescue);
				uni.setStorageSync('isVehicleLossInsurance', this.isVehicleLossInsurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 自然损失险
		setSpontaneousCombustionLoss: function(e){
			if(this.isSpontaneousCombustionLoss){
				this.isSpontaneousCombustionLoss = false;
				this.spontaneousCombustionLossIcon = this.icons[0];
			}
			else{
				this.isSpontaneousCombustionLoss = true;
				this.spontaneousCombustionLossIcon = this.icons[1];
			}
			// uni.setStorage({key: 'isSpontaneousCombustionLoss', data: this.isSpontaneousCombustionLoss});
			try{
				uni.setStorageSync('isSpontaneousCombustionLoss', this.isSpontaneousCombustionLoss);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 不计免赔特约险
		setExclusiveCoverage: function(e){
			if(this.isExclusiveCoverage){
				this.isExclusiveCoverage = false;
				this.exclusiveCoverageIcon = this.icons[0];
			}
			else{
				this.isExclusiveCoverage = true;
				this.exclusiveCoverageIcon = this.icons[1];
				this.isVehicleLossInsurance = true;
				this.vehicleLossInsuranceIcon = this.icons[1];
			}
			// uni.setStorage({key: 'isExclusiveCoverage', data: this.isExclusiveCoverage});
			try{
				uni.setStorageSync('isExclusiveCoverage', this.isExclusiveCoverage);
				uni.setStorageSync('isVehicleLossInsurance', this.isVehicleLossInsurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			this.getInsurance();
		},
		// 无过责任险
		setNoLiability: function(e){
			if(this.isNoLiability){
				this.isNoLiability = false;
				this.noLiabilityIcon = this.icons[0];
			}
			else{
				this.isNoLiability = true;
				this.noLiabilityIcon = this.icons[1];
			}
			// uni.setStorage({key: 'isNoLiability', data: this.isNoLiability});
			try{
				uni.setStorageSync('isNoLiability', this.isNoLiability);
			}catch(e){
				//TODO handle the exception
			}
			this.getInsurance();
		},
		goToInfo: function(msgZh, msgEn){
			uni.navigateTo({
				url: '/pages/calculateInfo/info?msgEn='+msgEn+'&msgZh='+msgZh
			});
		},
    },
    onLoad: function(e){
		this.vehiclePrice = e.vehiclePrice;
		// 初始化交强险
		// this.compulsoryInsurance = this.compulsoryInsurancePrice[this.compulsoryInsuranceIndex];
		/* uni.getStorage({
			key: 'compulsoryInsuranceIndex',
			success: res => {
				this.compulsoryInsuranceIndex = res.data;
				console.log('this.compulsoryInsuranceIndex='+this.compulsoryInsuranceIndex);
			}
		}); */
		try{
			this.compulsoryInsuranceIndex = uni.getStorageSync('compulsoryInsuranceIndex');
			this.compulsoryInsurance = this.compulsoryInsurancePrice[this.compulsoryInsuranceIndex];
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化第三者责任险
		// this.thirdInsurance = this.thirdInsurancePrice[this.thirdInsuranceIndex];
		/* uni.getStorage({
			key: 'thirdInsuranceIndex',
			success: res => {
				this.thirdInsuranceIndex = res.data;
				console.log('this.thirdInsuranceIndex='+this.thirdInsuranceIndex);
			}
		}); */
		try{
			this.thirdInsuranceIndex = uni.getStorageSync('thirdInsuranceIndex');
			this.thirdInsurance = this.thirdInsurancePrice[this.thirdInsuranceIndex];
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化车辆损失险
		// this.vehicleLossInsurance = this.vehiclePrice * 0.012;
		try{
			// if ('true' == uni.getStorageSync('isVehicleLossInsurance')){
			if (uni.getStorageSync('isVehicleLossInsurance')){
				this.isVehicleLossInsurance = true;
				this.vehicleLossInsuranceIcon = this.icons[1];
			}
			else{
				this.isVehicleLossInsurance = false;
				this.vehicleLossInsuranceIcon = this.icons[0];
			}
			this.vehicleLossInsurance = this.vehiclePrice * 0.012;
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化全车盗抢险
		// this.wholeCarTheftRescue = this.vehiclePrice * 0.01;
		try{
			// if ('true' == uni.getStorageSync('isWholeCarTheftRescue')){
			if (uni.getStorageSync('isWholeCarTheftRescue')){
				this.isWholeCarTheftRescue = true;
				this.wholeCarTheftRescueIcon = this.icons[1];
			}
			else{
				this.isWholeCarTheftRescue = false;
				this.wholeCarTheftRescueIcon = this.icons[0];
			}
			this.wholeCarTheftRescue = this.vehiclePrice * 0.01;
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化玻璃单独破碎险
		// this.glassBreakageRiskIndex = 0;
		// this.glassBreakageRisk = 0;
		/* uni.getStorage({
			key: 'glassBreakageRiskIndex',
			success: res => {
				this.glassBreakageRiskIndex = res.data;
				console.log('this.glassBreakageRiskIndex='+this.glassBreakageRiskIndex);
			}
		}); */
		try{
			this.glassBreakageRiskIndex = parseInt(uni.getStorageSync('glassBreakageRiskIndex'));
			// if ('0' == this.glassBreakageRiskIndex){
			if (0 == this.glassBreakageRiskIndex){
				this.glassBreakageRisk = 0;
			}
			// else if ('1' == this.glassBreakageRiskIndex){
			else if (1 == this.glassBreakageRiskIndex){
				this.glassBreakageRisk = parseInt(parseInt(this.vehiclePrice) * 0.0015);
			}
			// else if ('2' == this.glassBreakageRiskIndex){
			else if (2 == this.glassBreakageRiskIndex){
				this.glassBreakageRisk = parseInt(parseInt(this.vehiclePrice) * 0.0025);
			}
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化自然损失险
		// this.spontaneousCombustionLoss = this.vehiclePrice * 0.0015;
		try{
			// if ('true' == uni.getStorageSync('isSpontaneousCombustionLoss')){
			if (uni.getStorageSync('isSpontaneousCombustionLoss')){
				this.isSpontaneousCombustionLoss = true;
				this.spontaneousCombustionLossIcon = this.icons[1];
			}
			else{
				this.isSpontaneousCombustionLoss = false;
				this.spontaneousCombustionLossIcon = this.icons[0];
			}
			this.spontaneousCombustionLoss = this.vehiclePrice * 0.0015;
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化不计免赔特约险
		// this.exclusiveCoverage = 0;
		try{
			/* if('0' != uni.getStorageSync('thirdInsurance') && 'true' == uni.getStorageSync('isVehicleLossInsurance')){
				this.exclusiveCoverage = parseInt(parseInt(this.vehiclePrice) * 0.0024 + parseInt(uni.getStorageSync('thirdInsurance')) * 0.2);
			}
			else{
				this.exclusiveCoverage = 0;
			} */
			this.exclusiveCoverage = parseInt(parseInt(this.vehiclePrice) * 0.0024 + parseInt(uni.getStorageSync('thirdInsurance')) * 0.2);
			// if ('true' == uni.getStorageSync('isExclusiveCoverage')){
			if (uni.getStorageSync('isExclusiveCoverage')){
				this.isExclusiveCoverage = true;
				this.exclusiveCoverageIcon = this.icons[1];
			}
			else{
				this.isExclusiveCoverage = false;
				this.exclusiveCoverageIcon = this.icons[0];
			}
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化无过责任险
		try{
			this.noLiability = this.noLiabilityPrice[uni.getStorageSync('thirdInsuranceIndex')];
			// if ('true' == uni.getStorageSync('isNoLiability')){
			if (uni.getStorageSync('isNoLiability')){
				this.isNoLiability = true;
				this.noLiabilityIcon = this.icons[1];
			}
			else{
				this.isNoLiability = false;
				this.noLiabilityIcon = this.icons[0];
			}
			/* if ('0' != uni.getStorageSync('thirdInsurance')){
				this.noLiability = this.noLiabilityPrice[uni.getStorageSync('thirdInsuranceIndex')];
			}
			else{
				this.noLiability = 0;
			} */
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化车上人员责任险
		/* uni.getStorage({
			key: 'onBoardLiabilityIndex',
			success: res => {
				this.onBoardLiabilityIndex = res.data;
				console.log('this.onBoardLiabilityIndex='+this.onBoardLiabilityIndex);
			}
		}); */
		try{
			this.onBoardLiabilityIndex = uni.getStorageSync('onBoardLiabilityIndex');
			this.onBoardLiability = this.onBoardLiabilityPrice[this.onBoardLiabilityIndex];
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化车身划痕险
		/* uni.getStorage({
			key: 'bodyScratchIndex',
			success: res => {
				this.bodyScratchIndex = res.data;
				console.log('this.bodyScratchIndex='+this.bodyScratchIndex);
			}
		}); */
		try{
			this.bodyScratchIndex = uni.getStorageSync('bodyScratchIndex');
			this.bodyScratch = this.bodyScratchPrice[this.bodyScratchIndex];
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 初始化保险总价
		this.getInsurance();
	},
    onShow() {
    }
}
</script>

<style scoped>
.container{
	display: block;
	width: 100%;
	background-color: #fafafa;
}
.insuranceMessage{
	width: 100%;
	padding-top: 100upx;
	padding-left: 20upx;
	background: url(../../static/tabs/calc-background.png) top center no-repeat;
	background-size: 100% 300upx;
	position: relative;
}
.insurancePrice{
	display: block;
	width: 100%;
	height: 100upx;
	font-size: 50upx;
	color: #fafafa;
	line-height: 150upx;
}
.insuranceExplain{
	display: block;
	width: 100%;
	height: 100upx;
	color: #fafafa;
	font-size: 20upx;
	line-height: 60upx;
	font-weight: 100;
}
.blue{
	color: #17a1ff;
}
.gray{
	color: #e3e4e5;
}
/* .priceItem{
	width: 100%;
	padding: 0 20upx;
}
.insurancePriceItem{
	display: block;
	width: calc(100% - 40upx);
}
.insurancePriceItem>uni-list-item{
	display: block;
	width: 100%;
	height: 80upx;
}
.twoItems, .threeItems{
	display: block;
	width: 100%;
	height: 100%;
	border-bottom: 1px solid #e3e4e5;
}
.twoItems>uni-list-item, .threeItems>uni-list-item{
	font-size: 13px;
	float: left;
	line-height: 80upx;
}
.twoItems>uni-list-item:nth-of-type(1), .threeItems>uni-list-item:nth-of-type(1){
	width: 100px;
	height: 100%;
}
.twoItems>uni-list-item:nth-of-type(2){
	width: calc(100% - 100px);
	height: 100%;
	position: relative;
}
.twoItems>uni-list-item:nth-of-type(2)>picker{
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.twoItems>uni-list-item:nth-of-type(2) view{
	display: block;
	width: 100%;
	height: 100%;
	line-height: 80upx;
}
.twoItems>uni-list-item:nth-of-type(2) image{
	display: block;
	width: 30upx;
	height: 30upx;
	position: absolute;
	top: 30upx;
	right:30upx;
}
.threeItems>uni-list-item:nth-of-type(2){
	width: calc(100% - 150px);
	height: 100%;
}
.threeItems>uni-list-item:nth-of-type(3){
	width: 50px;
	height: 100%;
	position: relative;
}
.threeItems>uni-list-item:nth-of-type(3)>image{
	display: block;
	width: 40%;
	height: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: calc(-35% / 2);
	margin-left: calc(-40% / 2);
} */
.insurancePriceList{
	display: block;
	width: 100%;
	padding: 0 20upx;
}
.twoItems, .threeItems{
	display: block;
	width: calc(100% - 40upx);
	height: 80upx;
	border-bottom: 1px solid #e3e4e5;
}
.twoItems>view, .threeItems>view{
	font-size: 13px;
	float: left;
	line-height: 80upx;
}
.twoItems>view:nth-of-type(1), .threeItems>view:nth-of-type(1){
	width: 100px;
	height: 100%;
}
.twoItems>view:nth-of-type(2){
	width: calc(100% - 100px);
	height: 100%;
	position: relative;
}
.twoItems>view:nth-of-type(2)>picker{
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.twoItems>view:nth-of-type(2) view{
	display: block;
	width: 100%;
	height: 100%;
	line-height: 80upx;
}
.twoItems>view:nth-of-type(2) image{
	display: block;
	width: 30upx;
	height: 30upx;
	position: absolute;
	top: 30upx;
	right:30upx;
}
.threeItems>view:nth-of-type(2){
	width: calc(100% - 150px);
	height: 100%;
}
.threeItems>view:nth-of-type(3){
	width: 50px;
	height: 100%;
	position: relative;
}
.threeItems>view:nth-of-type(3)>image{
	display: block;
	width: 40%;
	height: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: calc(-35% / 2);
	margin-left: calc(-40% / 2);
}
</style>
