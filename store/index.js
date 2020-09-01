import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

const modules = require.context('./modules', true, /.js$/)
let moduleArr = []
modules.keys().map(key => {
  moduleArr[key.replace(/(\.\/)|(\.js)/ig, '')] = modules(key).default
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...moduleArr
  },
	getters
})

export default store