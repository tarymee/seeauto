import Vue from 'vue'
import App from './App'
import store from './store'
import navbar from './components/navbar/navbar.vue'
import u from '@/common/util'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
Vue.component('navbar', navbar)

Vue.mixin({
    methods: {
        jump(url) {
            u.jump(url)
        },
        back() {
            u.back()
        }
    }
})


const app = new Vue({
    store,
    ...App
})
app.$mount()
