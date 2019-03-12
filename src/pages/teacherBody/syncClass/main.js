import Vue from 'vue'
import App from './syncClass'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '群列表',
        usingComponents: {
            "i-checkbox-group": "../../../iView/checkbox-group/index",
            "i-checkbox": "../../../iView/checkbox/index",
            "i-panel": "../../../iView/panel/index"
        }
    }
    
}