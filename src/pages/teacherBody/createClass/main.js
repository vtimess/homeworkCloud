import Vue from 'vue'
import App from './createClass'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '创建班群',
        usingComponents: {
            "i-input": "/static/iView/input/index",
            "i-panel": "/static/iView/panel/index",
            "i-radio": "/static/iView/radio/index",
            "i-cell": "/static/iView/cell/index"
        }
    }
    
}