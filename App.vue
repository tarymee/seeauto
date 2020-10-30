<script>
export default {
    globalData: {
        text: 'text'
    },
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}

// uni-app 全局变量的几种实现方式 https://ask.dcloud.net.cn/article/35021
// 赋值：getApp().globalData.text = 'test'
// 取值：console.log(getApp().globalData.text) // 'test'
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
/* @import './common/uni.css'; */

/* 微信小程序中引用FontAwesome字体 https://blog.csdn.net/qq_28988969/article/details/76633921 */
/* @import './common/font-awesome.css'; */

/* 以下样式用于 hello uni-app 演示所需 */
/* page {
    background-color: #F4F5F6;
    height: 100%;
    font-size: 28upx;
    line-height: 1.8;
} */

.status_bar {
    height: var(--status-bar-height);
    width: 100%;
}


page {
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}
image {
    /* 不能同意设背景loadding 因为有的图片是透明的 */
    /* background: url('~@/static/img/loading.gif') center center no-repeat; */
}

.space {
    background-color: #f8f8f8;
    height: 10px;
}

/* 焦点图 */
.swiper {
    overflow: hidden;
    height: 375upx;
}
.swiper__item {
    background: url('~@/static/img/loading.gif') #eee center center no-repeat;
}
.swiper__img {
    width: 100%;
    height: 375upx;
}






/* 模块标题 */
.m-title {
    margin: 10px 20upx 0;
    overflow: hidden;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 1upx solid #e7e7e7;
}
.m-title__tit {
    float: left;
    line-height: 28px;
    color: #333;
    padding: 0 5px;
    border-bottom: 2px solid #10a2ff;
}
.m-title__r {
    float: right;
    color: #10a2ff;
    font-size: 12px;
}



button {
    border-radius: 23px;
}
button[type="primary"] {
    background-color: #51a7eb;
}
button[type="primary"].button-hover {
    background-color: #10a2ff;
}






/* 表单模块 */
.tt-form {
    overflow: hidden;
    margin: 10px 20upx;
}
.tt-form__item {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1upx solid #eee;
}
.tt-form__item-l {
    width: 70px;
    font-size: 16px;
    margin-right: 10px;
}
.tt-form__item-r {
    flex: 1;
}
.tt-form__item-r input {
    font-size: 16px;
}
.tt-form__item-r-text {
    font-size: 16px;
}
.tt-form__item-r-text--placeholder {
    font-size: 16px;
    color: #999;
}
.tt-form__item-btn {
    height: 25px;
    line-height: 25px;
    background-color: #3399cc;
    padding: 0 10px;
    color: #ffffff;
    font-size: 12px;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.tt-form__item-btn--disable {
    background-color: #fff;
    color: #999;
    border: 1upx solid #999;
}
.tt-form__btn {
    margin: 20px 0;
}


/* 无数据 */
.none {
    padding: 20px 0;
}
.none-img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0px auto 10px;
}
.none-text {
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    height: 20px;
}
</style>
