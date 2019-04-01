import Vue from 'vue'
import App from './teacher'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#32333F',
        navigationBarTextStyle:"white",
        navigationBarTitleText: '',
        enablePullDownRefresh:true,
        usingComponents: {
            "i-tab-bar": "/static/iView/tab-bar/index",
            "i-tab-bar-item": "/static/iView/tab-bar-item/index"
        }
    }
    
}