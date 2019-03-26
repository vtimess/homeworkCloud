import Vue from 'vue'
import App from './classDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '班群详情',
        usingComponents: {
            "i-input": "/static/iView/input/index",
            "i-panel": "/static/iView/panel/index",
            "i-cell": "/static/iView/cell/index"
        }
    }
    
}