import { ISUSEMOCK, API, useMock } from '@/common/api'

function jump(url) {
    if (url) {
        console.log(url)
        if (url.indexOf('pages/index/index') != -1 || url.indexOf('pages/user/user') != -1 || url.indexOf('pages/auto/auto') != -1 || url.indexOf('pages/sale/sale') != -1) {
            uni.switchTab({
                url: url
            })
        } else {
            uni.navigateTo({
                url: url
            })
        }
    } else {
        console.log('没有url')
    }
}

function back() {
    let that = this
    let pages = getCurrentPages()
    // console.log('页面栈', pages)
    if (pages.length > 1) {
        uni.navigateBack()
    } else {
        jump('/pages/index/index')
    }
}

// 检测用户是否登录状态
function checkLogin({
    success = null,
    fail = null,
    isAutoJumpToLogin = true,
} = {}) {
    // uni.setStorageSync('token', '11111')
    // uni.setStorageSync('token', '')
    let token = uni.getStorageSync('token')
    let userId = uni.getStorageSync('userId')
    let userInfo = uni.getStorageSync('userInfo')
    // console.log('token', token)
    // console.log('userId', userId)
    // console.log('userInfo', userInfo)

    let failFn = function () {
        fail && fail()
        if (isAutoJumpToLogin) {
            uni.showModal({
                title: '提示',
                content: '请您先登录再操作',
                // cancelText: '账号登录',
                confirmText: '微信登录',
                success(e) {
                    // console.log(e)
                    if (e.confirm) {
                        jump('/pages/wxlogin/wxlogin')
                    } else {
                        // jump('/pages/login/login')
                    }
                }
            })
        }
    }

    if (token) {
        // console.log(token)
        uni.checkSession({
            success() {
                // console.log('session_key 未过期，并且在本生命周期一直有效')
                // console.log('用户已授权登录')
                success && success(token, userId, userInfo)
            },
            fail() {
                console.error('session_key 已经失效，需要重新执行登录流程')
                failFn()
            }
        })
    } else {
        failFn()
        // // 获取用户数据
        // uni.getUserInfo({
        //     success: function (userInfo) {
        //         console.log('userInfo', userInfo)
        //     }
        // })
    }
}

// 封装uni.request方法
// 添加 isShowLoading isVerifyLogin isShowError 字段
function request({
    url = '',
    method = 'POST',
    data = {},
    header = {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
    },
    dataType = 'json',
    responseType = 'text',
    success = null,
    fail = null,
    complete = null,
    isShowLoading = true,
    isVerifyLogin = true,
    isSendToken = true,
    isShowError = true,
    // 单个请求是否使用模拟数据 未定义则使用全局 ISUSEMOCK 属性
    isUseMock = ISUSEMOCK,
} = {}) {

    // 检测api接口是否注册
    let isInApiObj = false
    for (var x in API) {
        if (url === API[x]) {
            isInApiObj = true
        }
    }
    if (!isInApiObj) {
        console.error(`${url} 该接口不能直接使用 需要先在 @/common/api.js 文件中注册`)
        return false
    }


    if (isVerifyLogin) {
        // console.log('有校验登录 发起请求')
        checkLogin({
            success: function () {
                ajax()
            }
        })
    } else {
        // console.log('没校验登录 发起请求')
        ajax()
    }

    // 统一对返回数据进行处理 图片加域名前缀
    function imgParse(data) {
        let isArr = Array.isArray(data)
        let isObj = Object.prototype.toString.call(data) === '[object Object]'

        if (isArr) {
            data.forEach((item, i) => {
                imgParse(item)
            })
        } else if (isObj) {
            for (var x in data) {
                if (typeof data[x] == 'string') {
                    if (data[x].indexOf('http') != 0 && /\.(png|jpe?g|gif)(\?.*)?$/i.test(data[x])) {
                        // console.log(data[x])
                        data[x] = `${API.HOST}${data[x]}`
                    }
                } else {
                    imgParse(data[x])
                }
            }
        }
    }

    function ajax() {
        if (isShowLoading) {
            uni.showLoading({
                mask: true
            })
        }

        // 就算不需要校验登录 token也一起传过去 后台有可能有用 比如统计用户某个接口请求次数等
        if (isSendToken) {
            let token = uni.getStorageSync('token')
            data.token = token ? token : ''
            // data.user_id = token ? token : ''
        }

        // // 接口统一传城市id
        // let locationCity = uni.getStorageSync('locationCity')
        // data.cityid = locationCity ? locationCity.id : ''

        if (isUseMock) {
            let res = useMock(url)
            setTimeout(() => {

                // 如果是使用mock数据 最后输出url时转换成本地url
                let urlArr = url.split(API.HOST)
                urlArr[0] = '@'
                url = urlArr.join('')

                if (res) {
                    imgParse(res.response)
                    console.log({
                        url: url,
                        request: data,
                        response: res.response,
                    })
                    success && success(res.response, isUseMock)
                } else {
                    if (isShowError) {
                        uni.showToast({
                            title: '网络异常 请稍后重试',
                            icon: 'none',
                            duration: 1500
                        })
                    }
                    console.error({
                        url: url,
                        request: data,
                        response: res,
                    })
                    fail && fail(res, isUseMock)
                }
                if (isShowLoading) {
                    uni.hideLoading()
                }
                complete && complete(res, isUseMock)
            }, 500)
        } else {
            function failFn() {
                if (isShowError) {
                    // uni.showModal({
                    //     title: '提示',
                    //     content: '网络异常 请稍后重试',
                    //     showCancel: false
                    // })
                    uni.showToast({
                        title: '网络异常 请稍后重试',
                        icon: 'none',
                        duration: 1500
                    })
                }
                console.error({
                    url: url,
                    request: data,
                    response: undefined,
                })
                fail && fail(undefined, isUseMock)
            }
            uni.request({
                url: url,
                method: method,
                header: header,
                dataType: dataType,
                responseType: responseType,
                data: data,
                success(res) {
                    // console.log('success', res)
                    if (res.statusCode == 200 && res.data && typeof res.data.response !== 'undefined') {
                        imgParse(res.data.response)
                        console.log({
                            url: url,
                            request: data,
                            response: res.data.response,
                        })
                        success && success(res.data.response, isUseMock)
                    } else {
                        failFn()
                    }
                },
                fail(res) {
                    failFn()
                },
                complete(res) {
                    if (isShowLoading) {
                        uni.hideLoading()
                    }
                    // console.log('complete', res)
                    if (res.statusCode == 200) {
                        res = res.data.response
                    } else {
                        res = undefined
                    }
                    complete && complete(res, isUseMock)
                }
            })
        }
    }
}

