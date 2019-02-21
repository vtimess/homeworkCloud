import Vue from 'vue'
import App from './search'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '加入新的班群',
        navigationBarBackgroundColor: '#64dcdb'
    }
}