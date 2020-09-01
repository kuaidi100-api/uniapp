// 界面交互反馈
export function showToast(content = '', duration = 1500, icon = 'none') {
  uni.showToast({
    title: content,
    icon: icon,
    mask: true,
    duration: duration
  })
}

export function modal(content = '', opts = { showCancel: true }) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: opts.title || '提示',
      content: content,
      cancelText: opts.cancelText || '取消',
      confirmText: opts.confirmText ? opts.confirmText.slice(0, 4) : '确定',
      cancelColor: opts.cancelColor || '#bebebe',
      confirmColor: opts.confirmColor || '#317ee7',
      showCancel: opts.showCancel !== false,
      success: res => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          opts.handleCancel === true && reject()
        }
      }
    })
  })
}

function install(Vue) {
  Vue.prototype.$toast = showToast
  Vue.prototype.$modal = modal
}

export default { install }