/**
 * 数据转换 接受源数据和配对规则 进行数据转换
 * @param  {Array OR Object}   source      源数据
 * @param  {Object}            matchup     配对规则
 * @param  {Boolean}           isreverse   配对规则是否相反
 * @return {Array OR Object}               返回转换后的数据
 */
function dataTransform(source, matchup, isreverse) {
    let isArr = Array.isArray(source)
    let isObj = Object.prototype.toString.call(source) === '[object Object]'
    if (!isArr && !isObj) {
        console.error('只接受对象或数组')
        return
    }

    if (isreverse) {
        for (let x in matchup) {
            matchup[matchup[x]] = x
            delete matchup[x]
        }
    }

    if (isObj) {
        source = [source]
    }
    let transformArr = []
    source.forEach((item, i) => {
        let data = {}
        for (let x in item) {
            if (matchup[x]) {
                data[matchup[x]] = item[x]
            } else {
                if (typeof data[x] === 'undefined') {
                    data[x] = item[x]
                } else {
                    // 如果数据源中某个属性值与配对关系相同 则被覆盖 原属性加_backup后缀
                    data[x + '_backup'] = item[x]
                }
            }
        }
        transformArr.push(data)
    })
    if (isObj) {
        return transformArr[0]
    } else {
        return transformArr
    }
}

// 特价车数据转换
// function transformDiscountCar(data) {
//     data = dataTransform(data, {
//         id: 'id',
//         thumbnail: 'img',
//         price: 'price',
//         special_price: 'discountPrice',
//         model_name: 'name'
//     })
//     data.forEach((item) => {
//         item.url = `/pages/specialdetail/specialdetail?id=${item.id}`
//     })
//     return data
// }

/**
 * 处理js浮点数精度问题
 * console.log(math.add(0.1, 0.2))
 * console.log(math.multiadd(0.1, 0.2, 0.3, 0.4))
 * console.log(math.curryadd(0.1)(0.2)())
 */
