import Vue from 'vue'
import App from './syncClass'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '群列表',
        usingComponents: {
            "i-checkbox-group": "/static/iView/checkbox-group/index",
            "i-checkbox": "/static/iView/checkbox/index",
            "i-panel": "/static/iView/panel/index"
        }
    }
    
}