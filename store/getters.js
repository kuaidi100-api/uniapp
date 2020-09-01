const getters = {
  openid: state => state.user.openid,
  token: state => state.user.token,
  unionid: state => state.user.unionid
}
export default getters