const math = {
    /**
     * 加法函数，用来得到精确的加法结果
     * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     * 调用：math.add(arg1, arg2)
     * 返回值：arg1加arg2的精确结果
     */
    add: function (arg1, arg2) {
        var r1, r2, m, c
        try {
            r1 = arg1.toString().split('.')[1].length
        }
        catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split('.')[1].length
        }
        catch (e) {
            r2 = 0
        }
        c = Math.abs(r1 - r2)
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c)
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''))
                arg2 = Number(arg2.toString().replace('.', '')) * cm
            } else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm
                arg2 = Number(arg2.toString().replace('.', ''))
            }
        } else {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', ''))
        }
        return (arg1 + arg2) / m
    },
    /**
     * 累加函数
     * 调用：math.multiadd(arg1, arg2, ...)
     * 返回值：arg1加arg2加arg3加...的精确结果
     */
    multiadd: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.add(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 柯里化累加函数
     * 说明：运用柯里化调用math.add方法
     * 调用：math.curryadd(arg1)(arg2)(arg3)()
     * 返回值：arg1加arg2加arg3加...的精确结果
     */
    curryadd: function () {
        var _args = arguments
        // console.log(_args.length)
        return function () {
            // console.log(arguments)
            if (!arguments.length) {
                // console.log(_args.length)
                var result = 0
                for (var i = 0; i < _args.length; i++) {
                    result = math.add(result, _args[i])
                }
                return result
            } else {
                Array.prototype.push.apply(_args, arguments)
                return arguments.callee
            }
        }
    },
    /**
     * 减法函数，用来得到精确的减法结果
     * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
     * 调用：math.sub(arg1,arg2)
     * 返回值：arg1减arg2的精确结果
     */
    sub: function (arg1, arg2) {
        var r1, r2, m, n
        try {
            r1 = arg1.toString().split('.')[1].length
        }
        catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split('.')[1].length
        }
        catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2
        return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    /**
     * 累减函数
     * 调用：math.multisub(arg1, arg2, ...)
     * 返回值：arg1减arg2减arg3减...的精确结果
     */
    multisub: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.sub(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 乘法函数，用来得到精确的乘法结果
     * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     * 调用：math.mul(arg1,arg2)
     * 返回值：arg1乘arg2的精确结果
     */
    mul: function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
        try {
            m += s1.split('.')[1].length
        }
        catch (e) {
        }
        try {
            m += s2.split('.')[1].length
        }
        catch (e) {
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    },
    /**
     * 累乘函数
     * 调用：math.multimul(arg1, arg2, ...)
     * 返回值：arg1乘arg2乘arg3乘...的精确结果
     */
    multimul: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.mul(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 柯里化累乘函数
     * 说明：运用柯里化调用math.mul方法
     * 调用：math.currymul(arg1)(arg2)(arg3)()
     * 返回值：arg1乘arg2乘arg3乘...的精确结果
     */
    currymul: function () {
        var _args = arguments
        return function () {
            if (!arguments.length) {
                var result = 1
                for (var i = 0; i < _args.length; i++) {
                    result = math.mul(result, _args[i])
                }
                return result
            } else {
                Array.prototype.push.apply(_args, arguments)
                return arguments.callee
            }
        }
    },
    /**
     * 除法函数，用来得到精确的除法结果
     * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
     * 调用：math.div(arg1,arg2)
     * 返回值：arg1除arg2的精确结果
     */
    div: function (arg1, arg2) {
        var t1, t2, r1, r2
        try {
            t1 = arg1.toString().split('.')[1].length
        } catch (e) {
            t1 = 0
        }
        try {
            t2 = arg2.toString().split('.')[1].length
        } catch (e) {
            t2 = 0
        }
        r1 = Number(arg1.toString().replace('.', ''))
        r2 = Number(arg2.toString().replace('.', ''))
        return (r1 / r2) * Math.pow(10, t2 - t1)
    },
    /**
     * 累除函数
     * 调用：math.multidiv(arg1, arg2, ...)
     * 返回值：arg1除arg2除arg3除...的精确结果
     */
    multidiv: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.div(result, args[i + 1])
            }
        })
        return result
    }
}

/**
 * 函数节流 表示频率控制 当达到了一定的时间就会执行一次 可以理解为是缩减执行频率 函数的执行次数为wait时间每次
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用 传入{leading: false}
 *                                如果想忽略结尾边界上的调用 传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
const throttle = function (func, wait, options) {
    let context, args, result
    let timeout = null
    // 上次执行时间点
    let previous = 0
    if (!options) options = {}
    // 延迟执行函数
    let later = function () {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : Number(new Date())
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
    }
    return function (..._args) {
        let now = Number(new Date())
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now
        // 延迟执行时间间隔
        let remaining = wait - (now - previous)
        context = this
        args = _args
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        // remaining <= 0 考虑到事件停止后重新触发或者
        // 正好相差wait的时候，这些情况下，会立即触发事件
        // remaining > wait 没有考虑到相应场景
        // 因为now-previous永远都是正值，且不为0，那么
        // remaining就会一直比wait小，没有大于wait的情况
        // 估计是保险起见吧，这种情况也是立即执行
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout)
            timeout = null
            previous = now
            result = func.apply(context, args)
            if (!timeout) context = args = null
            //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
        return result
    }
}

/**
 * 函数防抖 把函数的连续调用合成一次 空闲时间必须大于或等于 wait 函数才会执行
 * https://blog.csdn.net/qq_35585701/article/details/81392174
 * 与函数节流区别 比如监听用户输入搜索 函数节流是在一定时间内都发出请求搜索 而函数防抖可以做到用户停止输入之后才搜索 所以应该用函数防抖
 * @param  {function} func        传入函数，最后一个参数是额外增加的this对象，.apply(this, args) 这种方式，this无法传递进函数
 * @param  {number}   wait        时间间隔
 * @param  {boolean}  immediate   默认为ture 调用触发于开始边界而不是结束边界
 * @return {function}             返回调用函数
 */
