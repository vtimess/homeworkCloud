import Vue from 'vue'
import App from './homeworkInfo'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '作业概览',
        navigationBarBackgroundColor: '#64dcdb',
        usingComponents: {
            "i-collapse": "/static/iView/collapse/index",
            "i-collapse-item": "/static/iView/collapse-item/index",
        }
        
    }
}