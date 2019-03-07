import Vue from 'vue'
import App from './classgroup'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '什么是班群号',
        navigationBarBackgroundColor: '#64dcdb',
    }
}