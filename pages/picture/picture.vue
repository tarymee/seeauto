<template>
    <view>
        <navbar :title="title"></navbar>
        <ttBottomLoad ref="ttBottomLoad" @sendData="getData">
            <pictureList :picData="ttBottomLoad_data"></pictureList>
        </ttBottomLoad>
    </view>
</template>

<script>
import u from '@/common/util'
import pictureList from '@/components/picture-list/picture-list.vue'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'
export default {
    components: {
        pictureList,
        ttBottomLoad,
    },
    computed: {},
    data() {
        return {
            title: '汽车图片',
            id: '',
            ttBottomLoad_data: [],
            ttBottomLoad_config: {
                isUseMock: false,
                api: u.API.ModelPicList,
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
            // if (!that.ttBottomLoad_config.isUseMock) {
            //     data.forEach((item, i) => {
            //         item.sourceimg = item.img
            //         item.img = item.img_small
            //     })
            // }
            this.ttBottomLoad_data = data
        }
    },
    onLoad(e) {
        let that = this
        that.id = e.id
        that.ttBottomLoad_config.params.id = e.id
        this.$refs.ttBottomLoad.init(this.ttBottomLoad_config)
    },
    onShow() {},
}
</script>

<style scoped>

</style>
