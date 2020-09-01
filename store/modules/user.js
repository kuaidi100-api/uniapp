const KEYS = ['token', 'openid', 'unionid']

const getDefaultState = () => {
  const result = {}
  KEYS.map(key => {
    result[key] = uni.getStorageSync(key) || ''
  })
  return result
}

const state = getDefaultState()

const mutations = {
  SET_AUTH: (state, info) => { // 设置token
		KEYS.map(key => {
			if (typeof info[key] !== 'undefined') {
				state[key] = info[key]
				uni.setStorageSync(key, info[key])
			}
		})
  }
}

const actions = {
  getAuth({ state }) { // 获取用户授权信息
    return new Promise(resolve => {
      if (state.token) { // 已授权，直接返回
        resolve({
          openid: state.openid,
          token: state.token,
          unionid: state.unionid
        })
      } else { // 未授权，跳转到登录页
				uni.navigateTo({
					url: `/pages/login/login`
				})
			}
    })
  },
	login({state, commit, dispatch}, data) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if(data.name === 'test' && data.password === 'test') {
					const data = {
						token: "testToken",
						openid: "testOpenId",
						unionid: "testUnionId"
					}
					commit('SET_AUTH', data)
					resolve(data)
				} else {
					reject({
						message: "账号或密码错误",
						code: '100401'
					})
				}
				
			}, 1000)
		})
	},
  logout({ commit, dispatch }) { // 退出登录
    commit('SET_AUTH', {
      openid: '',
      token: '',
      unionid: ''
    })
		return Promise.resolve()
  },
  getUserInfo({state, commit, dispatch}) { // 本地获取用户信息
    return new Promise(resolve => {
			dispatch('getAuth').then(res => {
				resolve({
					username: "test",
					age: 18,
					email: "test@test.test"
				})
			})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

