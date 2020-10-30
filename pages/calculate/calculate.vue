<template>
	<view>
		<!-- 购车计算器顶部功能区 -->
		<!-- <navbar :title="title">{{title}}</navbar> -->
		<!-- 购车计算器内容区 -->
		<view class="container">
			<!-- 贷款购车购车计算器功能面板 -->
			<view class="loanPanel" v-if="isLoan">
				<!-- 贷款购车功能面板的图标按钮组 -->
				<view class="loanGroup">
					<view class="loanIcon">
						<image src="../../static/tabs/calc-icon-loan.png"></image>
					</view>
					<view class="buttonGroup">
						<!-- 贷款购买按钮 -->
						<button @tap="setLoan" v-bind:class="[ isLoan ? 'active' : '' ]">{{titleGroup[0]}}</button>
						<!-- 全款购买按钮 -->
						<button @tap="noLoan" v-bind:class="[ isLoan ? '' : 'active' ]">{{titleGroup[1]}}</button>
					</view>
				</view>
				<!-- 购车计算器价格列表 -->
				<view class="loanMessage">
					<!-- <uni-list>
						<uni-list-item>
							<uni-list class="loanMessageItem">
								<uni-list-item>首付(元)</uni-list-item>
								<uni-list-item>{{downpayment}}</uni-list-item>
							</uni-list>
						</uni-list-item>
						<uni-list-item>
							<uni-list class="loanMessageItem">
								<uni-list-item>月供(元)</uni-list-item>
								<uni-list-item>{{monthlyPayment}}</uni-list-item>
							</uni-list>
						</uni-list-item>
						<uni-list-item>
							<uni-list class="loanMessageItem">
								<uni-list-item>利息(元)</uni-list-item>
								<uni-list-item>{{interest}}</uni-list-item>
							</uni-list>
						</uni-list-item>
						<uni-list-item>
							<uni-list class="loanMessageItem">
								<uni-list-item>总价(元)</uni-list-item>
								<uni-list-item>{{total}}</uni-list-item>
							</uni-list>
						</uni-list-item>
					</uni-list> -->
					<view class="loanMessageItem">
						<view>首付(元)</view>
						<view>{{downpayment}}</view>
					</view>
					<view class="loanMessageItem">
						<view>月供(元)</view>
						<view>{{monthlyPayment}}</view>
					</view>
					<view class="loanMessageItem">
						<view>利息(元)</view>
						<view>{{interest}}</view>
					</view>
					<view class="loanMessageItem">
						<view>总价(元)</view>
						<view>{{total}}</view>
					</view>
				</view>
			</view>
			<!-- 全款购车购车计算器功能面板 -->
			<view class="fullPurchasePanel" v-if="isLoan == false">
				<!-- 全款购车功能面板的图标按钮组 -->
				<view class="fullPurchaseGroup">
					<view class="buttonGroup">
						<!-- 贷款购买按钮 -->
						<button @tap="setLoan" v-bind:class="[ isLoan ? 'active' : '' ]">{{titleGroup[0]}}</button>
						<!-- 全款购买按钮 -->
						<button @tap="noLoan" v-bind:class="[ isLoan ? '' : 'active' ]">{{titleGroup[1]}}</button>
					</view>
					<view class="fullPurchaseMessage">
						<!-- <uni-list>
							<uni-list-item>全款(元)</uni-list-item>
							<uni-list-item>{{fullPayment}}</uni-list-item>
						</uni-list> -->
						<view>全款(元)</view>
						<view>{{fullPayment}}</view>
					</view>
				</view>
				<view class="fullPurchaseIcon">
					<image src="../../static/tabs/calc-fullPurchase.png"></image>
				</view>
			</view>
			<!--  购车计算器价格清单 -->
			<view class="priceList">
				<!-- <uni-list class="fullPurchasePriceItem">
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item>车价</uni-list-item>
							<uni-list-item>
								<input type="number" :value="vehiclePrice" placeholder="请输入裸车价格" />
								<input type="number" v-model="vehiclePriceDisplay" placeholder="请输入裸车价格" @input="vehiclePriceInput" />
								<input type="number" v-model="vehiclePrice" placeholder="请输入裸车价格" @input="vehiclePriceInput" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="threeItems">
							<uni-list-item class="blue" @tap="goToInfo('purchaseTax','购置税计算方式')">购置税</uni-list-item>
							<uni-list-item v-bind:class="[isPurchaseTax ? '' : 'gray']">{{purchaseTax}}</uni-list-item>
							<uni-list-item>
								<image :src="icon" @tap="setPurchaseTaxIcon"></image>
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item class="blue" @tap="goToInsuranceDetail">保险</uni-list-item>
							<uni-list-item class="blue" @tap="goToInsuranceDetail">{{insurance}}</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item class="blue" @tap="goToInfo('retrofitting','何为加装?')">加装</uni-list-item>
							<uni-list-item>
								<input type="number" v-model="retrofittingDisplay" placeholder="请输入加装定制费用" @input="retrofittingInput" />
								<input type="number" v-model="retrofitting" placeholder="请输入加装定制费用" @input="retrofittingInput" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item class="blue" @tap="goToInfo('playingCards','上牌费用')">上牌</uni-list-item>
							<uni-list-item>
								<input type="number" v-model="playingCardsDisplay" placeholder="请输入上牌费用" @input="playingCardsInput" />
								<input type="number" v-model="playingCards" placeholder="请输入上牌费用" @input="playingCardsInput" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
				</uni-list>-->
				<view class="fullPurchasePriceList">
					<view class="twoItems">
						<view>车价</view>
						<view>
							<input type="number" v-model="vehiclePrice" placeholder="请输入裸车价格" @input="vehiclePriceInput" />
						</view>
					</view>
					<view class="threeItems">
						<view class="blue" @tap="goToInfo('purchaseTax','购置税计算方式')">购置税</view>
						<view v-bind:class="[isPurchaseTax ? '' : 'gray']">{{purchaseTax}}</view>
						<view>
							<image :src="icon" @tap="setPurchaseTaxIcon"></image>
						</view>
					</view>
					<view class="twoItems">
						<view class="blue" @tap="goToInsuranceDetail">保险</view>
						<view class="blue" @tap="goToInsuranceDetail">{{insurance}}</view>
					</view>
					<view class="twoItems">
						<view class="blue" @tap="goToInfo('retrofitting','何为加装?')">加装</view>
						<view>
							<input type="number" v-model="retrofitting" placeholder="请输入加装定制费用" @input="retrofittingInput" />
						</view>
					</view>
					<view class="twoItems">
						<view class="blue" @tap="goToInfo('playingCards','上牌费用')">上牌</view>
						<view>
							<input type="number" v-model="playingCards" placeholder="请输入上牌费用" @input="playingCardsInput" />
						</view>
					</view>
				</view>
				<!--<uni-list class="loanPriceItem" v-if="isLoan">
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item>首付比例</uni-list-item>
							<uni-list-item>
								<picker :range="downPaymentRatioItem" @change="getDownPaymentRatioIndex" :value="downPaymentRatioIndex">
									<view>{{downPaymentRatioItem[downPaymentRatioIndex]}}</view>
									<image src="../../static/tabs/enter.png"></image>
								</picker>
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item>利率</uni-list-item>
							<uni-list-item>
								<input type="number" v-model="interestRateDisplay" placeholder="请输入贷款利率" @input="loanCompute" />
								<input type="number" v-model="interestRate" placeholder="请输入贷款利率" @input="loanCompute" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item>期数</uni-list-item>
							<uni-list-item>
								<input type="number" v-model="periodsDisplay" placeholder="请输入贷款期数" @input="loanCompute" />
								<input type="number" v-model="periods" placeholder="请输入贷款期数" @input="loanCompute" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
					<uni-list-item>
						<uni-list class="twoItems">
							<uni-list-item class="blue" @tap="goToInfo('serviceCharge','何为手续费?')">手续费</uni-list-item>
							<uni-list-item>
								<input type="number" v-model="serviceChargeDisplay" placeholder="请输入贷款期数" />
								<input type="number" v-model="serviceCharge" placeholder="请输入贷款期数" />
							</uni-list-item>
						</uni-list>
					</uni-list-item>
				</uni-list> -->
				<view class="loanPriceList" v-if="isLoan">
					<view class="twoItems">
						<view>首付比例</view>
						<view>
							<picker :range="downPaymentRatioItem" @change="getDownPaymentRatioIndex" :value="downPaymentRatioIndex">
								<view>{{downPaymentRatioItem[downPaymentRatioIndex]}}</view>
								<image src="../../static/tabs/enter.png"></image>
							</picker>
						</view>
					</view>
					<view class="twoItems">
						<view>利率</view>
						<view>
							<input type="number" v-model="interestRate" placeholder="请输入贷款利率" @input="loanCompute" />
						</view>
					</view>
					<view class="twoItems">
						<view>期数</view>
						<view>
							<input type="number" v-model="periods" placeholder="请输入贷款期数" @input="loanCompute" />
						</view>
					</view>
					<view class="twoItems">
						<view class="blue" @tap="goToInfo('serviceCharge','何为手续费?')">手续费</view>
						<view>
							<input type="number" v-model="serviceCharge" placeholder="请输入贷款期数" />
						</view>
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
            title: '', // 页面标题
			titleGroup: ['贷款购车', '全款购车'], // 页面标题组
			titleIndex: 0, // 页面标题下标
			downpayment: 0, //首付
			monthlyPayment: 0.00, // 月供
			interest: 0.00, //利息
			total: 0.00, // 总价
			fullPayment: 0, // 全款
			vehiclePrice: '', // 车价
			// vehiclePriceDisplay: '', // 页面显示的车价
			// vehiclePriceCompute: 0, // 计算时的取值
			purchaseTax: 0, // 购置税
			insurance: 0, // 保险
			retrofitting: 0, // 加装
			// retrofittingDisplay: 0, // 页面显示的加装
			// retrofittingCompute: 0, // 计算时的加装
			playingCards: 2000, // 上牌
			// playingCardsDisplay: 2000, // 页面显示的上牌
			// playingCardsCompute: 2000, // 计算时的上牌
			downPaymentRatio: 0.4,
			downPaymentRatioItem: ['1成','2成','3成','4成','5成','6成','7成','8成','9成'], // 首付比例
			downPaymentRatioPercent: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9], //首付百分比
			downPaymentRatioIndex: 3, // 首付比例下标
			interestRate: 4.75, // 利率
			// interestRateDisplay: 4.75, // 页面显示的利率
			// interestRateCompute: 4.75, // 计算时的利率
			periods: 36, // 期数
			// periodsDisplay: 36, // 页面显示的期数
			// periodsCompute: 36, // 计算时的期数
			serviceCharge: 5000, // 手续费
			// serviceChargeDisplay: 5000, // 页面显示的手续费
			// serviceChargeCompute: 5000, // 计算时的手续费
			isLoan: true, // 是否贷款购车
			isPurchaseTax: true, // 是否含有购置税
			icon: '../../static/tabs/calc-pass-line.png',
			icons: ['../../static/tabs/calc-unchecked.png', '../../static/tabs/calc-pass-line.png'],
			/* 
			 首付 downpayment
			 车价 * 首付比例 + 购置税 + 保险 + 加装 + 上牌
			 
			 月供 monthlyPayment 等额本息还款
			 [贷款 * 利率 * (1 + 利率) ^ 期数 ] / [(1 + 利率) ^ 期数 - 1]
			 
			 利息 interest
			 [月供 - 贷款 / 期数)] * 期数
			 
			 总价 total
			 车价 + 购置税 + 保险 + 加装 + 上牌 + 利息
			 
			 购置税 purchaseTax
			 车价 / 1.13 * 0.1
			 
			 保险 insurance
			 向保险详情页面请求
			 
			 加装 retrofitting
			 自行输入
			 
			 上牌 playingCards
			 自行输入
			 
			 首付比例 downPaymentRatio
			 自行选择
			 
			 利率 interestRate
			 自行输入
			 
			 期数 periods
			 自行输入
			 
			 手续费 serviceCharge
			 自行输入
			 */
        }
    },
    methods: {
        jump(url) {
            u.jump(url)
        },
		setLoan: function(e){
			this.isLoan = true;
			this.titleIndex = 0;
			this.title = this.titleGroup[this.titleIndex];
		},
		noLoan: function(e){
			this.isLoan = false;
			this.titleIndex = 1;
			this.title = this.titleGroup[this.titleIndex];
		},
		setPurchaseTaxIcon: function(e){
			if(this.isPurchaseTax){
				this.isPurchaseTax = false;
				this.icon = this.icons[0];
			}
			else{
				this.isPurchaseTax = true;
				this.icon = this.icons[1];
			}
			this.getDownpayment();
			this.getTotal();
			this.getFullPayment();
		},
		goToInfo: function(msgEn,msgZh){
			uni.navigateTo({
				url: '/pages/calculateInfo/info?msgEn='+msgEn+'&msgZh='+msgZh
			});
		},
		goToInsuranceDetail: function(){
			uni.navigateTo({
				// url: '/pages/insuranceDetail/insuranceDetail?vehiclePrice='+this.vehiclePriceCompute
				url: '/pages/insuranceDetail/insuranceDetail?vehiclePrice='+this.vehiclePrice
			})
		},
		// 首付比例
		getDownPaymentRatioIndex: function(e){
			this.downPaymentRatioIndex = e.detail.value;
			this.downPaymentRatio = this.downPaymentRatioPercent[this.downPaymentRatioIndex];
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatio) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			// this.monthlyPayment = ((parseInt(this.vehiclePrice) - parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex])) * parseFloat(this.interestRate) * MATH.pow((1 + parseFloat(this.interestRate)),parseInt(this.periods))) / (MATH.pow((1 + parseFloat(this.interestRate)),parseInt(this.periods)) - 1);
			// this.interest = (this.monthlyPayment - (parseInt(this.vehiclePrice) - parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) / parseInt(this.periods))) * parseInt(this.periods);
			// this.total = parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + this.interest;
			// console.log('getDownPaymentRatioIndex:'+'this.downPaymentRatioIndex='+this.downPaymentRatioIndex+',this.downpayment='+this.downpayment);
			this.getDownpayment();
			this.loanCompute();
			// this.getTotal();
			// console.log('loanCompute:'+'this.monthlyPayment='+this.monthlyPayment+',this.interest='+this.interest+',this.total='+this.total);
		},
		// 车价输入
		vehiclePriceInput: function(){
			// console.log('vehiclePrice='+this.vehiclePrice);
			/* if (this.vehiclePriceDisplay == '' || this.vehiclePriceDisplay == ' ' || isNaN(parseInt(this.vehiclePriceDisplay))){
				this.vehiclePriceCompute = 0;
			}
			else{
				this.vehiclePriceCompute = parseInt(this.vehiclePriceDisplay);
			} */
			// console.log('this.vehiclePriceDisplay='+this.vehiclePriceDisplay);
			// console.log('parseInt(this.vehiclePriceDisplay)='+parseInt(this.vehiclePriceDisplay));
			// console.log('this.vehiclePriceCompute='+this.vehiclePriceCompute);
			// this.purchaseTax = parseInt(this.vehiclePrice / 1.13 * 0.1);
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatio) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofittingCompute) + parseInt(this.playingCardsCompute);
			// this.fullPayment = parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofittingCompute) + parseInt(this.playingCardsCompute);
			/* this.getPurchaseTax();
			this.getDownpayment();
			this.getFullPayment(); */
			// console.log('downpayment='+this.downpayment+'purchaseTax='+this.purchaseTax);
			/* this.loanCompute();
			this.getInsurance(); */
			if (!isNaN(parseInt(this.vehiclePrice))){
				this.getPurchaseTax();
				this.getInsurance();
				this.getDownpayment();
				this.getFullPayment();
				this.loanCompute();
				// this.getTotal();
			}
		},
		// 购置税
		getPurchaseTax: function(){
			var vehiclePrice = 0;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			// this.purchaseTax = parseInt(parseInt(this.vehiclePriceCompute) / 1.13 * 0.1);
			this.purchaseTax = parseInt(parseInt(vehiclePrice) / 1.13 * 0.1);
		},
		// 首付
		getDownpayment: function(){
			var vehiclePrice = 0;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			// console.log('getDownpayment:vehiclePrice='+this.vehiclePriceCompute+',downpaymentRadio='+this.downPaymentRatio+',purchaseTax='+this.purchaseTax+',insurance='+this.insurance+',retrofitting='+this.retrofittingCompute+',playCards='+this.playingCardsCompute);
			// this.downpayment = parseInt(parseInt(this.vehiclePriceCompute) * parseFloat(this.downPaymentRatio)) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofittingCompute) + parseInt(this.playingCardsCompute);
			// this.downpayment = parseInt(parseInt(vehiclePrice) * parseFloat(this.downPaymentRatio)) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			if (this.isPurchaseTax){
				this.downpayment = parseInt(parseInt(vehiclePrice) * parseFloat(this.downPaymentRatio)) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			}
			else{
				this.downpayment = parseInt(parseInt(vehiclePrice) * parseFloat(this.downPaymentRatio)) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			}
		},
		// 全款
		getFullPayment: function(){
			var vehiclePrice = 0;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			// console.log('getFullPayment:vehiclePrice='+this.vehiclePriceCompute+',purchaseTax='+this.purchaseTax+',insurance='+this.insurance+',retrofitting='+this.retrofittingCompute+',playCards='+this.playingCardsCompute);
			// this.fullPayment = parseInt(this.vehiclePriceCompute) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofittingCompute) + parseInt(this.playingCardsCompute);
			// this.fullPayment = parseInt(vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			if (this.isPurchaseTax){
				this.fullPayment = parseInt(vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			}
			else{
				this.fullPayment = parseInt(vehiclePrice) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			}
		},
		// 加装
		retrofittingInput: function(){
			/* if (this.retrofittingDisplay == '' || this.retrofittingDisplay == ' ' || isNaN(parseInt(this.retrofittingDisplay))){
				this.retrofittingCompute = 0;
			}
			else{
				this.retrofittingCompute = parseInt(this.retrofittingDisplay);
			} */
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			// this.fullPayment = parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			/* this.getDownpayment();
			this.getFullPayment(); */
			// this.total = parseFloat(parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			// this.getTotal();
			if (!isNaN(parseInt(this.retrofitting))){
				this.getFullPayment();
				this.getDownpayment();
				this.getTotal();
			}
		},
		// 总价
		getTotal: function(){
			var vehiclePrice = 0;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			// console.log('getTotal:vehiclePrice='+this.vehiclePriceCompute+',purchaseTax='+this.purchaseTax+',insurance='+this.insurance+',retrofitting='+this.retrofittingCompute+',playCards='+this.playingCardsCompute+',interest='+this.interest);
			// this.total = parseFloat(parseInt(vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			if (this.isPurchaseTax){
				this.total = parseFloat(parseInt(vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			}
			else{
				this.total = parseFloat(parseInt(vehiclePrice) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			}
		},
		// 上牌
		playingCardsInput: function(){
			/* if (this.playingCardsDisplay == '' || this.playingCardsDisplay == ' ' || isNaN(parseInt(this.playingCardsDisplay))){
				this.playingCardsCompute = 0;
			}
			else{
				this.playingCardsCompute = parseInt(this.playingCardsDisplay);
			} */
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			// this.fullPayment = parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			// this.total = parseFloat(parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			/* this.getDownpayment();
			this.getFullPayment();
			this.getTotal(); */
			if (!isNaN(parseInt(this.playingCards))){
				this.getDownpayment();
				this.getFullPayment();
				this.getTotal();
			}
		},
		// 月供 利息
		loanCompute: function(){
			/* 
				当利率 = 0.00 时，或者利率的值为空时
				
				月供 = 贷款金额 / 期数 
				
				若期数 = 0 ,则月供 = 贷款金额
				
				利息 = 0.00
			 */
			var vehiclePrice = 0;
			this.interest = 0.00;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			if (isNaN(parseFloat(this.interestRate)) || parseFloat(this.interestRate).toFixed(2) == 0.00){
				if (isNaN(parseInt(this.periods)) || parseInt(this.periods) == 0){
					this.monthlyPayment = parseFloat(parseInt(vehiclePrice) - parseInt(vehiclePrice) * this.downPaymentRatio).toFixed(2);
				}
				else if (parseInt(this.periods) > 0){
					this.monthlyPayment = parseFloat((parseInt(vehiclePrice) - parseInt(vehiclePrice) * this.downPaymentRatio) / parseInt(this.periods)).toFixed(2);
				}
			}
			/* 
				当利率 != 0.00时
				
				若贷款期数 = 0 则月供 = 贷款金额,利息 = 0.00
				
				若月供 > 0时 则月供 = [贷款 * 利率 * (1 + 利率) ^ 期数 ] / [(1 + 利率) ^ 期数 - 1]
				此时利息 = [月供 - 贷款 / 期数)] * 期数
			 */
			else{
				if (isNaN(parseInt(this.periods)) || parseInt(this.periods) == 0){
					this.monthlyPayment = parseFloat(parseInt(vehiclePrice) - parseInt(vehiclePrice) * this.downPaymentRatio).toFixed(2);
				}
				else if (parseInt(this.periods) > 0){
					// this.monthlyPayment = parseFloat(((parseInt(this.vehiclePrice) - (parseInt(this.vehiclePrice) * this.downPaymentRatioPercent[this.downPaymentRatioIndex])) * parseFloat(this.interestRate) * Math.pow((1 + parseFloat(this.interestRate)),parseInt(this.periods))) / (Math.pow((1 + parseFloat(this.interestRate)),parseInt(this.periods)) - 1)).toFixed(2);
					// this.interest = parseFloat((parseFloat(this.monthlyPayment) - (parseInt(this.vehiclePrice) - (parseInt(this.vehiclePrice) * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) / parseInt(this.periods))) * parseInt(this.periods)).toFixed(2);
					
					// console.log((parseInt(this.vehiclePrice) * (1 - this.downPaymentRatio)) * (parseFloat(this.interestRate) / 1200.0));
					this.monthlyPayment = (parseInt(vehiclePrice) * (1 - this.downPaymentRatio)) * (parseFloat(this.interestRate) / 1200.0);
					// console.log((1 + parseFloat(this.interestRate) / 1200.0));
					// console.log(parseInt(this.periods));
					// console.log(Math.pow((1 + parseFloat(this.interestRate) / 1200.0),parseInt(this.periods)));
					this.monthlyPayment *= Math.pow((1 + parseFloat(this.interestRate) / 1200.0),parseInt(this.periods));
					// console.log(Math.pow((1 + parseFloat(this.interestRate) / 1200.0),parseInt(this.periods)) - 1);
					this.monthlyPayment /= (Math.pow((1 + parseFloat(this.interestRate) / 1200.0),parseInt(this.periods)) - 1);
					this.monthlyPayment = parseFloat(this.monthlyPayment).toFixed(2);
					
					this.interest = this.monthlyPayment - ((parseInt(vehiclePrice) * (1 - this.downPaymentRatio)) / parseInt(this.periods));
					this.interest *= parseInt(this.periods);
					this.interest = parseFloat(this.interest).toFixed(2);
				}
			}
			// this.total = parseFloat(parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			this.getTotal();
			// console.log('loanCompute...'+this.total+'...'+this.insurance);
			// console.log('loanCompute:'+'this.monthlyPayment='+this.monthlyPayment+',this.interest='+this.interest+',this.total='+this.total);
		},
		getInsurance: function(){
			// this.insurance = parseInt(this.insurance);
			var vehiclePrice = 0;
			this.insurance = 0;
			if (isNaN(parseInt(this.vehiclePrice))){
				vehiclePrice = 0;
			}
			else{
				vehiclePrice = parseInt(this.vehiclePrice);
			}
			// console.log('getInsurance(start):this.insurance='+this.insurance);
			/* 
				第三者责任险 = 0 ==> 不计免赔特约险 = 0; 无过责任险 = 0;
				车辆损失险 = 0 ==> 全车盗抢险 = 0; 不计免赔特约险 = 0; 玻璃单独破碎险 = 0
				全车盗抢险 != 0 || 不计免赔特约险 != 0 ==> 车辆损失险 != 0
				
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
				车价 * 0.0024 + 第三者责任险2 * 0.2
			 */
			// 交强险
			// var compulsoryInsurance = 0;
			// uni.getStorage({key: 'compulsoryInsurance', success: function(res){compulsoryInsurance = parseInt(res.data);}})
			// console.log(compulsoryInsurance);
			// this.insurance += parseInt(compulsoryInsurance);
			/* uni.getStorage({
				key: 'compulsoryInsurance',
				success: res => {
					this.insurance += parseInt(res.data);
				}
			}); */
			try {
			    // this.insurance += parseInt(uni.getStorageSync('compulsoryInsurance'));
				// console.log('compulsoryInsurance='+parseInt(uni.getStorageSync('compulsoryInsurance')));
				var compulsoryInsurance = uni.getStorageSync('compulsoryInsurance');
				// if ('' == compulsoryInsurance || ' ' == compulsoryInsurance || isNaN(parseInt(compulsoryInsurance))){
				if (isNaN(parseInt(compulsoryInsurance))){
					compulsoryInsurance = 0;
				}
				this.insurance += parseInt(compulsoryInsurance);
				// console.log('getInsurance(compulsoryInsurance):this.insurance='+this.insurance);
			} catch (e) {
			    // error
				console.log(e);
			}
			// 第三者责任险
			// this.insurance += parseInt(uni.getStorage({key: 'thirdInsurance'}));
			/* uni.getStorage({
				key: 'thirdInsurance',
				success: res => {
					this.insurance += parseInt(res.data);
				}
			}); */
			try {
			    // this.insurance += parseInt(uni.getStorageSync('thirdInsurance'));
				// console.log('thirdInsurance='+parseInt(uni.getStorageSync('thirdInsurance')));
				var thirdInsurance = uni.getStorageSync('thirdInsurance');
				// if ('' == thirdInsurance || ' ' == thirdInsurance || isNaN(parseInt(thirdInsurance))){
				if (isNaN(parseInt(thirdInsurance))){
					thirdInsurance = 0;
				}
				this.insurance += parseInt(thirdInsurance);
				// console.log('getInsurance(thirdInsurance):this.insurance='+this.insurance);
			} catch (e) {
			    // error
				console.log(e);
			}
			// 车辆损失险
			/* if (uni.getStorage({key: 'isVehicleLossInsurance'}) == 'true'){
				this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.012);
			} */
			/* uni.getStorage({
				key: 'isVehicleLossInsurance',
				success: res => {
					if (res.data == 'true'){
						this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.012);
					}
				}
			}); */
			try {
				// if ('true' == uni.getStorageSync('isVehicleLossInsurance')){
				if (uni.getStorageSync('isVehicleLossInsurance')){
					this.insurance += parseInt(parseInt(vehiclePrice) * 0.012);
					// console.log('vehicleLossInsurance='+parseInt(parseInt(this.vehiclePriceCompute) * 0.012));
				}
				// console.log('getInsurance(VehicleLossInsurance):this.insurance='+this.insurance);
			} catch (e) {
			    // error
				console.log(e);
			}
			// 全车盗抢险
			/* if (uni.getStorage({key: 'isVehicleLossInsurance'}) == 'true'){
				if (uni.getStorage({key: 'isWholeCarTheftRescue'}) == 'true'){
					this.insurance += parseInt(parseInt(this.vehiclePrice) *0.01);
				}
			} */
			/* uni.getStorage({
				key: 'isVehicleLossInsurance',
				success: res => {
					if (res.data == 'true'){
						uni.getStorage({
							key: 'isWholeCarTheftRescue',
							success: res => {
								if (res.data == 'true'){
									this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.01);
								}
							}
						});
					}
				}
			}); */
			try{
				// if ('true' == uni.getStorageSync('isVehicleLossInsurance') && 'true' == uni.getStorageSync('isWholeCarTheftRescue')){
				if (uni.getStorageSync('isVehicleLossInsurance') && uni.getStorageSync('isWholeCarTheftRescue')){
					this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.01);
					// console.log('WholeCarTheftRescue='+parseInt(parseInt(this.vehiclePriceCompute) * 0.01));
				}
				// console.log('getInsurance(WholeCarTheftRescue):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 玻璃单独破碎险
			/* if (uni.getStorage({key: 'isWholeCarTheftRescue'}) == 'true'){
				if (uni.getStorage({key: 'glassBreakageRiskTimes'}) == '1'){
					this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0015);
				}
				else if (uni.getStorage({key: 'glassBreakageRiskTimes'}) == '2'){
					this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0025);
				}
			} */
			/* uni.getStorage({
				key: 'isWholeCarTheftRescue',
				success: res => {
					if (res.data == 'true'){
						uni.getStorage({
							key: 'glassBreakageRiskIndex',
							success: res => {
								if (res.data == '1'){
									this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0015);
								}
								else if (res.data == '2'){
									this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0025);
								}
							}
						});
					}
				}
			}); */
			try{
				// if ('true' == uni.getStorageSync('isWholeCarTheftRescue')){
				if (uni.getStorageSync('isWholeCarTheftRescue')){
					// console.log('true');
					/* switch (uni.getStorageSync('glassBreakageRiskIndex')){
						case '1':
							console.log(this.vehiclePrice);
							this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0015);
							break;
						case '2':
							console.log(this.vehiclePrice);
							this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0025);
							break;
						default:
							break;
					} */
					// if ('1' == uni.getStorageSync('glassBreakageRiskIndex')){
					if (1 == uni.getStorageSync('glassBreakageRiskIndex')){
						this.insurance += parseInt(parseInt(vehiclePrice) * 0.0015);
						// console.log('glassBreakageRisk='+parseInt(parseInt(this.vehiclePriceCompute) * 0.0015));
						// console.log('getInsurance(glassBreakageRisk):this.insurance='+this.insurance);
					}
					// else if ('2' == uni.getStorageSync('glassBreakageRiskIndex')){
					else if (2 == uni.getStorageSync('glassBreakageRiskIndex')){
						this.insurance += parseInt(parseInt(vehiclePrice) * 0.0025);
						// console.log('glassBreakageRisk='+parseInt(parseInt(this.vehiclePriceCompute) * 0.0025));
						// console.log('getInsurance(glassBreakageRisk):this.insurance='+this.insurance);
					}
				}
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 自然损失险
			/* if (uni.getStorage({key: 'isSpontaneousCombustionLoss'}) == 'true'){
				this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0015);
			} */
			/* uni.getStorage({
				key: 'isSpontaneousCombustionLoss',
				success: res => {
					if (res.data == 'true'){
						this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0015);
					}
				}
			}); */
			try{
				// if ('true' == uni.getStorageSync('isSpontaneousCombustionLoss')){
				if (uni.getStorageSync('isSpontaneousCombustionLoss')){
					this.insurance += parseInt(parseInt(vehiclePrice) * 0.0015);
					// console.log('SpontaneousCombustionLoss='+parseInt(parseInt(this.vehiclePriceCompute) * 0.0015));
				}
				// console.log('getInsurance(SpontaneousCombustionLoss):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 不计免赔特约险
			/* if (parseInt(uni.getStorage({key: 'thirdInsurance'})) != 0 && uni.getStorage({key: 'isVehicleLossInsurance'}) == 'true'){
				if (uni.getStorage({key: 'isExclusiveCoverage'}) == 'true'){
					this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0024 + parseInt(uni.getStorage({key: 'thirdInsurance'})) * 0.2);
				}
			} */
			/* uni.getStorage({
				key: 'thirdInsurance',
				success: res => {
					if (res.data != '0'){
						uni.getStorage({
							key: 'isVehicleLossInsurance',
							success: res => {
								if (res.data == 'true'){
									uni.getStorage({
										key: 'isExclusiveCoverage',
										success: res => {
											if (res.data == 'true'){
												uni.getStorage({
													key: 'thirdInsurance',
													success: res => {
														this.insurance += parseInt(parseInt(this.vehiclePrice) * 0.0024 + parseInt(res.data) * 0.2);
													}
												})
											}
										}
									});
								}
							}
						});
					}
				}
			}); */
			try{
				var thirdInsurance = uni.getStorageSync('thirdInsurance');
				// if ('' == thirdInsurance || ' ' == thirdInsurance || isNaN(parseInt(thirdInsurance)) || '0' == thirdInsurance){
				// if (isNaN(parseInt(thirdInsurance)) || '0' == thirdInsurance){
				if (isNaN(parseInt(thirdInsurance))){
					thirdInsurance = 0;
				}
				else{
					thirdInsurance = parseInt(thirdInsurance);
					// if ( 0 < thirdInsurance && 'true' == uni.getStorageSync('isVehicleLossInsurance') && 'true' == uni.getStorageSync('isExclusiveCoverage')){
					if ( 0 < thirdInsurance && uni.getStorageSync('isVehicleLossInsurance') && uni.getStorageSync('isExclusiveCoverage')){
						this.insurance += parseInt(parseInt(vehiclePrice) * 0.0024 + parseInt(parseInt(thirdInsurance) * 0.2));
						// this.insurance += parseInt(parseInt(this.vehiclePriceCompute) * 0.0024 + parseInt(parseInt(thirdInsurance) * 0.2);
						// console.log('ExclusiveCoverage='+parseInt(parseInt(this.vehiclePriceCompute) * 0.0024 + parseInt(uni.getStorageSync('thirdInsurance')) * 0.2));
					}
				}
				// console.log('getInsurance(ExclusiveCoverage):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 无过责任险
			/* if (uni.getStorage({key: 'isNoLiability'}) == 'true'){
				this.insurance += parseInt(uni.getStorage({key: 'noLiability'}));
			} */
			/* uni.getStorage({
				key: 'isNoLiability',
				success: res => {
					if (res.data == 'true'){
						uni.getStorage({
							key: 'noLiability',
							success: res => {
								this.insurance += parseInt(res.data);
							}
						});
					}
				}
			}); */
			try{
				// if ('true' == uni.getStorageSync('isNoLiability')){
				if (uni.getStorageSync('isNoLiability')){
					// this.insurance += parseInt(uni.getStorageSync('noLiability'));
					// console.log('noLiability='+parseInt(uni.getStorageSync('noLiability')));
					var noLiability = uni.getStorageSync('noLiability');
					// if ('' == noLiability || ' ' == noLiability || isNaN(parseInt(noLiability))){
					if (isNaN(parseInt(noLiability))){
						noLiability = 0;
					}
					this.insurance += parseInt(noLiability);
				}
				// console.log('getInsurance(noLiability):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 车上人员责任险
			// this.insurance += parseInt(uni.getStorage({key: 'onBoardLiability'}));
			/* uni.getStorage({
				key: 'onBoardLiability',
				success: res => {
					this.insurance += parseInt(res.data);
				}
			}); */
			try{
				// this.insurance += parseInt(uni.getStorageSync('onBoardLiability'));
				// console.log('onBoardLiability='+parseInt(uni.getStorageSync('onBoardLiability')));
				var onBoardLiability = uni.getStorageSync('onBoardLiability');
				// if ('' == onBoardLiability || ' ' == onBoardLiability || isNaN(parseInt(onBoardLiability))){
				if (isNaN(parseInt(onBoardLiability))){
					onBoardLiability = 0;
				}
				this.insurance += parseInt(onBoardLiability);
				// console.log('getInsurance(onBoardLiability):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			// 车身划痕险
			// this.insurance += parseInt(uni.getStorage({key: 'bodyScratch'}));
			/* uni.getStorage({
				key: 'bodyScratch',
				success: res => {
					this.insurance += parseInt(res.data);
				}
			}); */
			try{
				// this.insurance += parseInt(uni.getStorageSync('bodyScratch'));
				// console.log('bodyScratch='+uni.getStorageSync('bodyScratch'));
				// console.log('bodyScratch='+parseInt(uni.getStorageSync('bodyScratch')));
				var bodyScratch = uni.getStorageSync('bodyScratch');
				// if ('' == bodyScratch || ' ' == bodyScratch || isNaN(parseInt(bodyScratch))){
				if (isNaN(parseInt(bodyScratch))){
					bodyScratch = 0;
				}
				this.insurance += parseInt(bodyScratch);
				// console.log('getInsurance(bodyScratch):this.insurance='+this.insurance);
			}catch(e){
				//TODO handle the exception
				console.log(e);
			}
			
			// this.total = parseFloat(parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			// console.log('getInsurance...'+this.total+'...'+this.insurance);
		},
    },
    onLoad: function(){
		// 初始化页面标题
		this.title = this.titleGroup[this.titleIndex];
		/*
			创建本地缓存
			downpayment: 0, //首付
			monthlyPayment: 0.00, // 月供
			interest: 0.00, //利息
			total: 0.00, // 总价
			fullPayment: 0, // 全款
			vehiclePrice: 0, // 车价
			purchaseTax: 0, // 购置税
			insurance: 0, // 保险
			retrofitting: 0, // 加装
			playingCards: 0, // 上牌
			downPaymentRatio: 0.1, // 首付比例
			interestRate: 0.00, // 利率
			periods: 0, // 期数
			serviceCharge: 0,
		 */
		// uni.setStorage({key: 'downpayment', data: 0});
		// uni.setStorage({key: 'monthlyPayment', data: 0.00});
		// uni.setStorage({key: 'interest', data: 0.00});
		// uni.setStorage({key: 'total', data: 0.00});
		// uni.setStorage({key: 'fullPayment', data: 0});
		// uni.setStorage({key: 'vehiclePrice', data: 0});
		// uni.setStorage({key: 'purchaseTax', data: 0});
		// uni.setStorage({key: 'insurance', data: 0});
		// uni.setStorage({key: 'retrofitting', data: 0});
		// uni.setStorage({key: 'playingCards', data: 0});
		// uni.setStorage({key: 'downPaymentRatio', data: 0.1});
		// uni.setStorage({key: 'interestRate', data: 0.00});
		// uni.setStorage({key: 'periods', data: 0});
		// uni.setStorage({key: 'serviceCharge', data: 0});
		/* 
			创建本地缓存
			insurance: 0, // 保险总价
			compulsoryInsurance: 950, // 交强险
			thirdInsurance: 0, // 第三者责任险
			vehicleLossInsurance: 0, // 车辆损失险
			isVehicleLossInsurance: true, // 车辆损失险 投保
			wholeCarTheftRescue: 0, // 全车盗抢险
			isWholeCarTheftRescue: true, // 全车盗抢险 投保
			glassBreakageRisk: 0, // 玻璃单独破碎险
			glassBreakageRiskTimes: 0; // 玻璃单独破碎险 不投保
			glassBreakageRiskTimes: 1; // 玻璃单独破碎险 投保国产车
			glassBreakageRiskTimes: 2; // 玻璃单独破碎险 投保进口车
			spontaneousCombustionLoss: 0, // 自然损失险
			isSpontaneousCombustionLoss: true, // 自然损失险 投保
			exclusiveCoverage: 0, // 不计免赔特约险
			isExclusiveCoverage: true, // 不计免赔特约险 投保
			noLiability: 0, // 无过责任险
			isNoLiability: true, // 无过责任险 投保
			onBoardLiability: 0, // 车上人员责任险
			bodyScratch: 0, // 车身划痕险
		 */
		// uni.setStorage({key: 'compulsoryInsurance', data: 950});
		// uni.setStorage({key: 'compulsoryInsuranceIndex', data: 0});
		// uni.setStorage({key: 'thirdInsurance', data: 1293});
		// uni.setStorage({key: 'thirdInsuranceIndex', data: 4});
		// uni.setStorage({key: 'vehicleLossInsurance', data: 0});
		// uni.setStorage({key: 'isVehicleLossInsurance', data: 'true'});
		// uni.setStorage({key: 'wholeCarTheftRescue', data: 0});
		// uni.setStorage({key: 'isWholeCarTheftRescue', data: 'true'});
		// uni.setStorage({key: 'glassBreakageRisk', data: 0});
		// uni.setStorage({key: 'glassBreakageRiskIndex', data: 1});
		// uni.setStorage({key: 'spontaneousCombustionLoss', data: 0});
		// uni.setStorage({key: 'isSpontaneousCombustionLoss', data: 'true'});
		// uni.setStorage({key: 'exclusiveCoverage', data: 0});
		// uni.setStorage({key: 'isExclusiveCoverage', data: 'true'});
		// uni.setStorage({key: 'noLiability', data: 258});
		// uni.setStorage({key: 'isNoLiability', data: 'true'});
		// uni.setStorage({key: 'onBoardLiability', data: 250});
		// uni.setStorage({key: 'onBoardLiabilityIndex', data: 2});
		// uni.setStorage({key: 'bodyScratch', data: 0});
		// uni.setStorage({key: 'bodyScratchIndex', data: 0});
		try{
			// uni.setStorageSync({key: 'compulsoryInsurance', data: 950});
			// uni.setStorageSync({key: 'compulsoryInsuranceIndex', data: 0});
			// uni.setStorageSync({key: 'thirdInsurance', data: 1293});
			// uni.setStorageSync({key: 'thirdInsuranceIndex', data: 4});
			// uni.setStorageSync({key: 'isVehicleLossInsurance', data: 'true'});
			// uni.setStorageSync({key: 'isWholeCarTheftRescue', data: 'true'});
			// uni.setStorageSync({key: 'glassBreakageRiskIndex', data: 1});
			// uni.setStorageSync({key: 'isSpontaneousCombustionLoss', data: 'true'});
			// uni.setStorageSync({key: 'isExclusiveCoverage', data: 'true'});
			// uni.setStorageSync({key: 'noLiability', data: 258});
			// uni.setStorageSync({key: 'isNoLiability', data: 'true'});
			// uni.setStorageSync({key: 'onBoardLiability', data: 250});
			// uni.setStorageSync({key: 'onBoardLiabilityIndex', data: 2});
			// uni.setStorageSync({key: 'bodyScratch', data: 0});
			// uni.setStorageSync({key: 'bodyScratchIndex', data: 0});
			uni.setStorageSync('compulsoryInsurance', 950);
			uni.setStorageSync('compulsoryInsuranceIndex', 0);
			uni.setStorageSync('thirdInsurance', 1293);
			uni.setStorageSync('thirdInsuranceIndex', 4);
			// uni.setStorageSync('isVehicleLossInsurance', 'true');
			uni.setStorageSync('isVehicleLossInsurance', true);
			// uni.setStorageSync('isWholeCarTheftRescue', 'true');
			uni.setStorageSync('isWholeCarTheftRescue', true);
			uni.setStorageSync('glassBreakageRiskIndex', 1);
			// uni.setStorageSync('isSpontaneousCombustionLoss', 'true');
			uni.setStorageSync('isSpontaneousCombustionLoss', true);
			// uni.setStorageSync('isExclusiveCoverage', 'true');
			uni.setStorageSync('isExclusiveCoverage', true);
			uni.setStorageSync('noLiability', 258);
			// uni.setStorageSync('isNoLiability', 'true');
			uni.setStorageSync('isNoLiability', true);
			uni.setStorageSync('onBoardLiability', 250);
			uni.setStorageSync('onBoardLiabilityIndex', 2);
			uni.setStorageSync('bodyScratch', 0);
			uni.setStorageSync('bodyScratchIndex', 0);
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
		// 车价
		this.vehiclePrice = '';
		/* this.vehiclePriceDisplay = '';
		this.vehiclePriceCompute = 0; */
		// 购置税
		// this.purchaseTax = parseInt(parseInt(this.vehiclePrice) / 1.13 * 0.1);
		// this.getPurchaseTax();
		this.purchaseTax = 0;
		// 月供 利息
		// this.loanCompute();
		// console.log('onLoad...'+this.total+'...'+this.insurance);
		// 加装
		this.retrofitting = 0;
		/* this.retrofittingDisplay = 0;
		this.retrofittingCompute = 0; */
		// 上牌
		this.playingCards = 2000;
		/* this.playingCardsDisplay = 2000;
		this.playingCardsCompute = 2000; */
		// 首付比例
		this.downPaymentRatioIndex = 3;
		this.downPaymentRatio = 0.4;
		// 利率
		this.interestRate = 4.75;
		/* this.interestRateDisplay = 4.75;
		this.interestRateCompute = 4.75; */
		// 期数
		this.periods = 36;
		/* this.periodsDisplay = 36;
		this.periodsCompute = 36; */
		// 手续费
		this.serviceCharge = 5000;
		/* this.serviceChargeDisplay = 5000;
		this.serviceChargeCompute = 5000; */
	},
    onShow: function(){
		if (!isNaN(parseInt(this.vehiclePrice))){
			// 保险
			this.getInsurance();
			// 首付
			// this.downpayment = parseInt(this.vehiclePrice * this.downPaymentRatioPercent[this.downPaymentRatioIndex]) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			this.getDownpayment();
			// 全款
			// this.fullPayment = parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards);
			this.getFullPayment();
			// 总价
			// this.total = parseFloat(parseInt(this.vehiclePrice) + parseInt(this.purchaseTax) + parseInt(this.insurance) + parseInt(this.retrofitting) + parseInt(this.playingCards) + parseFloat(this.interest)).toFixed(2);
			this.getTotal();
			// console.log('onshow...'+this.total+'...'+this.insurance);
		}
	}
}
</script>

<style scoped>
.container{
	width: 100%;
	background-color: #fafafa;
}
.loanPanel, .fullPurchasePanel{
	width: 100%;
	/* height: 400upx; */
	padding-top: 150upx;
	background: url(../../static/tabs/calc-background.png) top center no-repeat;
	background-size: 100% 450upx;
	position: relative;
}
.loanGroup{
	width: 100%;
	height: 200upx;
	background: url(../../static/tabs/calc-bg-loan.png) bottom center no-repeat;
	background-size: 100% auto;
	position: relative;
}
.loanIcon{
	display: inline-block;
	width: calc(100% / 3);
	height: 200upx;
}
.loanIcon>image{
	display: block;
	width: calc(200% / 3);
	height: 100%;
}
.buttonGroup{
	display: inline-block;
	position: absolute;
	padding-top: 50upx;
}
.loanGroup>.buttonGroup{
	width: calc(200% / 3);
	top: 0;
	right: 0;
	height: 150upx;
}
.buttonGroup>button{
	display: inline-block;
	color: #fafafa;
	border: #fafafa 2upx solid;
	background-color: #10A2FF;
	border-radius: 55upx;
	line-height: 2;
	font-size: 12px;
	font-weight: 200;
	padding: 0 35upx;
}
.buttonGroup>button:nth-of-type(2){
	margin-left: 40upx;
}
.buttonGroup>.active{
	background-color: #fafafa;
	color: #000;
}
.loanMessage{
	width: 100%;
	height: 100upx;
	padding-top: 10upx;
	/* background-color: #0A98D5; */
	background-color: #007bce;
}
.loanMessageItem{
	display: block;
	width: calc(100% / 4);
	height: 90upx;
	float: left;
}
.loanMessageItem>view{
	width: 100%;
	height: calc(90upx / 2);
	text-align: center;
	font-size: 13px;
	font-weight: 100;
	vertical-align: bottom;
	color: #fafafa;
}
/* .loanMessage>uni-list{
	display: block;
	width: 100%;
	height: 90upx;
	position: relative;
}
.loanMessage>uni-list>uni-list-item{
	display: inline-block;
	width: calc(100% / 4);
	height: 90upx;
	position: absolute;
	top: 0;
}
.loanMessage>uni-list>uni-list-item:nth-of-type(1){
	left: 0;
}
.loanMessage>uni-list>uni-list-item:nth-of-type(2){
	left: 25%;
}
.loanMessage>uni-list>uni-list-item:nth-of-type(3){
	left: 50%;
}
.loanMessage>uni-list>uni-list-item:nth-of-type(4){
	left: 75%;
}
.loanMessageItem{
	display: block;
	width: 100%;
	height: 100%;
}
.loanMessageItem>uni-list-item{
	display: block;
	width: 100%;
	height: calc(100% / 2);
	text-align: center;
	font-size: 13px;
	font-weight: 100;
	vertical-align: bottom;
	color: #fafafa;
} */
.fullPurchaseGroup{
	width: 60%;
	height: 300upx;
	position: relative;
}
.fullPurchaseGroup>.buttonGroup{
	width: 100%;
	height: 80upx;
	top: 0;
	left: 0;
	text-align: right;
}
.fullPurchaseMessage{
	width: 100%;
	position: absolute;
	top: 160upx;
	right: 0;
	text-align: right;
}
/* .fullPurchaseMessage>uni-list{
	width: 100%;
}
.fullPurchaseMessage>uni-list>uni-list-item{
	padding: 0 20upx;
	color: #fafafa;
}
.fullPurchaseMessage>uni-list>uni-list-item:nth-of-type(1){
	border-right: 1px rgba(255,255,255,.2) solid;
} */
.fullPurchaseMessage>view{
	display: inline-block;
	padding: 0 20upx;
	color: #fafafa;
}
.fullPurchaseMessage>view:nth-of-type(1){
	border-right: 1px rgba(255,255,255,.2) solid;
}
.fullPurchaseIcon{
	width: 40%;
	height: 300upx;
	position: absolute;
	top: 150upx;
	right: 0;
}
.fullPurchaseIcon>image{
	display: block;
	width: 100%;
	height: 100%;
}
/* .priceItem{
	width: 100%;
	padding: 0 20upx;
} */
.priceList{
	width: 100%;
	padding: 0 20upx;
}
.gray{
	color: #e3e4e5;
}
.blue{
	color: #17a1ff;
}
/* .fullPurchasePriceItem, .loanPriceItem{
	display: block;
	width: calc(100% - 40upx);
}
.fullPurchasePriceItem>uni-list-item, .loanPriceItem>uni-list-item{
	display: block;
	width: 100%;
	height: 80upx;
} */
.fullPurchasePriceList, .loanPriceList{
	display: block;
	width: calc(100% - 40upx);
}
.twoItems, .threeItems{
	display: block;
	width: 100%;
	height: 80upx;
	border-bottom: 1px solid #e3e4e5;
	position: relative;
}
/* .twoItems>uni-list-item, .twoItems>uni-list-item>input, .threeItems>uni-list-item, .threeItems>uni-list-item>input{
	font-size: 13px;
}
.twoItems>uni-list-item, .threeItems>uni-list-item{
	float: left;
	line-height: 80upx;
}
.twoItems>uni-list-item:nth-of-type(1), .threeItems>uni-list-item:nth-of-type(1){
	width: 62px;
	height: 100%;
}
.twoItems>uni-list-item:nth-of-type(2){
	width: calc(100% - 62px);
	height: 100%;
	position: relative;
}
.twoItems>uni-list-item>input, .threeItems>uni-list-item>input{
	display: block;
}
.twoItems>uni-list-item:nth-of-type(2)>input{
	width: 100%;
	height: 100%;
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
	right:20upx;
}
.threeItems>uni-list-item:nth-of-type(2){
	width: calc(100% - 112px);
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
.twoItems>view, .twoItems>view>input, .threeItems>view, .threeItems>view>input{
	/* font-size: 32upx; */
	font-size: 13px;
}
.twoItems>view, .threeItems>view{
	float: left;
	line-height: 80upx;
}
.twoItems>view:nth-of-type(1), .threeItems>view:nth-of-type(1){
	width: 62px;
	height: 100%;
}
.twoItems>view:nth-of-type(2){
	width: calc(100% - 62px);
	height: 100%;
	position: relative;
}
.twoItems>view>input, .threeItems>view>input{
	display: block;
}
.twoItems>view:nth-of-type(2)>input{
	width: 100%;
	height: 100%;
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
	right:20upx;
}
.threeItems>view:nth-of-type(2){
	width: calc(100% - 112px);
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