const debounce = function (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        let last = Number(new Date()) - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.call(context, ...args, context)
                if (!timeout) {
                    context = args = null
                }
            }
        }
    }

    return function (..._args) {
        context = this
        args = _args
        timestamp = Number(new Date())
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        if (callNow) {
            result = func.call(context, ...args, context)
            context = args = null
        }

        return result
    }
}


// 获取头部宽高信息
const getNavbarInfo = function () {
    let statusBarHeight = 20
    let windowWidth = 375
    let capsuleHeight = 32
    let capsuleWidth = 87
    let capsuleTop = 26
    let capsuleLeft = 10
    let titleWidth = 181
    let titleHeight = 44
    let navHeight = 64

    let systemInfo = uni.getSystemInfoSync()
    // console.log('设备信息', systemInfo)
    statusBarHeight = systemInfo.statusBarHeight
    windowWidth = systemInfo.windowWidth


    let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // console.log('胶囊信息', menuButtonInfo)
    capsuleHeight = menuButtonInfo.height
    capsuleWidth = menuButtonInfo.width
    capsuleTop = menuButtonInfo.top
    capsuleLeft = windowWidth - menuButtonInfo.right
    titleWidth = windowWidth - (capsuleLeft * 2 + capsuleWidth * 2)
    // titleHeight = capsuleHeight + ((capsuleTop - statusBarHeight) * 2)
    navHeight = statusBarHeight + titleHeight
    return {
        statusBarHeight,
        windowWidth,
        capsuleHeight,
        capsuleWidth,
        capsuleTop,
        capsuleLeft,
        titleWidth,
        titleHeight,
        navHeight
    }
}


function getNowLocation({
    success = null,
    fail = null
} = {}) {
    // uni.getSetting({
    //     success (res) {
    //         console.log(res)
    //         uni.showModal({
    //             title: '测试弹窗',
    //             content: JSON.stringify(res),
    //             showCancel: false
    //         })
    //     }
    // })
    uni.getLocation({
        type: 'gcj02',
        success(res) {
            // console.log(res)
            success && success(res)
        },
        fail(error) {
            // console.error(error)
            fail && fail(error)
        }
    })
}


// 用接口获取当前定位城市
function getNowLocationCity({
    success = null,
    fail = null
} = {}) {
    getNowLocation({
        success: function (res1) {
            request({
                url: API.GetLocationCity,
                isVerifyLogin: false,
                data: {
                    latitude: res1.latitude,
                    longitude: res1.longitude,
                    location_x: res1.latitude,
                    location_y: res1.longitude
                },
                isUseMock: false,
                success(res, isUseMock) {
                    if (res && res.data) {
                        let locationCity = {
                            id: res.data.id || '0',
                            name: res.data.name || res.data.title,
                            latitude: res1.latitude,
                            longitude: res1.longitude,
                        }
                        uni.setStorageSync('locationCity', locationCity)
                        success && success(locationCity)
                    }
                },
                fail(error) {
                    console.error('错误', error)
                    fail && fail(error)
                }
            })
        }
    })
}
// 获取当前定位城市 优先用缓存
function getCacheLocationCity({
    success = null,
    fail = null
} = {}) {
    let locationCity = uni.getStorageSync('locationCity')
    if (locationCity) {
        success && success(locationCity)
    } else {
        getNowLocationCity({
            success: function (res) {
                success && success(res)
            },
            fail: function (error) {
                fail && fail(error)
            }
        })
    }
}

function checkphone(phone) {
    if (!phone) {
        uni.showToast({
            title: '请输入手机号码',
            icon: 'none'
        })
        return false
    } else if (!/^1\d{10}$/.test(phone)) {
        uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
        })
        return false
    } else {
        return true
    }
}

module.exports = {
    ISUSEMOCK,
    API,
    jump,
    back,
    checkLogin,
    request,
    dataTransform,
    // transformDiscountCar,
    getNavbarInfo,
    getNowLocation,
    getNowLocationCity,
    getCacheLocationCity,
    math,
    throttle,
    debounce,
    checkphone,
}
