<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="sptop">
            <div class="sptop-img">
                <image :src="thumbnail" lazy-load mode="aspectFill"></image>
            </div>
            <div class="sptop-con">
                <div class="sptop-tit">{{title}}</div>
                <a class="sptop-config" @tap="toConfig()">参数配置 <uni-icon color="#999" class="" size="18" type="gear" /></a>
            </div>
        </div>
        <div class="m-title">
            <div class="m-title__tit">特价车详情</div>
        </div>
        <div class="spdetail">
            <div class="spdetail-l">
                <div class="spdetail-item">原价：￥<text style="text-decoration: line-through;">{{price}}万</text></div>
                <div class="spdetail-item">特价原因：{{special_reason}}</div>
                <div class="spdetail-item">商家名称：{{company_name}}</div>
                <div class="spdetail-item">详细地址：{{address}}</div>
            </div>
            <div class="spdetail-r" style="text-align: right;">
                <div class="spdetail-item">特价：<text style="font-size: 14px;color: #f00">￥</text><text style="font-size: 15px;color: #f00">{{special_price}}万</text></div>
                <a class="spdetail-btn" @tap="getLowPrice()">获取底价</a>
            </div>
        </div>

        <div class="m-title">
            <div class="m-title__tit">特价车图</div>
        </div>
        <div class="spimg" v-if="imgs && imgs.length">
            <a class="spimg-item" @tap="picwall(imgs, index)" v-for="(item, index) in imgs" :key="index">
                <image :src="item.img_small" lazy-load mode="aspectFill"></image>
            </a>
        </div>
        <div class="none" v-if="!(imgs && imgs.length)">
            <img src="/static/img/none.png" class="none-img" />
            <div class="none-text" @click="load()">暂无数据</div>
        </div>

        <div class="m-title">
            <div class="m-title__tit">关注本车的用户还喜欢</div>
        </div>
        <discarList :discarData="alsolikeData" v-if="alsolikeData && alsolikeData.length"></discarList>
        <div class="none" v-if="!(alsolikeData && alsolikeData.length)">
            <img src="/static/img/none.png" class="none-img" />
            <div class="none-text" @click="load()">暂无数据</div>
        </div>

        <picwall ref="picwall"></picwall>
    </view>
</template>
<script>
import u from '@/common/util'
import discarList from '@/components/discar-list/discar-list.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import picwall from '@/components/picwall/picwall.vue'
export default {
    components: {
        discarList,
        uniIcon,
        picwall
    },
    data() {
        return {
            id: '',
            style_id: '',
            model_id: '',
            title: '特价车详情',
            company_id: '',
            company_name: '',
            price: '',
            special_price: '',
            thumbnail: '',
            imgs: [],
            special_reason: '',
            address: '',
            alsolikeData: []
        }
    },
    methods: {
        loadDetail() {
            let that = this
            u.request({
                url: u.API.DiscountCarDeatil,
                isVerifyLogin: false,
                data: {
                    id: that.id
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.company_id = res.company_id
                    that.company_name = res.company_name
                    that.style_id = res.style_id
                    that.model_id = res.model_id
                    that.title = res.style_name
                    that.address = res.address
                    that.price = res.price
                    that.special_price = res.special_price
                    that.thumbnail = res.thumbnail
                    that.special_reason = res.special_reason
                    that.alsolikeData = res.DiscountCars
                    that.imgs = res.imgs
                }
            })
        },
        getLowPrice() {
            this.jump(`/pages/getprice/getprice?company_id=${this.company_id}&company_name=${this.company_name}&company_style_id=${this.id}&style_id=${this.style_id}&name=${this.title}&img=${this.thumbnail}&price=${this.special_price}`)
        },
        toConfig() {
            this.jump(`/pages/config/config?style_id=${this.style_id}`)
        },
        picwall(data, current) {
            this.$refs.picwall.show(data, current)
        }
    },
    onLoad(e) {
        let that = this
        that.id = e.id

        that.loadDetail()
    },
    onShow() {}
}
</script>
<style scoped>
.sptop{
    overflow: hidden;
    margin: 10px 20upx;
}
.sptop-img{
    float: left;
    width: 300upx;
    height: 225upx;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #eee;
}
.sptop-img image{
    display: block;
    width: 300upx;
    height: 225upx;
    overflow: hidden;
    border-radius: 5px;
}
.sptop-con{
    overflow: hidden;
}
.sptop-tit{
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 10px;
}
.sptop-config{
    font-size: 14px;
    color: #999;
    margin-top: 10px;
}


.spdetail{
    overflow: hidden;
    margin: 10px 20upx;
}
.spdetail-l{
    float: left;
    width: 65%;
    margin-right: 10px;
}
.spdetail-r{
    overflow: hidden;
}
.spdetail-item{
    color: #999;
    font-size: 14px;
}
.spdetail-btn{
    display: inline-block;
    padding: 0 15px;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 15px;
    background-color: #0f7bcf;
    color: #ffffff;
    text-align: center;
}


.spimg {
    margin: 5px 0;
    overflow: hidden;
    font-size: 0px;
}
.spimg-item {
    display: inline-block;
    width: 223upx;
    margin: 5px 0 5px 20upx;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: #eee;
    /* float: left; */
}
.spimg-item image {
    display: block;
    width: 223upx;
    height: 167upx;
    border-radius: 5px;
    overflow: hidden;
}

</style>
