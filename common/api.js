// 全局开关 是否使用mock数据
const ISUSEMOCK = false

// const HOST = 'https://autosale.gasmis.com'
const HOST = 'https://www.cheyg.com'

// 所有API接口统一在这里注册才可使用
const API = {
    Index: `${HOST}/Api/Index`,
    IndexSeach: `${HOST}/Api/IndexSeach`, // 车型列表通用筛选接口
    ProvinceList: `${HOST}/Api/ProvinceList`,
    Ad: `${HOST}/Api/Ad`,
    Brand: `${HOST}/Api/Brand`,
    Config: `${HOST}/Api/Config`,
    IndexList: `${HOST}/Api/IndexList`,
    DiscountCar: `${HOST}/Api/DiscountCar`,
    DiscountCarDeatil: `${HOST}/Api/DiscountCarDeatil`, // 特价车详情
    CityList: `${HOST}/Api/CityList`,
    GetLocationCity: `${HOST}/Api/GetLocationCity`,
    RankData: `${HOST}/Api/RankData`,
    RankList: `${HOST}/Api/RankList`,
    SearchResult: `${HOST}/Api/SearchResult`,
    NearStoreList: `${HOST}/Api/NearStoreList`,
    ActivityList: `${HOST}/Api/ActivityList`,
    ActivityDetail: `${HOST}/Api/ActivityDetail`,
    ArticleShow: `${HOST}/Api/ArticleShow`,
    ModelPicList: `${HOST}/Api/ModelPicList`,
    BrandList: `${HOST}/Api/BrandList`,
    ModelDeatil: `${HOST}/Api/ModelDeatil`, // 车型详情
    MyLogin: `${HOST}/Api/MyLogin`,
    My: `${HOST}/Api/My`, // 我的收藏数量
    MyInfo: `${HOST}/Api/MyInfo`, // 我的信息
    MyInfoEdit: `${HOST}/Api/MyInfoEdit`, // 我的信息编辑
    StyleDeatil: `${HOST}/Api/StyleDeatil`, // 款式详情
    NearStoreByStyle: `${HOST}/Api/NearStoreByStyle`,
    MyPrice: `${HOST}/Api/MyPrice`, // 我的询价列表
    MyPriceAdd: `${HOST}/Api/MyPriceAdd`, // 询价 获取底价
    MyPriceDel: `${HOST}/Api/MyPriceDel`, // 取消询价
    MyCollectAdd: `${HOST}/Api/MyCollectAdd`, // 收藏车型
    MyCollectDel: `${HOST}/Api/MyCollectDel`, // 删除车型 商铺
    MyCollectCar: `${HOST}/Api/MyCollectCar`, // 我的收藏车型
    MyCollectStore: `${HOST}/Api/MyCollectStore`, // 我的收藏商铺
    MyCollectCheck: `${HOST}/Api/MyCollectCheck`, // 监测是否有收藏
    MyDrive: `${HOST}/Api/MyDrive`, // 我的预约
    MyDriveDel: `${HOST}/Api/MyDriveDel`, // 取消预约
	sale: `${HOST}/Api/Shopping`, // 导购
	hot: `${HOST}/Api/Shopping`, // 热门推荐
    Company: `${HOST}/Api/Company`, // 商家
    CompanyBrand: `${HOST}/Api/CompanyBrand`, // 商家
    MyDriveAdd: `${HOST}/Api/MyDriveAdd`, // 商家
    SelectConfig: `${HOST}/Api/SelectConfig`, // 选车参数
    Select: `${HOST}/Api/Select`, // 选车数值
    SelectList: `${HOST}/Api/SelectList`, // 选车数值
    StyleParaDeatil: `${HOST}/Api/StyleParaDeatil`, // 参数页面
    MobileCodeCheck: `${HOST}/Api/MobileCodeCheck`, // 参数页面



    getVerifyCode: `${HOST}/Api/getVerifyCode`,
    HOST
}

// 使用接口对应的模拟数据
function useMock(url) {
    let res
    if (url === API.Index) {
        res = require('@/api/Index')
    } else if (url === API.IndexList) {
        res = require('@/api/IndexList')
    } else if (url === API.DiscountCar) {
        res = require('@/api/DiscountCar')
    } else if (url === API.Brand) {
        res = require('@/api/Brand')
    } else if (url === API.CityList) {
        res = require('@/api/CityList')
    } else if (url === API.GetLocationCity) {
        res = require('@/api/GetLocationCity')
    } else if (url === API.RankList) {
        res = require('@/api/RankList')
    } else if (url === API.RankData) {
        res = require('@/api/RankData')
    } else if (url === API.SearchResult) {
        res = require('@/api/SearchResult')
    } else if (url === API.NearStoreList) {
        res = require('@/api/NearStoreList')
    } else if (url === API.ActivityList) {
        res = require('@/api/ActivityList')
    } else if (url === API.ActivityDetail) {
        res = require('@/api/ActivityDetail')
    } else if (url === API.ArticleShow) {
        res = require('@/api/ArticleShow')
    } else if (url === API.SelectConfig) {
        res = require('@/api/SelectConfig')
    } else if (url === API.SelectList) {
        res = require('@/api/SelectList')
    } else if (url === API.ModelPicList) {
        res = require('@/api/ModelPicList')
    } else if (url === API.BrandList) {
        res = require('@/api/BrandList')
    } else if (url === API.DiscountCarDeatil) {
        res = require('@/api/DiscountCarDeatil')
    } else if (url === API.ModelDeatil) {
        res = require('@/api/ModelDeatil')
    } else if (url === API.MyCollectCheck) {
        res = require('@/api/MyCollectCheck')
    } else if (url === API.NearStoreByStyle) {
        res = require('@/api/NearStoreByStyle')
    } else if (url === API.MyLogin) {
        res = require('@/api/MyLogin')
    } else if (url === API.My) {
        res = require('@/api/My')
    } else if (url === API.MyInfo) {
        res = require('@/api/MyInfo')
    } else if (url === API.MyInfoEdit) {
        res = require('@/api/MyInfoEdit')
    } else if (url === API.getVerifyCode) {
        res = require('@/api/getVerifyCode')
    } else if (url === API.MyPrice) {
        res = require('@/api/MyPrice')
    } else if (url === API.MyPriceDel) {
        res = require('@/api/MyPriceDel')
    } else if (url === API.MyCollectCar) {
        res = require('@/api/MyCollectCar')
    } else if (url === API.MyCollectStore) {
        res = require('@/api/MyCollectStore')
    } else if (url === API.MyCollectDel) {
        res = require('@/api/MyCollectDel')
    } else if (url === API.MyDrive) {
        res = require('@/api/MyDrive')
    } else if (url === API.MyDriveDel) {
        res = require('@/api/MyDriveDel')
    } else if (url === API.MyPriceAdd) {
        res = require('@/api/MyPriceAdd')
    } else if (url === API.StyleParaDeatil) {
        res = require('@/api/StyleParaDeatil')
    } else if (url === API.NearStoreByStyle) {
        res = require('@/api/NearStoreByStyle')
    } else if (url === API.StyleDeatil) {
        res = require('@/api/StyleDeatil')
    } else if (url === API.sale) {
        res = require('@/api/sale')
    } else if (url === API.hot) {
        res = require('@/api/sale')
    }
    return res
}


module.exports = {
    ISUSEMOCK,
    API,
    useMock
}
