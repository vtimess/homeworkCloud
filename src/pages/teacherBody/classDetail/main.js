import Vue from 'vue'
import App from './classDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '班群详情',
        usingComponents: {
            "i-input": "../../../iView/input/index",
            "i-panel": "../../../iView/panel/index",
            "i-cell": "../../../iView/cell/index"
        }
    }
    
}