import Vue from 'vue'
import App from './myclass'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '我的班群',
        navigationBarBackgroundColor: '#fff',
        enablePullDownRefresh:true,
        onReachBottomDistance: 50,
    }
}
