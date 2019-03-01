import Vue from 'vue'
import App from './homework'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '云作业',
        navigationBarBackgroundColor: '#fff',
        enablePullDownRefresh:true,
    }
}