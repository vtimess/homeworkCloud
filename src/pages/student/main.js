import Vue from 'vue'
import App from './student'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#64dcdb',
        navigationBarTitleText: '云作业',
        backgroundTextStyle:'dark',
        enablePullDownRefresh:true,
        onReachBottomDistance: 100,
        usingComponents: {
            "i-tab-bar": "/static/iView/tab-bar/index",
            "i-tab-bar-item": "/static/iView/tab-bar-item/index",
            "i-notice-bar": "/static/iView/notice-bar/index",
            "i-load-more": "/static/iView/load-more/index",
            "i-avatar":"/static/iView/avatar/index",
            "i-action-sheet": "/static/iView/action-sheet/index",
        }
    }
    
}