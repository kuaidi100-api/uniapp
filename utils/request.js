import store from '@/store'
import { showToast } from './interactiveFeedback.js'
import {
  API_BASE,
  NETWORK_TIMEOUT,
  DEFAULT_ERR_MESSAGE,
  PLATFORM,
  NETWORK_ERR_MESSAGE
} from '@/config'

async function handleRequest(url, opts, isUpload) {
  opts.data.platform = PLATFORM.platform
  opts.data.appId = PLATFORM.appid
  let err = null
  let res = null
  if (isUpload) {
    [err, res = {}] = await uni.uploadFile({
      url: url,
      filePath: opts.file,
      name: opts.name,
      formData: opts.data
    })
  } else {
    [err, res = {}] = await uni.request({
      url: `${API_BASE}${url}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: opts.method || 'POST',
      timeout: opts.timeout || NETWORK_TIMEOUT,
      data: opts.data || {}
    })
  }
  err && console.warn(`${url}接口错误：`, err)
  opts.debug && console.info('接口结果：', res)
  return new Promise((resolve, reject) => {
    if (err) {
      if (opts.handleFail !== false) {
        showToast(NETWORK_ERR_MESSAGE)
        return reject(res)
      }
    } else {
			// 404, 502等服务器错误信息
      if (typeof res.data !== 'object') res.data = { status: res.statusCode, message: DEFAULT_ERR_MESSAGE, data: res.data } 

      if (res.data.status === '200') {
        return resolve(res.data)
      } else if (res.data.status === '403' && opts.handleLogin !== false) { // 未登录或者登录失效
        showToast('请先登录', 1000)
        return uni.navigateTo({
          url: '/pages/login/login'
        })
      } else {
        if (opts.handleFail !== false) {
          showToast(res.data.message || DEFAULT_ERR_MESSAGE)
        }
        return reject(res)
      }
    }
  })
}

/**
 * 基本的http请求
 * @param {url: String} 请求的链接
 * @param {opts.data: Object} 请求的参数
 * @param {opts.needAuth: Boolean } 是否需要登录
 * @param {opts.handleFail: Boolean} 是否处理错误信息，设置为false将忽略请求时的错误
 * @param {opts.accessToken: Boolean} 是否将token覆盖为提供商token
 * */
export async function request(url, opts = {}) {
  opts.data = opts.data || {}
  if (opts.needAuth) {
    const userinfo = await store.dispatch('user/getUserInfo') // 获取用户信息
    opts.data.openid = store.getters.openid
    opts.data.token = store.getters.token
    opts.data.unionid = store.getters.unionid
  }
  return handleRequest(url, opts)
}

export function get(url, opts = {}) {
  opts.method = 'GET'
  return request(url, opts)
}

export function post(url, opts = {}) {
  opts.method = 'POST'
  return request(url, opts)
}

/**
 * @param {url} 上传地址
 * @param {file}  文件路径
 * @param {name} 文件的表单名称
 * @param {formData} 额外需要提交的字段
 * */
export async function upload(url, file, name = 'file', formData = {}) {
  if (!file) return
  formData.openid = formData.openid || store.getters.openid
  if (formData.needAuth) {
    const userinfo = await store.dispatch('user/getUserInfo')
    formData.openid = userinfo.openid || formData.openid
    formData.token = userinfo.token
  }
  return handleRequest(url, {
    file: file,
    name: name,
    data: formData
  }, true)
}

function install(Vue) {
  Vue.prototype.$request = request
  Vue.prototype.$get = get
  Vue.prototype.$post = post
  Vue.prototype.$upload = upload
}
export default { install }

