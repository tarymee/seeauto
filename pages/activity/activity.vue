<template>
    <view>
        <navbar :title="title"></navbar>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <list1 :list1Data="ttBottomLoad_data"></list1>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import list1 from '@/components/list1/list1.vue'
export default {
    components: {
        ttBottomLoad,
        list1,
    },
    computed: {},
    data() {
        return {
            title: '促销活动',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.ActivityList,
                params: {}
            },
        }
    },
    onReachBottom: function(t) {
        this.$refs.ttBottomLoad.load()
    },
    methods: {
        getData(data) {
            let that = this
            if (!that.ttBottomLoad_config.isUseMock) {
                data.forEach((item, i) => {
                    item.img = item.img_small
                    item.title = item.title
                    item.typename = item.cityName
                    item.des = item.add_time
                    item.url = `/pages/activitydetail/activitydetail?id=${item.id}`
                })
            }
            that.ttBottomLoad_data = data
        }
    },
    onLoad() {
        let that = this
        u.getCacheLocationCity({
            success: function (res) {
                that.ttBottomLoad_config.params = {
                    city_id: res.id || '0',
                }
                that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
            }
        })
    }
}
</script>

<style scoped>
</style>
