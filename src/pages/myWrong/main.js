import Vue from 'vue'
import App from './myWrong'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '我的错题',
        navigationBarBackgroundColor: '#64dcdb'
    }
}
