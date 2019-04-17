import Vue from 'vue'
import App from './classinfo'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '班群信息',
        navigationBarBackgroundColor: '#64dcdb',
        usingComponents: {
            "i-panel": "/static/iView/panel/index",
            "i-swipeout": "/static/iView/swipeout/index",
            "i-avatar":"/static/iView/avatar/index",

        }
    }
}