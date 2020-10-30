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

    <div class="tag">
        <a class="tag__item" v-for="(item, index) in tagData" :key="index">{{item.tag}}</a>
    </div>

    <div class="m-title">
        <div class="m-title__tit">相关文章</div>
    </div>
    <infoList :infoData="infoData" v-if="infoData && infoData.length"></infoList>
    <div class="none" v-if="!(infoData && infoData.length)">
        <img src="/static/img/none.png" class="none-img" />
        <div class="none-text" @click="load()">暂无数据</div>
    </div>

    <div class="m-title">
        <div class="m-title__tit">特价车</div>
    </div>
    <discarList :discarData="discarData" v-if="discarData && discarData.length"></discarList>
    <div class="none" v-if="!(discarData && discarData.length)">
        <img src="/static/img/none.png" class="none-img" />
        <div class="none-text" @click="load()">暂无数据</div>
    </div>
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
            title: '文章详情',
            id: '',
            add_time: '',
            dec: '',
            htmlString: '',
            discarData: [],
            infoData: [],
            tagData: [],
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
        }
    },
    onLoad(e) {
        let that = this
        // console.log(e)
        that.id = e.id
        u.request({
            url: u.API.ArticleShow,
            data: {
                id: that.id
            },
            isVerifyLogin: false,
            isUseMock: false,
            success(res, isUseMock) {
                // debugger
                if (res && res.data) {
                    res = res.data
                    if (res.article) {
                        that.title = res.article.title
                        that.add_time = res.article.add_time

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
                            // let imgReg = /<img(.*?)src="(.*?)"(.*?)\/>/g
                            let imgReg = /<img(.*?)src="(((?!http).)+)"(.*?)\/>/g
                            let imgReplaceReg = `<img src="${u.API.HOST}$2" style="max-width:100%;height:auto" />`
                            html = html.replace(imgReg, imgReplaceReg)
                            return html
                        }

                        that.htmlString = htmlParse(res.article.content)
                        // that.htmlString = res.article.content
                        console.log(that.htmlString)
                    }

                    if (res.article_relation && res.article_relation.length) {
                        res.article_relation.forEach((item, i) => {
                            item.url = `/pages/article/article?id=${item.id}`
                        })
                        that.infoData = res.article_relation
                    }

                    if (res.article_relation && res.article_relation.length) {
                        that.tagData = res.tag
                    }

                    that.loadDiscar()
                }

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

.tag {
    overflow: hidden;
    margin: 0 20rpx;
}
.tag__item {
    color: #333;
    float: left;
    padding: 0 10px;
    line-height: 20px;
    border: 1px solid #999;
    margin-left: 20rpx;
    margin: 5px 20rpx 5px 0;
    border-radius: 10px;
    font-size: 12px;
}
</style>
