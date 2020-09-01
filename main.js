import Vue from 'vue'
import App from './App'
import store from './store'
import interactiveFeedback from '@/utils/interactiveFeedback'
import request from '@/utils/request'
import uniExtend from '@/utils/extends'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(interactiveFeedback)
Vue.use(request)

uniExtend()


const app = new Vue({
	store,
	...App
})
app.$mount()
