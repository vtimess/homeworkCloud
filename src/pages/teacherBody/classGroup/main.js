import Vue from 'vue'
import App from './classGroup'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '班群列表',
        usingComponents: {
            "i-card": "../../../iView/card/index"
        }
    }
    
}