import Vue from 'vue'
import App from './mywork'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '作业列表',
        navigationBarBackgroundColor: '#fff',
        enablePullDownRefresh:true,
        onReachBottomDistance: 50,
    }
}
