import Vue from 'vue'
import App from './release'

const app = new Vue(App)
app.$mount()
export default{
    config: {
        navigationBarTitleText: '发布到我的主页',
        navigationBarBackgroundColor: '#fff',
        backgroundTextStyle: "dark",
    }
}