import Vue from 'vue'
import App from './student'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#64dcdb',
        navigationBarTitleText: '云作业',
        usingComponents: {
            "i-tab-bar": "/static/iView/tab-bar/index",
            "i-tab-bar-item": "/static/iView/tab-bar-item/index",
            "i-notice-bar": "/static/iView/notice-bar/index"
        }
    }
    
}