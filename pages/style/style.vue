<template>
    <view>
        <navbar :title="title"></navbar>
        <div class="sptop">
            <div class="sptop-img">
                <image :src="img" lazy-load mode="aspectFill"></image>
            </div>
            <div class="sptop-con">
                <div class="sptop-tit">{{title}}</div>
                <a class="sptop-config" @tap="toConfig()">参数配置 <uni-icon color="#999" class="" size="18" type="gear" /></a>
            </div>
        </div>


        <div class="cate">
            <div class="cate__item" :class="item.select ? 'cate__item--cur' : ''" v-for="(item, index) in cateArr" :key="index" @tap="selectCate(item.title)">
                <text>{{item.title}}</text>
            </div>
        </div>


        <div class="style" v-if="cateType == '附近商家'">
            <div class="style__item" v-for="(item, index) in nearstoreData" :key="index" v-if="nearstoreData && nearstoreData.length">
                <div class="style__item-line">
                    <div class="style__item-tit">{{item.name}}</div>
                    <div class="style__item-price">￥{{item.price}}万</div>
                </div>
                <div class="style__item-line">
                    <div class="style__item-address">{{item.address}}</div>
                    <div class="style__item-loc"><uni-icon color="#10A2FF" class="" size="14" type="location-filled" />距离{{item.company_distance}}米</div>
                    <div class="style__item-btn" @tap="getLowPrice(item)">获取底价</div>
                </div>
            </div>
            <div class="none" v-if="!(nearstoreData && nearstoreData.length)">
                <img src="/static/img/none.png" class="none-img" />
                <div class="none-text" @click="load()">暂无数据</div>
            </div>
        </div>

        <div class="style" v-if="cateType == '价格从低到高'">
            <div class="style__item" v-for="(item, index) in priceData" :key="index" v-if="priceData && priceData.length">
                <div class="style__item-line">
                    <div class="style__item-tit">{{item.name}}</div>
                    <div class="style__item-price">￥{{item.price}}万</div>
                </div>
                <div class="style__item-line">
                    <div class="style__item-address">{{item.address}}</div>
                    <div class="style__item-loc"><uni-icon color="#10A2FF" class="" size="14" type="location-filled" />距离{{item.company_distance}}米</div>
                    <div class="style__item-btn" @tap="getLowPrice(item)">获取底价</div>
                </div>
            </div>
            <div class="none" v-if="!(priceData && priceData.length)">
                <img src="/static/img/none.png" class="none-img" />
                <div class="none-text" @click="load()">暂无数据</div>
            </div>
        </div>

        <div class="m-title">
            <div class="m-title__tit">关注本车的用户还喜欢</div>
        </div>
        <discarList :discarData="alsolikeData" v-if="alsolikeData && alsolikeData.length"></discarList>
        <div class="none" v-if="!(alsolikeData && alsolikeData.length)">
            <img src="/static/img/none.png" class="none-img" />
            <div class="none-text" @click="load()">暂无数据</div>
        </div>
    </view>
</template>
<script>
import u from '@/common/util'
import discarList from '@/components/discar-list/discar-list.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        discarList,
        uniIcon
    },
    data() {
        return {
            id: '',
            title: '款式详情',
            img: '',
            cateArr: [
                {
                    title: '附近商家',
                    select: true
                },
                {
                    title: '价格从低到高',
                    select: false
                }
            ],
            cateType: '附近商家',
            alsolikeData: [],
            nearstoreData: [],
            priceData: [],
        }
    },
    methods: {
        loadDetail() {
            let that = this
            u.request({
                url: u.API.StyleDeatil,
                isVerifyLogin: false,
                data: {
                    id: that.id
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.title = res.data.model_name + res.data.style_name
                    that.img = res.data.thumbnail

                    that.alsolikeData = res.data.DiscountCar
                }
            })
        },
        loadNearstore() {
            let that = this
            u.getCacheLocationCity({
                success: function (res) {
                    u.request({
                        url: u.API.NearStoreByStyle,
                        isVerifyLogin: false,
                        data: {
                            city_id: res.id || '0',
                            id: that.id
                        },
                        isUseMock: false,
                        success(res, isUseMock) {
                            that.nearstoreData = res.data
                        }
                    })
                }
            })
            
        },
        loadPrice() {
            let that = this
            u.getCacheLocationCity({
                success: function (res) {
                    u.request({
                        url: u.API.NearStoreByStyle,
                        isVerifyLogin: false,
                        data: {
                            city_id: res.id || '0',
                            id: that.id,
                            orderType: 1,
                        },
                        isUseMock: false,
                        success(res, isUseMock) {
                            that.priceData = res.data
                        }
                    })
                }
            })
        },
        getLowPrice(obj) {
            this.jump(`/pages/getprice/getprice?company_id=${obj.company_id}&company_name=${obj.name}&style_id=${this.id}&name=${this.title}&img=${this.img}&price=${obj.price}`)
        },
        toConfig() {
            this.jump(`/pages/config/config?style_id=${this.id}`)
        },
        selectCate(title) {
            let that = this
            that.cateArr.forEach((item, i) => {
                if (title === item.title) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.cateType = title
        }
    },
    onLoad(e) {
        let that = this
        that.id = e.id

        that.loadDetail()
        that.loadNearstore()
        that.loadPrice()
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
}
.sptop-img image{
    display: block;
    width: 300upx;
    height: 225upx;
    overflow: hidden;
    border-radius: 5px;
    background-color: #eee;
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



.cate {
    /* width: 100%; */
    overflow: hidden;
    margin: 0 20upx;
    border-bottom: 1upx solid #e7e7e7;
}
.cate__item {
    float: left;
    text-align: center;
    height: 45px;
    margin-right: 20upx;
    overflow: hidden;
}
.cate__item text {
    display: inline-block;
    margin: 0px auto;
    padding: 0 10upx;
    font-size: 15px;
    color: #333;
    line-height: 42px;
    /* padding: 0 30px; */
    border-bottom: 3px solid transparent;;
}
.cate__item--cur {
    color: #10a2ff;
}
.cate__item--cur text {
    border-bottom: 3px solid #10a2ff;
}

.style {
    
}
.style__item {
    border-bottom: 1px solid #e7e7e7;
    padding: 10px 0;
    margin: 0 20upx;
}
.style__item-line {
    overflow: hidden;
}
.style__item-tit {
    float: left;
    font-size: 14px;
    width: 80%;
}
.style__item-price {
    float: right;
    text-align: right;
    width: 20%;
    color: #f00;
    font-size: 14px;
}
.style__item-address {
    float: left;
    color: #999;
    font-size: 12px;
    width: 50%;
    margin-right: 10upx;
}
.style__item-loc {
    float: left;
    color: #0f7bcf;
    font-size: 12px;
    width: 25%;
}
.style__item-btn {
    float: right;
    background-color: #0f7bcf;
    padding: 0 20upx;
    line-height: 20px;
    font-size: 12px;
    height: 20px;
    color: #ffffff;
    border-radius: 10px;

}
</style>
