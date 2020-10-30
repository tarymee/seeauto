<template>
    <view>
        <navbar :title="title"></navbar>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <list4 :list4Data="ttBottomLoad_data"></list4>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
import list4 from '@/components/list4/list4.vue'
export default {
    components: {
        ttBottomLoad,
        list4,
    },
    computed: {},
    data() {
        return {
            title: '附近商家',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.NearStoreList,
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
                    item.title = item.company_name
                    item.img = item.company_logo
                    item.near = item.company_distance
                    item.typename = item.company_address
                    item.company_brand.forEach((item1, i) => {
                        item1.img = item1.brand_logo
                        item1.name = item1.brand_name
                    })
                    item.sell = item.company_brand
                    item.url = `/pages/store/store?id=${item.company_id}`
                })
            }
            this.ttBottomLoad_data = data
        }
    },
    onLoad() {
        let that = this
        u.getNowLocationCity({
            success: function (res) {
                that.ttBottomLoad_config.params = {
                    city_id: res.id || '0',
                    location_x: res.latitude,
                    location_y: res.longitude
                }
                that.$refs.ttBottomLoad.init(that.ttBottomLoad_config)
            }
        })
    }
}
</script>

<style scoped>
</style>
