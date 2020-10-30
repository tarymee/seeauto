<template>
<view>
    <navbar :title="title"></navbar>
	<view class="container">
		<view class="topBg"></view>
		<view class="bottomBg">
			<image src="../../static/tabs/calc-bg-info.png"></image>
		</view>
		<view class="text">
			<view v-for="(item, key) in content" :key="key" v-if="item.name == currentContent">
				{{item.value}}
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
            title: '',
			content: [
				// 购置税
				{name: 'purchaseTax', value: '购置税=购车款/(1+13%)x购置税率(10%)'},
				{name: 'purchaseTax', value: '目前,部分新能源汽车(部分电动车、混动车)是无需缴纳购置税的。'},
				// 加装
				{name: 'retrofitting', value: '一些热门车系，或者豪华品牌车，经销商通常都会要求加装行车记录仪、贴膜、脚垫等等，以各种名目要求购买所谓的"精品"。'},
				// 上牌
				{name: 'playingCards', value: '通常商家提供的一条龙服务收费约500元，个人办理约373元，其中工商验证、出库150元、移动证30元、环保卡3元、拓号费40元、行驶证相片20元、托盘费130元。'},
				{name: 'playingCards', value: '但是在实际中，经销商收取的费用一般都高于500元。作者所在的城市广州，通常普通品牌的上牌费用是1000元到2000元，豪华品牌基本在4000元以上。'},
				// 手续费
				{name: 'serviceCharge', value: '申请贷款的时候，经销商都会收取一笔费用，美其名曰"手续费"，在过去，消费者去申请贷款的时候需要准备很多材料和办理很多手续，所以收取一定的费用是合理的。但是在现在，贷款已经非常简单，经销商无非就是在找个名目再收取一笔费用罢了，这也是为什么购车时候，经销商都会极力推荐使用贷款，并且告诉你，利率很低很低，但是加上了手续费后，就不低了。'},
				// 交强险
				{name: 'compulsoryInsurance', value: '车险类型分为强制保险，主线和附加险三种。强制保险就是交强险，交强险是全国统一标准：普通6座以下私家车一年的保费950元，家用6座以上一年的保费是1100元。'},
				// 第三者责任险
				{name: 'thirdInsurance', value: '第三者责任险负责保险车辆在使用中发生意外事故造成他人(即第三者)的人身伤亡或财产的直接损毁的赔偿责任。因为交强险在对第三者的医疗费用和财产损失上赔偿较低，在购买了交强险仍需要购买第三者责任险作为补充。强烈建议买足100W。'},
				// 车辆损失险
				{name: 'vehicleLossInsurance', value: '车辆损失险是车辆保险中用途最广泛的险种，它负责赔偿由于自然灾害和意外事故造成的自己车辆损失。无论是小剐小蹭还是损坏严重，都可以由保险公司来支付修理费用。'},
				{name: 'vehicleLossInsurance',value: '被保险人或其允许的合格驾驶员在使用保险车辆过程中，因下列原因造成保险车辆的损失,保险公司负责赔偿：1.碰撞、倾覆；2.火灾、爆炸；3.外界物体倒塌、空中运行物体、空中运行物体坠落、保险车辆行驶中平行坠落；4.雷击、暴风、龙卷风、暴雨、洪水、海啸、地陷、崖崩、雪崩、雹灾、泥石流、滑坡；5.载运保险车辆的渡船遭受自然灾害（只仅限于由驾驶员随车照料者）。'},
				{name: 'vehicleLossInsurance', value: '发生保险事故时，被保险人或其允许的合格驾驶员对保险车辆采取施救、保护措施所指出的合理费用，保险公司负责赔偿。但此项费用的最高赔偿金额以责任限额为限。'},
				// 全车盗抢险
				{name: 'wholeCarTheftRescue', value: '指保险车辆全车被盗窃、被抢劫、被抢夺，经县级以上公安刑侦部门J立案侦查证实满-定时间没有下落的，由保险公司在保险金额内予以赔偿。如果是车辆的某些零部件被盗抢，如轮胎被盗抢、车内财产被盗抢、后备箱内的物品丢失，保险公司均不负责赔偿。但是，对于车辆被盗抢期间内，保险车辆上零部件的损坏、失，保险公司-般负责赔偿。'},
				{name: 'wholeCarTheftRescue', value: '全车盗抢险为附加险，必须在投保车辆损失险之后方可投保该险种。'},
				// 玻璃单独破碎险
				{name: 'glassBreakageRisk', value: '负责赔偿保险车辆在使用过程中，发生本车玻璃发生单独破碎的保险公司按照保险合同进行赔偿。玻璃单独破碎险中的玻璃是指风档玻璃和车窗玻璃，如果车灯、车镜玻璃破碎及车辆维修过程中造成的破碎，保险公司不承担赔偿责任。'},
				{name: 'glassBreakageRisk', value: '玻璃单独破碎险为附加险，必须在投保车辆损失险之后方可投保该险种。'},
				// 自燃损失险
				{name: 'spontaneousCombustionLoss', value: '负责赔偿因本车电器、线路、供油系统发生故障及运载货物自身原因起火造成车辆本身的损失。当车辆发生部分损失，按照实际修复费用赔偿修理费。如果车辆自燃造成整体烧毁或已经失去修理价值，则按照出险时车辆的实际价值赔偿，但不超过责任限额。'},
				// 不计免赔特约险
				{name: 'exclusiveCoverage', value: '负责赔偿在车损险和第三者 责任险中应由被保险人自 己承担的免赔金额，即100%赔付。'},
				{name: 'exclusiveCoverage', value: '不计免赔特约险为附加险，必须在投保车损险和第三者责任险之后方可投保该险种。'},
				// 无过责任险
				{name: 'noLiability', value: '投保车辆在使用过程中，因与非机动车辆、行人发生交通事故，造成对方人员伤亡和财产的直接损毁，但这一损失不是被保险人的过失，而是由于对方的责任造成的，但保险人拒绝赔偿未果，对于保险人已经支付给对方而无法追回的费用，保险公司按《道路交通事故处理办法》负责赔偿。'},
				{name: 'noLiability', value: '无过失责任险为附加险，必须在投保第三者责任险之后方可投保该险种。'},
				// 车上人员责任险
				{name: 'onBoardLiability', value: '保险车辆发生意外事故导致车上司机或乘客人员伤亡造成的费用损失，以及为减少损失而支付的必要合理的施救、保护费用，由保险公司承担赔偿责任。'},
				// 车身划痕险
				{name: 'bodyScratch', value: '无明显碰撞痕迹的车身划痕损失，保险公司负责赔偿。'},
				{name: 'bodyScratch', value: '车身划痕险为附加险，必须在投保车辆损失险之后方可投保该险种。'},
			],
			currentContent: '',
        }
    },
    methods: {
        jump(url) {
            u.jump(url)
        }
    },
    onLoad: function(e) {
		// console.log(e.msgEn+'--'+e.msgZh);
		this.title = e.msgZh;
		this.currentContent = e.msgEn;
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
	position: relative;
}
.topBg{
	display: block;
	width: 100%;
	height: 300upx;
	background: url(../../static/tabs/calc-background.png) top center no-repeat;
	background-size: 100% 300upx;
}
.bottomBg{
	display: block;
	width: 100%;
	height: 700upx;
	/* background: url(../../static/tabs/calc-bg-info.png) center center no-repeat;
	background-size: 50% auto; */
	position: relative;
}
.bottomBg>image{
	display: block;
	width: 50%;
	height: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: calc(-50% / 2);
	margin-left: calc(-50% / 2);
}
.text{
	display: block;
	width: 100%;
	padding-left: 15upx;
	position: absolute;
	top: 140upx;
	left: 0;
	background-color: #17a1ff;
}
.text>view{
	width: calc(100% - 30upx);
	font-size: 14px;
	color: #fafafa;
	margin-top: 10upx;
	margin-bottom: 10upx;
}
</style>
