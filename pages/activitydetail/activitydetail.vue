<template>
<view>
    <navbar :title="title"></navbar>
    <div class="ac">
        <div class="ac-title">{{title}}</div>
        <div class="ac-info">
            <div class="ac-info-l">{{dec}}</div>
            <div class="ac-info-r">{{add_time}}</div>
        </div>
        <div class="ac-content">
            <rich-text :nodes="htmlString"></rich-text>
        </div>
    </div>

    <div class="m-title" v-if="infoData && infoData.length">
        <div class="m-title__tit">更多促销信息</div>
    </div>
    <infoList :infoData="infoData"></infoList>

    <div class="m-title" v-if="discarData && discarData.length">
        <div class="m-title__tit">特价车</div>
    </div>
    <discarList :discarData="discarData"></discarList>
</view>
</template>
<script>
import u from '@/common/util'
import discarList from '@/components/discar-list/discar-list.vue'
import infoList from '@/components/info-list/info-list.vue'
export default {
    components: {
        discarList,
        infoList
    },
    data() {
        return {
            title: '活动详情',
            company_id: '',
            id: '',
            add_time: '',
            dec: '',
            htmlString: '',
            discarData: [],
            infoData: []
        }
    },
    methods: {
        loadDiscar() {
            let that = this
            u.request({
                url: u.API.DiscountCar,
                isVerifyLogin: false,
                data: {
                    // id: that.id,
                    type: 2,
                    pageSize: 6,
                    pageIndex: 1
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.discarData = res.data
                }
            })
        },
        loadInfo() {
            let that = this
            u.request({
                url: u.API.ActivityList,
                isVerifyLogin: false,
                data: {
                    company_id: that.company_id,
                    pageSize: 5,
                    pageIndex: 1
                },
                isUseMock: false,
                success(res, isUseMock) {
                    res.data.forEach((item, i) => {
                        item.url = `/pages/activitydetail/activitydetail?id=${item.id}`
                    })
                    that.infoData = res.data
                }
            })
        }
    },
    onLoad(e) {
        let that = this
        // console.log(e)
        that.id = e.id
        u.request({
            url: u.API.ActivityDetail,
            data: {
                id: that.id
            },
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                that.company_id = res.company_id
                that.title = res.title
                that.add_time = res.add_time
                that.dec = `${res.city_name} ${res.company_name}`

                function htmlParse(html) {
                    var reg = /(&lt;)|(&gt;)|(&amp;)|(&quot;)/g;
                    html = html.replace(reg,function(match){
                        switch(match){
                            case "&lt;":
                                return "<"
                            case "&gt;":
                                return ">"
                            case "&amp;":
                                return "&"
                            case "&quot;":
                                return "\""
                        }
                    })
                    // 图片路径添加域名
                    let imgReg = /<img(.*?)src="(.*?)"(.*?)\/>/g
                    let imgReplaceReg = `<img src="${u.API.HOST}$2" style="max-width:100%;height:auto" />`
                    html = html.replace(imgReg, imgReplaceReg)
                    return html
                }

                that.htmlString = htmlParse(res.content)
                console.log(that.htmlString)

                that.loadDiscar()
                that.loadInfo()
            }
        })

        
    },
    onShow() {
    }
}
</script>
<style scoped>


.ac {
    margin: 10px 20upx;
}
.ac-title {
    border-bottom: 1upx solid #e7e7e7;
    line-height: 40px;
    font-size: 15px;
}

.ac-info {
    overflow: hidden;
    line-height: 30px;
    font-size: 12px;
}

.ac-info-l {
    float: left;
    color: #10a2ff;
}

.ac-info-r {
    float: right;
    color: #999;
}

/* 图文详情 */
.ac-content {
    line-height: 1.6;
    padding: 10px 0;
    overflow: hidden;
    font-size: 14px;
    color: #333;
}
.ac-content rich-text {
    overflow: hidden;
    width: 100%;
}

</style>
