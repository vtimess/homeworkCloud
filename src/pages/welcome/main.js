import Vue from 'vue'
import App from './welcome'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#64dcdb',
        usingComponents: {
            "i-tabs": "../../iView/tabs/index",
            "i-tab": "../../iView/tab/index"
        }
    }
    
}