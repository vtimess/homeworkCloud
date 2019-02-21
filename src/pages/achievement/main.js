import Vue from 'vue'
import App from './achievement'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '我的成就',
        navigationBarBackgroundColor: '#64dcdb'
    }
}
