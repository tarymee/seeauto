<template>
    <div class="">
        <div class="search">
            <uni-search-bar ref="ttSearch" @confirm="search" @input="input" @focus="focus" @cancel="cancel" clearButton="always" />
        </div>
        <div class="" style="height: 45px;"></div>

        <div class="result" v-if="isSearching">
            <div class="result__item" v-if="searchResult && searchResult.length" v-for="(item, index) in searchResult" :key="index" @click="jump(`/pages/model/model?id=${item.id}`)">{{item.name}}</div>
            <div class="result__none" v-if="!searchResult || searchResult.length == 0">暂无数据</div>
        </div>

        <div class="" v-if="!isSearching">
            <div class="guess" v-if="history && history.length">
                <div class="guess-th">
                    <div class="guess-th__tit">搜索历史</div>
                    <a class="guess-th__r" @tap="delHistory()">
                        <uni-icon color="#999" class="" size="18" type="trash" /> 清空</a>
                </div>
                <div class="guess-con">
                    <a class="guess-con__item" v-for="(item, index) in history" :key="index" @tap="searchStr(item)">{{item}}</a>
                </div>
            </div>

            <div class="guess" v-if="guess && guess.length">
                <div class="guess-th">
                    <div class="guess-th__tit">猜你喜欢</div>
                    <a class="guess-th__r" @tap="getGuess()">
                        <uni-icon color="#999" class="" size="18" type="reload" /> 换一换</a>
                </div>
                <div class="guess-con">
                    <a class="guess-con__item" v-for="(item, index) in guess" :key="index" @tap="searchStr(item.model_name)">{{item.model_name}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import u from '@/common/util'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    name: 'UniIndexedList',
    components: {
        uniIcon,
        uniSearchBar
    },
    props: {},
    data() {
        return {
            title: '搜索',
            isSearching: false,
            searchResult: [],
            guess: [],
            guessConfig: {
                pageIndex: 1,
                pageSize: 8,
                pageTotal: 1,
            },
            history: [],
            historyMax: 12,
        }
    },
    onLoad(event) {
        console.log('onLoad')
        let that = this
        that.getGuess()

        console.log(event)
        if (event.search) {
            that.toSearch(event.search)
            that.$refs.ttSearch.setSearchVal(event.search)
        } else {
            that.$refs.ttSearch.searchClick()
        }
    },
    methods: {
        getGuess() {
            let that = this
            u.request({
                url: u.API.IndexSeach,
                data: {
                    pageIndex: that.guessConfig.pageIndex,
                    pageSize: that.guessConfig.pageSize
                },
                isVerifyLogin: false,
                isUseMock: false,
                success(res, isUseMock) {
                    that.guess = res.data

                    that.guessConfig.pageTotal = Number(res.pageTotal)
                    that.guessConfig.pageIndex++

                    if (that.guessConfig.pageTotal === 0) {
                        that.guessConfig.pageIndex = 1
                    } else if (that.guessConfig.pageIndex > that.guessConfig.pageTotal) {
                        that.guessConfig.pageIndex = 1
                    } else {
                        
                    }
                }
            })
        },
        setHistory(str) {
            let that = this
            that.history = uni.getStorageSync('search') ? uni.getStorageSync('search') : []
            let isin = false
            let isinindex = null
            that.history.forEach((item, i) => {
                if (item === str) {
                    isin = true
                    isinindex = i
                }
            })
            if (isin) {
                that.history.splice(isinindex, 1)
            }
            that.history = [str, ...that.history]
            if (that.history.length > that.historyMax) {
                that.history.length = that.historyMax
            }
            uni.setStorageSync('search', that.history)
        },
        delHistory() {
            let that = this
            uni.removeStorageSync('search')
            that.history = []
        },
        searchStr(str) {
            let that = this
            console.log('点击文字搜索', str)
            that.$refs.ttSearch.setSearchVal(str)
            that.toSearch(str)
        },
        toSearch(str) {
            let that = this
            console.log('搜索中...', str)
            setTimeout(() => {
                that.isSearching = true
            }, 500)
            u.request({
                url: u.API.SearchResult,
                isVerifyLogin: false,
                data: {
                    keyword: str
                },
                isUseMock: false,
                success(res, isUseMock) {
                    that.searchResult = res.data

                    // 记录搜索历史
                    setTimeout(() => {
                        that.setHistory(str)
                    }, 500)
                }
            })
        },
        search(res) {
            let that = this
            console.log('点击搜索', res)
            that.toSearch(res.value)
            // if (!res.value) {
            //     that.searchResult = []
            // } else {
            //     that.toSearch(res.value)
            // }
        },
        input(res) {
            let that = this
            console.log('输入', res)
            that.isSearching = false
            if (!res.value) {
                // that.searchResult = []
            } else {
                // that.toSearch(res.value)
            }
        },
        focus(res) {
            let that = this
            console.log('聚焦')
            that.isSearching = false
        },
        cancel(res) {
            let that = this
            that.back()
        }
    }
}
</script>
<style scoped>
.search {
    width: 100%;
    height: 45px;
    position: fixed;
    left: 0px;
    top: 0px;
}

.result {

}
.result__item {
    font-size: 14px;
    margin-left: 20upx;
    line-height: 45px;
    border-bottom: 1upx solid #eee;
}
.result__none {
    font-size: 14px;
    text-align: center;
    color: #999;
    padding: 40px 0;
}

.guess {
    padding: 10px 20upx;
}
.guess-th {
    overflow: hidden;
    line-height: 30px;
}
.guess-th__tit {
    float: left;
    color: #333;
    color: #10a2ff;
    font-size: 14px;
}
.guess-th__r {
    float: right;
    color: #999;
    font-size: 12px;
}
.guess-con {
    overflow: hidden;
    line-height: 25px;
}
.guess-con__item {
    background-color: #f3f5f9;
    padding: 0 10px;
    line-height: 25px;
    display: inline-block;
    border-radius: 3px;
    font-size: 12px;
    margin: 10px 10px 0 0;
}
</style>