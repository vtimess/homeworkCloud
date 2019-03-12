import Vue from 'vue'
import App from './createClass'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '创建班群',
        usingComponents: {
            "i-input": "../../../iView/input/index",
            "i-panel": "../../../iView/panel/index",
            "i-radio": "../../../iView/radio/index",
            "i-cell": "../../../iView/cell/index"
        }
    }
    
}