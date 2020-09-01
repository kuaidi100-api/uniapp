<template>
  <view class="wrap">
    <view class="form-item">
      <input v-model.trim="name" type="text" placeholder="请输入用户名" class="input">
    </view>
    <view class="form-item">
      <input v-model.trim="password" type="password" placeholder="请输入密码" class="input">
    </view>
    <view class="button" @tap="submit">登录</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    valid() {
      if (!this.name) {
        return this.$toast('请输入用户名')
      }
      if (!this.password) {
        return this.$toast('请输入密码')
      }
      return true
    },
    submit: function() {
      if (!this.valid()) return
      uni.showLoading({
      	title: "正在登录..."
      })
			this.$store.dispatch('user/login', {
				name: this.name,
				password: this.password
			}).then(res => {
				console.log(res)
				uni.$emit("loginSuccess", res)
				uni.navigateBack()
			}).catch(res => {
				this.$toast(res.message)
			}).finally(() => {
				uni.hideLoading()
			})
    }
  },
	onLoad() {
		this.$store.dispatch('user/logout')
	}
}
</script>

<style scoped>
.form-item {
	display: flex;
	align-items: center;
	height: 84rpx;
	margin: 10rpx 62rpx 46rpx;
	border-bottom: 1rpx solid rgba(0,0,0,.16);
}
.input {
	flex: 1;
	padding: 0 40rpx;
}
.button {
	width: 630rpx;
	margin: -8rpx auto 20rpx;
	background-color: #ff7f02;
	border-radius: 8rpx;
	line-height: 96rpx;
	text-align: center;
	color: #FFF;
	font-size: 36rpx;
}
</style>
