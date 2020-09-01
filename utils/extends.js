import store from '@/store'

export default function() {
  ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack'].map(item => {
    const nativeFunc = uni[item]
    uni[item] = function(opts, needAuth) {
      if (needAuth) {
        store.dispatch('user/getUserInfo').then((res) => {
          nativeFunc.call(this, opts)
        })
      } else {
        return nativeFunc.call(this, opts)
      }
    }
  })
}