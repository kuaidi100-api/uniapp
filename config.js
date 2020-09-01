
export const API_BASE = 'http://127.0.0.1:8080' // 接口根路径


export const NETWORK_TIMEOUT = 60000 // 接口超时时间

export const DEFAULT_ERR_MESSAGE = "系统繁忙，请稍后再试" //默认请求失败提示语

export const NETWORK_ERR_MESSAE = "网络错误，请检查您的网络" //网络错误提示语


// 平台配置
// #ifdef MP-WEIXIN
export const PLATFORM = {
	appid: "wx555555",
	platform: "WEIXINAPP"
}
// #endif

// #ifdef MP-BAIDU
export const PLATFORM = {
	appid: "444444",
	platform: "baiduMini"
}
// #endif


// #ifdef MP-ALIPAY
export const PLATFORM = {
	appid: "333333",
	platform: "ALIPAYMINI"
}
// #endif

// #ifdef MP-TOUTIAO
export const PLATFORM = {
	appid: "tt222222",
	platform: "TOUTIAOMINI"
}
// #endif

// #ifdef MP-QQ
export const PLATFORM = {
	appid: "111111",
	platform: "QQMINI"
}
// #endif

// #ifdef H5
export const PLATFORM = {
	appid: "",
	platform: "H5"
}
// #endif

// #ifdef QUICKAPP-WEBVIEW || QUICKAPP-WEBVIEW-HUAWEI || QUICKAPP-WEBVIEW-UNION
export const PLATFORM = {
	appid: "xxxx",
	platform: "QUICKIAPP"
}
// #endif

export const PROVIDER = PLATFORM.platform
