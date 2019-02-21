import Vue from 'vue'
import App from './modifyinfo'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '修改资料',
        navigationBarBackgroundColor: '#64dcdb',
    }
}
