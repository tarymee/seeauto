<template>
    <div class="picwall" v-if="isShow && picwallData.length > 0" @click="hide">
        <swiper class="picwall-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" duration="300" circular :current="current" @change="change">
            <block v-for="(item, index) in picwallData" :key="index">
                <swiper-item class="picwall-swiper-item">
                    <image class="picwall-swiper-img" lazy-load :src="item.img" mode="aspectFit"></image>
                </swiper-item>
            </block>
        </swiper>
        <div class="picwall__count">{{current + 1}}/{{picwallData.length}}</div>
    </div>
</template>

<script>
import u from "@/common/util"
export default {
    name: "picwall",
    components: {},
    data() {
        return {
            isShow: false,
            autoplay: false,
            indicatorDots: false,
            current: 0,
            picwallData: [],
        }
    },
    props: {
        // picwallData: {
        //     type: Array,
        //     default: []
        // }
    },
    mounted() {
    },
    methods: {
        change(e) {
            this.current = e.detail.current
        },
        hide() {
            this.isShow = false
            this.picwallData = []
            this.current = 0
        },
        show(data, current) {
            this.picwallData = data
            this.current = current
            this.isShow = true
            // this.$forceUpdate()
        }
    }
}
</script>
<style scope>
.picwall {
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}
.picwall-swiper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #000;
}
.picwall-swiper-item {
    background: url('~@/static/img/loading.gif') center center no-repeat;
}
.picwall-swiper-img {
    width: 100%;
    height: 100%;
}
.picwall__count {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0px;
    color: #ffffff;
}
</style>