import Vue from 'vue'
import App from './finish'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '已完成的同学'
    }
}