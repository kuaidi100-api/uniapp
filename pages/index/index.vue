<template>
	<view class="container">
		<view>用户名：{{userinfo.username}}</view>
		<view>年龄：{{userinfo.age}}</view>
		<view>邮箱：{{userinfo.email}}</view>
		<button @tap="logout" type="warn" style="margin-top: 30rpx;" v-if="userinfo.username">退出登录</button>
		<button @tap="getUserinfo" type="primary" style="margin-top: 30rpx;" v-else>获取用户信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					username: "",
					email: "",
					age: ""
				}
			}
		},
		methods: {
			getUserinfo() {
				this.$store.dispatch('user/getUserInfo').then(res => {
					this.userinfo = res
				})
			},
			logout() {
				this.$store.dispatch('user/logout').then(() =>{
					this.userinfo.username = ""
					this.userinfo.age = ""
					this.userinfo.email = ""
				})
			}
		},
		onUnload() {
			uni.$off("loginSuccess", this.getUserinfo)
		},
		onLoad() {
			uni.$on("loginSuccess", this.getUserinfo)
			
			this.$toast("这是一个吐司提示")
			this.$modal("这里是弹窗的提醒内容", {
				confirmText: "我知道了",
				handleCancel: true
			}).then(() => {
				console.log("确定了")
			}).catch(() => {
				console.log('取消了')
			})
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
