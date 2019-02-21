import Vue from 'vue'
import App from './video'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '视频讲解',
        navigationBarBackgroundColor: '#64dcdb'
    }
}